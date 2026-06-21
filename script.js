let data = ddLoadStore();
let currentLang = ddLang();
const DD_THEME_KEY = "doubleDamageThemeV2";
const cartPanel = document.querySelector(".cart-panel");
const cartItemsNode = document.querySelector("[data-cart-items]");
const cartCountNode = document.querySelector("[data-cart-count]");
const cartTotalNode = document.querySelector("[data-cart-total]");
const cart = new Map();
let appliedCoupon = null;
let cartToastTimer = null;
const shopState = {
  filter: "all",
  sort: "price-desc",
  stockOnly: true,
  search: "",
};

function ddPage(name) {
  const path = location.pathname.toLowerCase();
  if (!path.endsWith(".php") && !path.endsWith(".html")) {
    return name === "index" ? "/" : `/${name}`;
  }
  const ext = path.endsWith(".php") ? "php" : "html";
  return `${name}.${ext}`;
}

function ddIsPage(name) {
  const path = location.pathname.toLowerCase();
  if (name === "index" && (path === "/" || path === "")) return true;
  return path.endsWith(`${name}.html`) || path.endsWith(`${name}.php`) || path === `/${name}` || path.endsWith(`/${name}/`);
}

const initialCategory = new URLSearchParams(window.location.search).get("category");
if (initialCategory) shopState.filter = initialCategory;

const NEWS_CATEGORIES = [
  { id: "all", label: { ua: "Всі статті", en: "All articles", ru: "Все статьи" } },
  { id: "arbitraj", label: { ua: "Арбітраж", en: "Arbitrage", ru: "Арбитраж" } },
  { id: "kripto", label: { ua: "Криптовалюта", en: "Crypto", ru: "Криптовалюта" } },
  { id: "marketing", label: { ua: "Маркетинг", en: "Marketing", ru: "Маркетинг" } },
];

const HERO_ACTION_TEXT = {
  ua: {
    catalog: "\u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044c \u043a\u0430\u0442\u0430\u043b\u043e\u0433",
    telegram: "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u0438 \u0432 Telegram",
    promo: "\u041f\u0440\u043e\u043c\u043e\u043a\u043e\u0434 \u043d\u0430 \u043f\u0435\u0440\u0448\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f",
  },
  en: {
    catalog: "Browse catalog",
    telegram: "Message in Telegram",
    promo: "Promo code for first order",
  },
  ru: {
    catalog: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043a\u0430\u0442\u0430\u043b\u043e\u0433",
    telegram: "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 Telegram",
    promo: "\u041f\u0440\u043e\u043c\u043e\u043a\u043e\u0434 \u043d\u0430 \u043f\u0435\u0440\u0432\u044b\u0439 \u0437\u0430\u043a\u0430\u0437",
  },
};

function newsCategoryLabel(id) {
  const category = NEWS_CATEGORIES.find((item) => item.id === id) || NEWS_CATEGORIES[1];
  return ddText(category.label, currentLang);
}

function t(key) {
  return DD_UI[currentLang][key] || key;
}

function currentTheme() {
  return localStorage.getItem(DD_THEME_KEY) === "light" ? "light" : "dark";
}

function isVisible(key) {
  return (data.visibility || {})[key] !== false;
}

function visibleItems(items = []) {
  return (items || []).filter((item) => item.visible !== false);
}

function showCartToast(productName = "") {
  let toast = document.querySelector("[data-cart-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.setAttribute("data-cart-toast", "");
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  const message = {
    ua: "Додано в кошик",
    en: "Added to cart",
    ru: "Добавлено в корзину",
  }[currentLang] || "Добавлено в корзину";

  toast.innerHTML = `
    <span class="cart-toast-icon">✓</span>
    <span>
      <strong>${message}</strong>
      ${productName ? `<small>${productName}</small>` : ""}
    </span>
  `;
  toast.classList.add("is-visible");

  clearTimeout(cartToastTimer);
  cartToastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function setHidden(selector, hidden) {
  document.querySelectorAll(selector).forEach((node) => {
    node.hidden = Boolean(hidden);
  });
}

function applyVisibility() {
  const isShopPage = ddIsPage("shop");
  const isInfoPage = Boolean(document.querySelector("[data-info-page]"));
  setHidden(".site-header", !isVisible("header"));
  setHidden(".main-nav", !isVisible("headerNav"));
  setHidden("[data-lang-switch]", !isVisible("langSwitch"));
  setHidden("[data-theme-toggle]", !isVisible("themeToggle"));
  setHidden(".telegram-pill", !isVisible("telegramHeaderButton"));
  setHidden(".profile-pill", !isVisible("adminButton"));
  setHidden("[data-cart-open]", !isVisible("cartButton"));
  setHidden(".hero:not(.inner-hero)", !isVisible("hero"));
  setHidden("[data-hero-eyebrow]", !isVisible("heroEyebrow"));
  setHidden("[data-hero-title]", !isVisible("heroTitle"));
  setHidden("[data-hero-lead]", !isVisible("heroLead"));
  setHidden("[data-hero-catalog]", !isVisible("heroCatalogButton"));
  setHidden("[data-hero-telegram]", !isVisible("heroTelegramButton"));
  setHidden(".promo", !isVisible("heroPromo"));
  setHidden(".hero-trust", !isVisible("heroTrust"));
  setHidden(".hero-visual", !isVisible("heroImage"));
  setHidden("[data-payment-strip]", !isVisible("paymentStrip"));
  setHidden("[data-stats]", !isVisible("stats"));
  setHidden("#drops", !isVisible("drops"));
  setHidden(".advantages-section", !isVisible("advantages"));
  setHidden(".home-category-section", !isVisible("homeCategories"));
  setHidden(".pages-section", !isVisible("pages"));
  setHidden(".telegram-section", !isVisible("telegramBlock"));
  setHidden(".work-section", !isVisible("workSteps"));
  setHidden(".reviews-section", !isVisible("reviews"));
  setHidden(".home-news-section", !isVisible("homeNews"));
  setHidden(".partner-cta", !isVisible("partnerCta"));
  setHidden("#contact", !isVisible("contact"));
  setHidden(".faq", !isVisible("faq"));
  setHidden(".final-cta", !isVisible("finalCta"));
  setHidden(".footer", !isVisible("footer"));
  if (isShopPage) setHidden(".inner-hero", !isVisible("shopHero"));
  if (isInfoPage) setHidden(".inner-hero", !isVisible("infoHero"));
  setHidden(".shop-category-grid", !isVisible("shopCategories"));
  setHidden(".shop-toolbar", !isVisible("shopFilters"));
  setHidden("[data-products]", !isVisible("shopProducts"));
  setHidden(".vip-banner", !isVisible("shopVipBanners"));
}

function applyTheme(theme = currentTheme()) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(DD_THEME_KEY, theme);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) toggle.textContent = theme === "light" ? "Dark" : "Light";
  renderHeroLogo();
}

function formatPrice(value) {
  return `$${Number(value || 0)}`;
}

function couponByCode(code) {
  const normalized = String(code || "").trim().toUpperCase();
  return (data.coupons || []).find((coupon) => coupon.active !== false && String(coupon.code || "").toUpperCase() === normalized);
}

function ensureCartPromo() {
  if (!cartPanel || cartPanel.querySelector("[data-cart-promo-box]")) return;
  const totalNode = cartPanel.querySelector(".cart-total");
  if (!totalNode) return;
  totalNode.insertAdjacentHTML("beforebegin", `
    <div class="cart-promo" data-cart-promo-box>
      <label>Промокод</label>
      <div>
        <input data-cart-promo-input placeholder="DAMAGE10" />
        <button type="button" data-cart-promo-apply>OK</button>
      </div>
      <small data-cart-promo-status></small>
    </div>
    <div class="cart-discount" data-cart-discount hidden></div>
  `);
}

function mediaBlock(src, label, className = "card-media") {
  if (src) return `<div class="${className} filled-media"><img src="${src}" alt="${label || ""}" loading="lazy" /></div>`;
  return `<div class="${className} placeholder-media">${label || "DD"}</div>`;
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function fixRenderedText(root = document.body) {
  if (typeof ddFixText !== "function" || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const fixed = ddFixText(node.nodeValue);
    if (fixed !== node.nodeValue) node.nodeValue = fixed;
  });
  document.querySelectorAll("[title], [aria-label], [placeholder], input[value]").forEach((node) => {
    ["title", "aria-label", "placeholder", "value"].forEach((attr) => {
      if (!node.hasAttribute(attr)) return;
      const fixed = ddFixText(node.getAttribute(attr));
      if (fixed !== node.getAttribute(attr)) node.setAttribute(attr, fixed);
    });
  });
}

function localProduct(product) {
  const category = categoryById(product.category);
  const stockQty = Number(product.stockQty ?? product.quantity ?? 10);
  return {
    ...product,
    inStock: product.inStock !== false && stockQty > 0,
    stockQty,
    countryFlag: product.countryFlag || "",
    nameText: ddText(product.name, currentLang),
    descriptionText: ddText(product.description, currentLang),
    statusText: ddText(product.status, currentLang),
    categoryLabelText: ddText(product.categoryLabel, currentLang) || ddText(category?.title, currentLang) || product.category,
    subcategoryText: product.subcategory || "",
  };
}

function categoryById(id) {
  return visibleItems(data.categories).find((category) => category.id === id);
}

function categoryLabel(id) {
  const category = categoryById(id);
  return ddText(category?.title, currentLang) || id;
}

function productCategories() {
  const base = visibleItems(data.categories);
  const missing = [...new Set(visibleItems(data.products).map((product) => product.category).filter(Boolean))]
    .filter((id) => !base.some((category) => category.id === id))
    .map((id) => ({ id, icon: "#", title: { ua: id, en: id, ru: id }, text: { ua: "", en: "", ru: "" } }));
  return [...base, ...missing];
}

function renderLangSwitch() {
  const node = document.querySelector("[data-lang-switch]");
  if (!node) return;
  node.innerHTML = DD_LANGS
    .map((lang) => `<button class="${lang === currentLang ? "active" : ""}" type="button" data-lang="${lang}">${lang === "en" ? "ENG" : lang.toUpperCase()}</button>`)
    .join("");
}

function renderThemeToggle() {
  const tools = document.querySelector(".header-tools");
  if (!tools || tools.querySelector("[data-theme-toggle]")) return;
  if (!tools.querySelector("[data-replace-link]")) {
    const replaceLink = document.createElement("a");
    replaceLink.className = "replace-pill";
    replaceLink.href = ddPage("replace");
    replaceLink.dataset.replaceLink = "";
    replaceLink.textContent = "Замена товара";
    tools.insertBefore(replaceLink, tools.querySelector(".telegram-pill") || tools.querySelector("[data-cart-open]") || null);
  }
  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.type = "button";
  button.dataset.themeToggle = "";
  button.textContent = currentTheme() === "light" ? "Dark" : "Light";
  tools.insertBefore(button, tools.querySelector("[data-cart-open]") || null);
}

function normalizeMainNav() {
  const items = [
    ["index", "home"],
    ["shop", "shop"],
    ["events", "events"],
    ["guides", "guides"],
    ["partners", "partners"],
  ];

  document.querySelectorAll(".main-nav").forEach((nav) => {
    nav.innerHTML = items
      .map(([page, key]) => `<a href="${ddPage(page)}" data-i18n="${key}">${t(key)}</a>`)
      .join("");
  });
}

function renderStaticLabels() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
}

function renderContent() {
  const { content } = data;
  const pageType = document.querySelector("[data-info-page]")?.dataset.infoPage;
  const pageTitle =
    pageType === "guides"
      ? t("guides")
      : pageType === "events"
        ? t("events")
        : pageType === "partners"
          ? t("partners")
          : ddIsPage("shop")
            ? t("shop")
            : t("home");

  document.documentElement.lang = currentLang === "ua" ? "uk" : currentLang;
  document.title = `${content.brandName} | ${pageTitle}`;
  setText("[data-brand-mark]", content.brandMark);
  document.querySelectorAll("[data-brand-name]").forEach((node) => {
    const brand = String(content.brandName || "DOUBLE DAMAGE").trim();
    const parts = brand.split(/\s+/);
    node.innerHTML = parts.length >= 2
      ? `<span>${parts[0]}</span><span>${parts.slice(1).join(" ")}</span>`
      : `<span>${brand}</span>`;
  });
  setText("[data-hero-eyebrow]", ddText(content.heroEyebrow, currentLang));
  setText("[data-hero-title]", ddText(content.heroTitle, currentLang));
  setText("[data-hero-lead]", ddText(content.heroLead, currentLang));
  setText("[data-shop-page-title]", ddText(content.shopPageTitle, currentLang));
  setText("[data-shop-page-text]", ddText(content.shopPageText, currentLang));
  const heroActionText = HERO_ACTION_TEXT[currentLang] || HERO_ACTION_TEXT.ru;
  document.querySelectorAll("[data-hero-catalog]").forEach((node) => {
    node.textContent = heroActionText.catalog;
  });
  document.querySelectorAll("[data-hero-telegram]").forEach((node) => {
    node.textContent = heroActionText.telegram;
  });
  document.querySelectorAll("[data-promo-label]").forEach((node) => {
    node.textContent = heroActionText.promo;
  });
  setText("[data-promo-code]", content.promoCode);
  setText("[data-contact-eyebrow]", ddText(content.contactEyebrow, currentLang));
  setText("[data-contact-title]", ddText(content.contactTitle, currentLang));
  setText("[data-contact-text]", ddText(content.contactText, currentLang));
  setText("[data-final-eyebrow]", ddText(content.finalEyebrow, currentLang));
  setText("[data-final-title]", ddText(content.finalTitle, currentLang));
  setText("[data-final-text]", ddText(content.finalText, currentLang));
  setText("[data-footer-copy]", `© 2026 ${content.brandName}`);
  setText("[data-stock-count]", `${visibleItems(data.products).length} items`);

  document.querySelectorAll("[data-telegram-link]").forEach((telegramLink) => {
    telegramLink.href = content.telegramUrl || "https://t.me/";
  });
  renderHeroLogo();
  const telegramArt = document.querySelector(".telegram-art");
  if (telegramArt) {
    telegramArt.classList.toggle("has-custom-logo", Boolean(content.telegramImage));
    telegramArt.style.backgroundImage = content.telegramImage ? `url('${content.telegramImage}')` : "";
    telegramArt.style.backgroundSize = "contain";
    telegramArt.style.backgroundPosition = "center";
    telegramArt.style.backgroundRepeat = "no-repeat";
  }

  const terminalNode = document.querySelector("[data-terminal-products]");
  if (terminalNode) {
    terminalNode.innerHTML = visibleItems(data.products)
      .slice(0, 3)
      .map(localProduct)
      .map(
        (product, index) => `
          <div class="terminal-row ${index === 0 ? "active" : ""}">
            <span>${product.nameText.toUpperCase()}</span>
            <strong>${formatPrice(product.price)}</strong>
          </div>
        `
      )
      .join("");
  }

  const statsNode = document.querySelector("[data-stats]");
  if (statsNode) {
    statsNode.innerHTML = visibleItems(data.stats)
      .map((item) => `<div><strong>${item.value}</strong><span>${ddText(item.label, currentLang)}</span></div>`)
      .join("");
  }

  const paymentNode = document.querySelector("[data-payment-strip]");
  if (paymentNode) {
    paymentNode.innerHTML = visibleItems(data.paymentStrip)
      .map(
        (item) => `
          <article>
            <span>${item.icon || "•"}</span>
            <strong>${ddText(item.title, currentLang)}</strong>
            <small>${ddText(item.text, currentLang)}</small>
          </article>
        `
      )
      .join("");
  }
}

function renderFooter() {
  const footer = document.querySelector(".footer");
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-brand">
      <a class="brand" href="${ddPage("index")}">
        <span class="brand-mark">${data.content.brandMark}</span>
        <span>${data.content.brandName}</span>
      </a>
      <p>Dark digital marketplace для арбитражников, медиабаеров, SMM и Telegram-команд.</p>
      <div class="payment-badges" aria-label="Payment methods">
        <span>USDT</span>
        <span>CRYPTO</span>
        <span>UAH</span>
        <span>CARD</span>
      </div>
    </div>
    <div class="footer-col">
      <strong>Навигация</strong>
      <a href="${ddPage("index")}">Главная</a>
      <a href="${ddPage("shop")}">Магазин</a>
      <a href="${ddPage("events")}">Події</a>
      <a href="${ddPage("guides")}">${t("guides")}</a>
      <a href="${ddPage("partners")}">Партнери</a>
    </div>
    <div class="footer-col">
      <strong>Принимаем</strong>
      <span>USDT TRC20/ERC20</span>
      <span>Crypto payments</span>
      <span>UAH перевод</span>
      <span>Bank card</span>
    </div>
    <div class="footer-col">
      <strong>Контакты</strong>
      <a data-telegram-link href="${data.content.telegramUrl || "#"}" target="_blank" rel="noreferrer">Поддержка</a>
      <a data-telegram-link href="${data.content.telegramUrl || "#"}" target="_blank" rel="noreferrer">Наш Telegram канал</a>
      <span>© 2026 ${data.content.brandName}</span>
    </div>
  `;
}

function renderShopBanners() {
  const slots = [
    ["left", data.content.shopVipLeftImage, data.content.shopVipLeftUrl],
    ["right", data.content.shopVipRightImage, data.content.shopVipRightUrl],
  ];
  slots.forEach(([side, image, url]) => {
    const node = document.querySelector(`[data-vip-banner="${side}"]`);
    if (!node) return;
    node.href = url || "#";
    node.classList.toggle("is-empty", !image);
    node.style.backgroundImage = image ? `url('${image}')` : "";
    node.querySelector("span").textContent = image ? "VIP" : "VIP PARTNER";
  });
}

function renderFilters() {
  const filtersNode = document.querySelector("[data-filters]");
  if (!filtersNode) return;

  const categories = [["all", t("all")], ...productCategories().map((category) => [category.id, categoryLabel(category.id)])];

  filtersNode.innerHTML = categories
    .map(
      ([value, label], index) =>
        `<button class="${value === shopState.filter ? "active" : ""}" type="button" data-filter="${value}">${label}</button>`
    )
    .join("");
}

function renderShopCategories() {
  const node = document.querySelector("[data-shop-categories]");
  if (!node) return;
  const allCard = `
    <button class="shop-category-card all-category-card ${shopState.filter === "all" ? "active" : ""}" type="button" data-filter="all">
      <span class="shop-category-icon">DD</span>
      <span class="shop-category-copy">
        <strong>${t("all")}</strong>
        <small>${visibleItems(data.products).length} товаров</small>
      </span>
      <em aria-label="Показать все">+</em>
    </button>
  `;
  node.innerHTML = allCard + productCategories()
    .map((category) => {
      const count = visibleItems(data.products).filter((product) => product.category === category.id).length;
      const title = ddText(category.title, currentLang);
      const image = category.image || "";
      const icon = category.icon || "#";
      return `
          <button class="shop-category-card ${category.id === shopState.filter ? "active" : ""}" type="button" data-filter="${category.id}">
          <span class="shop-category-icon" ${image ? `style="background-image:url('${image}')"` : ""}>${image ? "" : icon}</span>
          <span class="shop-category-copy">
            <strong>${title}</strong>
            <small>${count} товаров</small>
          </span>
          <em aria-label="Открыть раздел">+</em>
        </button>
      `;
    })
    .join("");
}

function productButton(product) {
  return `
    <div class="product-actions">
      <button type="button" data-add-cart data-id="${product.id}">
        Купить
      </button>
      <button class="add-cart-mini" type="button" data-add-cart data-cart-quiet data-id="${product.id}" aria-label="В корзину" title="В корзину">
        🛒
      </button>
    </div>
  `;
}

function renderHeroLogo() {
  const heroVisual = document.querySelector(".hero-visual");
  if (!heroVisual) return;
  const content = data.content;
  const theme = currentTheme();
  const src = theme === "light"
    ? content.heroImageLight || content.heroImage || content.heroImageDark
    : content.heroImageDark || content.heroImage || content.heroImageLight;
  heroVisual.classList.toggle("has-custom-logo", Boolean(src));
  heroVisual.style.backgroundImage = src ? `url('${src}')` : "";
  heroVisual.style.backgroundSize = src ? "contain" : "";
  heroVisual.style.backgroundPosition = src ? "center" : "";
  heroVisual.style.backgroundRepeat = src ? "no-repeat" : "";
}

function renderDrops() {
  const dropsNode = document.querySelector("[data-drops]");
  if (!dropsNode) return;

  const drops = visibleItems(data.products).filter((product) => product.drop).slice(0, 5).map(localProduct);
  dropsNode.innerHTML = drops
    .map(
      (product) => `
        <article class="drop-row ${product.featured ? "feature" : ""}">
          ${mediaBlock(product.image, product.badge, "product-image")}
          <div class="drop-row-main">
            <div>
              <span class="tag ${product.featured ? "acid" : product.category === "ads" ? "blue" : "orange"}">${product.statusText}</span>
              <h3>${product.nameText}</h3>
            </div>
            <p>${product.descriptionText}</p>
          </div>
          <div class="drop-row-meta">
            <span>${product.categoryLabelText}</span>
            <strong>${formatPrice(product.price)}</strong>
          </div>
          <div class="drop-row-actions">${productButton(product)}</div>
        </article>
      `
    )
    .join("");
}

function productUrl(product) {
  return `${ddPage("product")}?id=${encodeURIComponent(product.id)}`;
}

function productCardMarkup(product) {
  return `
    <article class="product-card" data-category="${product.category}" data-product-link="${productUrl(product)}">
      <div class="product-media-wrap">
        ${mediaBlock(product.image, product.badge, "product-image")}
        ${product.countryFlag ? `<span class="country-flag">${product.countryFlag}</span>` : ""}
      </div>
      <div class="product-info">
        <h3><a href="${productUrl(product)}">${product.nameText}</a></h3>
        <p>${product.descriptionText}</p>
        <div class="product-labels">
          <span class="tag acid">${product.statusText}</span>
          <span>${product.categoryLabelText}</span>
          ${product.subcategoryText ? `<span>${product.subcategoryText}</span>` : ""}
        </div>
      </div>
      <div class="product-price-col">
        <small>Цена</small>
        <strong>${formatPrice(product.price)}</strong>
      </div>
      <div class="product-stock-col">
        <small>Наличие</small>
        <strong>${product.inStock ? `${product.stockQty} шт.` : "Нет"}</strong>
      </div>
      <div class="product-buy-col">${productButton(product)}</div>
    </article>
  `;
}

function groupedProductMarkup(products) {
  return productCategories()
    .map((category) => {
      const group = products.filter((product) => product.category === category.id);
      if (!group.length) return "";
      const subcategories = category.subcategories || (category.id === "mail" ? "GMAIL · HOTMAIL · FIRSTMAIL" : "");
      return `
        <section class="product-section-group">
          <div class="product-section-title">
            <span>РАЗДЕЛ</span>
            <strong>${ddText(category.title, currentLang)}</strong>
            ${subcategories ? `<small>${subcategories}</small>` : ""}
          </div>
          ${group.map(productCardMarkup).join("")}
        </section>
      `;
    })
    .join("");
}

function renderProducts() {
  const productsNode = document.querySelector("[data-products]");
  if (!productsNode) return;

  const sortNode = document.querySelector("[data-shop-sort]");
  const stockNode = document.querySelector("[data-stock-only]");
  const searchNode = document.querySelector("[data-shop-search]");
  shopState.sort = sortNode?.value || shopState.sort;
  shopState.stockOnly = stockNode ? stockNode.checked : false;
  shopState.search = (searchNode?.value || shopState.search || "").trim().toLowerCase();

  const products = visibleItems(data.products)
    .map(localProduct)
    .filter((product) => shopState.filter === "all" || product.category === shopState.filter)
    .filter((product) => !shopState.stockOnly || product.inStock)
    .filter((product) => {
      if (!shopState.search) return true;
      return [
        product.nameText,
        product.descriptionText,
        product.categoryLabelText,
        product.statusText,
        product.countryFlag,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(shopState.search);
    })
    .sort((a, b) => {
      if (shopState.sort === "price-asc") return Number(a.price || 0) - Number(b.price || 0);
      if (shopState.sort === "name-asc") return a.nameText.localeCompare(b.nameText);
      return Number(b.price || 0) - Number(a.price || 0);
    });

  productsNode.classList.toggle("is-grouped", shopState.filter === "all" && !shopState.search);
  productsNode.innerHTML = products.length
    ? shopState.filter === "all" && !shopState.search
      ? groupedProductMarkup(products)
      : products.map(productCardMarkup).join("")
    : `<div class="shop-empty">Ничего не найдено</div>`;
}

function renderPages() {
  const pagesNode = document.querySelector("[data-pages]");
  if (!pagesNode) return;
  pagesNode.innerHTML = productCategories()
    .map(
      (category) => {
        const image = category.image || "";
        const count = visibleItems(data.products).filter((product) => product.category === category.id).length;
        return `
        <a href="${ddPage("shop")}?category=${encodeURIComponent(category.id)}" class="shop-category-card home-category-card">
          <span class="shop-category-icon" ${image ? `style="background-image:url('${image}')"` : ""}>${image ? "" : category.icon || "#"}</span>
          <span class="shop-category-copy">
            <strong>${ddText(category.title, currentLang)}</strong>
            <small>${count} товаров</small>
          </span>
          <em aria-label="Открыть раздел">+</em>
        </a>
      `;
      }
    )
    .join("");
  return;

  const categories = [
    ["∞", "META / FACEBOOK", "Meta, FB accounts and business assets"],
    ["G", "GOOGLE", "Google Ads, Gmail and workspace assets"],
    ["♪", "TIKTOK", "TikTok accounts and ad supplies"],
    ["✈", "TELEGRAM", "Telegram accounts and channels"],
    ["X", "X / TWITTER", "X accounts and traffic tools"],
    ["◎", "PROXIES", "Private proxies and sessions"],
    ["⚒", "TOOLS", "Browsers, utilities and automation"],
    ["☆", "OTHER", "Custom digital supplies"],
  ];

  pagesNode.innerHTML = categories
    .map(
      ([icon, title, text]) => `
        <a href="${ddPage("shop")}" class="page-card platform-tile">
          <span>${icon}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </a>
      `
    )
    .join("");
}

function renderAdvantages() {
  const node = document.querySelector("[data-advantages]");
  if (!node) return;
  node.innerHTML = visibleItems(data.advantages)
    .map((item) => `<article><span>${item.icon}</span><p>${ddText(item.text, currentLang)}</p></article>`)
    .join("");
}

function renderWorkSteps() {
  const node = document.querySelector("[data-work-steps]");
  if (!node) return;
  node.innerHTML = visibleItems(data.workSteps)
    .map(
      (item, index) => `
        <article>
          <div class="work-icon">${index + 1}</div>
          <strong>${ddText(item.title, currentLang)}</strong>
          <p>${ddText(item.text, currentLang)}</p>
        </article>
      `
    )
    .join("");
}

function renderReviews() {
  const node = document.querySelector("[data-reviews]");
  if (!node) return;
  node.innerHTML = visibleItems(data.reviews)
    .map((item) => `<article><div>★★★★★</div><p>${ddText(item.text, currentLang)}</p><strong>${item.name}</strong></article>`)
    .join("");
}

function renderFaq() {
  const faqNode = document.querySelector("[data-faq]");
  if (!faqNode) return;

  faqNode.innerHTML = visibleItems(data.faq)
    .map(
      (item, index) => `
        <details ${index === 0 ? "open" : ""}>
          <summary>${ddText(item.question, currentLang)}</summary>
          <p>${ddText(item.answer, currentLang)}</p>
        </details>
      `
    )
    .join("");
}

function renderInfoPage() {
  const pageNode = document.querySelector("[data-info-page]");
  if (!pageNode) return;
  const type = pageNode.dataset.infoPage;
  const pageData = {
    guides: visibleItems(data.guides),
    events: visibleItems(data.events),
    partners: visibleItems(data.partnersList),
  }[type] || [];
  const selectedNewsCategory = new URLSearchParams(window.location.search).get("category") || "all";
  const visiblePageData = type === "guides" && selectedNewsCategory !== "all"
    ? pageData.filter((item) => (item.category || "arbitraj") === selectedNewsCategory)
    : pageData;
  const copy = {
    guides: {
      title: data.content.guidesPageTitle,
      text: data.content.guidesPageText,
      cards: ["Arbitrage", "Crypto", "Marketing"],
    },
    events: {
      title: data.content.eventsPageTitle,
      text: data.content.eventsPageText,
      cards: ["New drops", "Private sale", "Partner week"],
    },
    partners: {
      title: data.content.partnersPageTitle,
      text: data.content.partnersPageText,
      cards: ["Suppliers", "Resellers", "Media teams"],
    },
  }[type];

  const categoryTabs = type === "guides" ? `
    <div class="news-category-tabs" aria-label="News categories">
      ${NEWS_CATEGORIES.map((category) => {
        const href = category.id === "all" ? ddPage("guides") : `${ddPage("guides")}?category=${category.id}`;
        const active = category.id === selectedNewsCategory || (category.id === "all" && !selectedNewsCategory);
        return `<a class="${active ? "active" : ""}" href="${href}">${ddText(category.label, currentLang)}</a>`;
      }).join("")}
    </div>
  ` : "";

  const cards = visiblePageData
    .map((item) => {
      if (type === "partners") {
        return `
          <article class="content-card partner-card">
            ${mediaBlock(item.logo, item.name?.slice(0, 2) || "DD", "content-media logo-media")}
            <h3>${item.name}</h3>
            <p>${ddText(item.text, currentLang)}</p>
            <strong>${item.promo}</strong>
            <a class="button ghost" href="${item.site}" target="_blank" rel="noreferrer">${item.siteLabel || "SITE"}</a>
          </article>
        `;
      }
      if (type === "events") {
        const href = `${ddPage("article")}?type=events&id=${encodeURIComponent(item.id)}`;
        const eventDate = item.date ? `<span>Дата: ${item.date}</span>` : "";
        const eventPlace = ddText(item.location, currentLang) ? `<span>Место: ${ddText(item.location, currentLang)}</span>` : "";
        return `
          <article class="content-card ${item.size || ""}" onclick="location.href='${href}'">
            ${mediaBlock(item.image, "EVENT", "content-media")}
            <div class="event-meta-line">${eventDate}${eventPlace}</div>
            <h3>${ddText(item.title, currentLang)}</h3>
            <p>${ddText(item.text, currentLang)}</p>
            <a class="button ghost read-more-link" href="${href}" onclick="event.stopPropagation()">Узнать больше</a>
          </article>
        `;
      }
      const href = `${ddPage("article")}?type=guides&id=${encodeURIComponent(item.id)}`;
      return `
        <article class="content-card ${item.size || ""}" onclick="location.href='${href}'">
          ${mediaBlock(item.image, "NEWS", "content-media")}
          <span class="tag acid">${newsCategoryLabel(item.category || "arbitraj")}</span>
          <h3>${ddText(item.title, currentLang)}</h3>
          <p>${ddText(item.excerpt, currentLang)}</p>
          <a class="button ghost read-more-link" href="${href}" onclick="event.stopPropagation()">Узнать больше</a>
        </article>
      `;
    })
    .join("");
  const emptyState = type === "guides" && !cards
    ? `<div class="news-empty">Пока в этой тематике нет статей. Добавь первую новость в админке.</div>`
    : "";

  pageNode.innerHTML = `
    <section class="hero inner-hero">
      <div class="hero-copy">
        <p class="eyebrow">DOUBLE DAMAGE</p>
        <h1>${ddText(copy.title, currentLang)}</h1>
        <p class="lead">${ddText(copy.text, currentLang)}</p>
      </div>
    </section>
    <section class="section">
      ${categoryTabs}
      <div class="content-grid ${type}-grid">${cards || emptyState}</div>
    </section>
  `;
}

function renderArticlePage() {
  const node = document.querySelector("[data-article-page]");
  if (!node) return;
  const params = new URLSearchParams(location.search);
  const type = params.get("type") === "events" ? "events" : "guides";
  const id = params.get("id");
  const list = type === "events" ? visibleItems(data.events) : visibleItems(data.guides);
  const item = list.find((entry) => entry.id === id) || list[0];
  if (!item) {
    node.innerHTML = `<section class="section article-page"><h1>Материал не найден</h1><a class="button ghost" href="${ddPage("guides")}">Вернуться</a></section>`;
    return;
  }
  const title = ddText(item.title, currentLang);
  const text = type === "events" ? ddText(item.text, currentLang) : ddText(item.body, currentLang);
  const meta = type === "events" ? "" : newsCategoryLabel(item.category || "arbitraj");
  const eventDetails = type === "events"
    ? `<div class="article-event-details">
        ${item.date ? `<span><strong>Дата проведения</strong>${item.date}</span>` : ""}
        ${ddText(item.location, currentLang) ? `<span><strong>Место</strong>${ddText(item.location, currentLang)}</span>` : ""}
      </div>`
    : "";
  document.title = `${title} | ${data.content.brandName}`;
  node.innerHTML = `
    <article class="article-page">
      ${mediaBlock(item.image, type === "events" ? "EVENT" : "NEWS", "article-cover")}
      ${meta ? `<span class="tag acid">${meta}</span>` : ""}
      <h1>${title}</h1>
      ${eventDetails}
      <p class="article-lead">${type === "events" ? "" : ddText(item.excerpt, currentLang)}</p>
      <div class="article-body-full">${text}</div>
      <a class="button primary" href="${type === "events" ? ddPage("events") : ddPage("guides")}">Назад</a>
    </article>
  `;
}

function renderProductPage() {
  const node = document.querySelector("[data-product-page]");
  if (!node) return;
  const id = new URLSearchParams(location.search).get("id");
  const product = visibleItems(data.products).map(localProduct).find((item) => item.id === id) || visibleItems(data.products).map(localProduct)[0];
  if (!product) {
    node.innerHTML = `<section class="section article-page"><h1>Товар не найден</h1><a class="button ghost" href="${ddPage("shop")}">Вернуться в магазин</a></section>`;
    return;
  }
  const details = ddText(product.details, currentLang) || product.descriptionText;
  node.innerHTML = `
    <section class="product-detail-hero">
      <div class="product-detail-media">
        ${mediaBlock(product.image, product.badge, "product-image")}
      </div>
      <div class="product-detail-copy">
        <p class="eyebrow">${product.categoryLabelText}</p>
        <h1>${product.nameText}</h1>
        <p class="lead">${product.descriptionText}</p>
        <div class="product-detail-meta">
          <span>${product.statusText}</span>
          <span>${product.inStock ? `${product.stockQty} шт.` : "Нет в наличии"}</span>
          <strong>${formatPrice(product.price)}</strong>
        </div>
        <div class="hero-actions">
          ${productButton(product)}
          <a class="button ghost" href="${ddPage("shop")}?category=${encodeURIComponent(product.category)}">Назад в раздел</a>
        </div>
      </div>
    </section>
    <section class="section product-detail-section">
      <div class="section-heading compact">
        <p class="eyebrow">Описание</p>
        <h2>Дополнительная информация</h2>
      </div>
      <div class="product-detail-text">${details}</div>
    </section>
  `;
}

function renderHomeNews() {
  const node = document.querySelector("[data-home-news]");
  if (!node) return;
  const posts = visibleItems(data.guides).slice(0, 3);
  node.innerHTML = posts.map((item) => {
    const href = `${ddPage("article")}?type=guides&id=${encodeURIComponent(item.id)}`;
    return `
      <article class="content-card" onclick="location.href='${href}'">
        ${mediaBlock(item.image, "NEWS", "content-media")}
        <span class="tag acid">${newsCategoryLabel(item.category || "arbitraj")}</span>
        <h3>${ddText(item.title, currentLang)}</h3>
        <p>${ddText(item.excerpt, currentLang)}</p>
        <a class="button ghost read-more-link" href="${href}" onclick="event.stopPropagation()">Узнать больше</a>
      </article>
    `;
  }).join("");
}

function renderPartnerCta() {
  const node = document.querySelector("[data-partner-cta]");
  if (!node) return;
  node.innerHTML = `
    <div>
      <p class="eyebrow">${ddText(data.content.partnerCtaEyebrow, currentLang)}</p>
      <h2>${ddText(data.content.partnerCtaTitle, currentLang)}</h2>
      <p>${ddText(data.content.partnerCtaText, currentLang)}</p>
    </div>
    <a class="button primary" data-telegram-link href="${data.content.telegramUrl || "#"}" target="_blank" rel="noreferrer">${ddText(data.content.partnerCtaButton, currentLang)}</a>
  `;
}

function renderReplacementPage() {
  const node = document.querySelector("[data-replacement-page]");
  if (!node) return;
  const content = data.content || {};
  const title = ddText(content.replacePageTitle, currentLang);
  const intro = ddText(content.replacePageText, currentLang);
  const exampleTitle = ddText(content.replaceExampleTitle, currentLang);
  const exampleText = ddText(content.replaceExampleText, currentLang);
  const buttonText = ddText(content.replaceButtonText, currentLang);
  const termsTitle = ddText(content.replaceTermsTitle, currentLang);
  const termsText = ddText(content.replaceTermsText, currentLang);
  document.title = `${title} | ${content.brandName || "DOUBLE DAMAGE"}`;
  node.innerHTML = `
    <section class="replacement-page">
      <p class="eyebrow">DOUBLE DAMAGE</p>
      <h1>${title}</h1>
      <p>${intro}</p>
      <div class="replacement-box">
        <h2>${exampleTitle}</h2>
        <p>${exampleText}</p>
      </div>
      <a class="button primary support-button" data-telegram-link href="${content.telegramUrl || "#"}" target="_blank" rel="noreferrer">${buttonText}</a>
      <div class="replacement-box">
        <h2>${termsTitle}</h2>
        <p>${termsText}</p>
      </div>
    </section>
  `;
}

function openCart() {
  document.body.classList.add("cart-open");
  cartPanel?.setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  cartPanel?.setAttribute("aria-hidden", "true");
}

function renderCart() {
  if (!cartItemsNode || !cartCountNode || !cartTotalNode) return;
  ensureCartPromo();

  const items = [...cart.values()];
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const coupon = appliedCoupon ? couponByCode(appliedCoupon.code) : null;
  if (!coupon) appliedCoupon = null;
  const discount = coupon ? Math.round((subtotal * Number(coupon.discount || 0)) / 100) : 0;
  const total = Math.max(0, subtotal - discount);

  cartCountNode.textContent = count;
  cartTotalNode.textContent = formatPrice(total);
  const discountNode = cartPanel?.querySelector("[data-cart-discount]");
  if (discountNode) {
    discountNode.hidden = !coupon || !discount;
    discountNode.textContent = coupon ? `Скидка ${coupon.discount}% по промокоду ${coupon.code}: -${formatPrice(discount)}` : "";
  }

  if (!items.length) {
    cartItemsNode.innerHTML = `<p class="empty-cart">${t("emptyCart")}</p>`;
    if (discountNode) discountNode.hidden = true;
    return;
  }

  cartItemsNode.innerHTML = items
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.nameText}</strong>
            <span>${formatPrice(item.price)} x ${item.qty}</span>
          </div>
          <div class="cart-controls">
            <button type="button" data-cart-dec="${item.id}" aria-label="-">-</button>
            <b>${item.qty}</b>
            <button type="button" data-cart-inc="${item.id}" aria-label="+">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

function renderAll() {
  renderLangSwitch();
  normalizeMainNav();
  renderStaticLabels();
  renderContent();
  renderFilters();
  renderShopCategories();
  renderDrops();
  renderProducts();
  renderPages();
  renderAdvantages();
  renderWorkSteps();
  renderReviews();
  renderFaq();
  renderInfoPage();
  renderArticlePage();
  renderProductPage();
  renderHomeNews();
  renderPartnerCta();
  renderReplacementPage();
  renderCart();
  renderFooter();
  renderShopBanners();
  applyVisibility();
  fixRenderedText();
}

document.addEventListener("click", (event) => {
  const langButton = event.target.closest("[data-lang]");
  const addButton = event.target.closest("[data-add-cart]");
  const openButton = event.target.closest("[data-cart-open]");
  const closeButton = event.target.closest("[data-cart-close]");
  const incButton = event.target.closest("[data-cart-inc]");
  const decButton = event.target.closest("[data-cart-dec]");
  const filterButton = event.target.closest("[data-filter]");
  const promoApply = event.target.closest("[data-cart-promo-apply]");
  const productLinkCard = event.target.closest("[data-product-link]");

  if (productLinkCard && !event.target.closest("button, a")) {
    window.location.href = productLinkCard.dataset.productLink;
    return;
  }

  if (langButton) {
    currentLang = langButton.dataset.lang;
    ddSetLang(currentLang);
    renderAll();
  }

  if (addButton) {
    const product = visibleItems(data.products).find((item) => item.id === addButton.dataset.id);
    if (!product) return;

    const localized = localProduct(product);
    const item = cart.get(product.id) || { ...localized, qty: 0 };
    item.nameText = localized.nameText;
    item.qty += 1;
    cart.set(product.id, item);
    renderCart();
    showCartToast(localized.nameText);
    if (!addButton.hasAttribute("data-cart-quiet")) openCart();
  }

  if (openButton) openCart();
  if (closeButton) closeCart();

  if (incButton) {
    const item = cart.get(incButton.dataset.cartInc);
    if (item) item.qty += 1;
    renderCart();
  }

  if (decButton) {
    const item = cart.get(decButton.dataset.cartDec);
    if (item) {
      item.qty -= 1;
      if (item.qty <= 0) cart.delete(item.id);
    }
    renderCart();
  }

  if (filterButton) {
    const filter = filterButton.dataset.filter;
    shopState.filter = filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    filterButton.classList.add("active");
    renderProducts();
  }

  if (promoApply) {
    const input = cartPanel?.querySelector("[data-cart-promo-input]");
    const status = cartPanel?.querySelector("[data-cart-promo-status]");
    const coupon = couponByCode(input?.value);
    if (coupon) {
      appliedCoupon = coupon;
      if (status) status.textContent = `Промокод применен: -${coupon.discount}%`;
    } else {
      appliedCoupon = null;
      if (status) status.textContent = "Промокод не найден";
    }
    renderCart();
  }

  const themeButton = event.target.closest("[data-theme-toggle]");
  if (themeButton) {
    applyTheme(currentTheme() === "light" ? "dark" : "light");
  }
});

document.addEventListener("change", (event) => {
  if (event.target.closest("[data-shop-sort]")) {
    shopState.sort = event.target.value;
    renderProducts();
  }

  if (event.target.closest("[data-stock-only]")) {
    shopState.stockOnly = event.target.checked;
    renderProducts();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.closest("[data-shop-search]")) {
    shopState.search = event.target.value.trim().toLowerCase();
    renderProducts();
  }
});

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const originalText = button.textContent;
    button.textContent = currentLang === "en" ? "Request sent" : currentLang === "ru" ? "Запрос принят" : "Запит прийнято";
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
}

async function initSite() {
  try {
    applyTheme();
    data = await ddLoadServerStore();
    renderThemeToggle();
    renderAll();
  } catch (error) {
    console.error("DOUBLE DAMAGE init failed", error);
  } finally {
    document.documentElement.classList.add("dd-ready");
  }
}

initSite();




