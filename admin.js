let adminData = ddLoadStore();
const DD_ADMIN_AUTH_KEY = "doubleDamageAdminAuth";
const DD_ADMIN_LOGIN = "jood";
const DD_ADMIN_PASSWORD = "123qwe123";

const form = document.querySelector("[data-admin-form]");
const saveStatus = document.querySelector("[data-save-status]");
const loginScreen = document.querySelector("[data-login-screen]");
const loginForm = document.querySelector("[data-login-form]");
const loginError = document.querySelector("[data-login-error]");
const editors = {
  categories: document.querySelector("[data-categories-editor]"),
  products: document.querySelector("[data-products-editor]"),
  guides: document.querySelector("[data-guides-editor]"),
  events: document.querySelector("[data-events-editor]"),
  partnersList: document.querySelector("[data-partners-editor]"),
  faq: document.querySelector("[data-faq-editor]"),
  paymentStrip: document.querySelector("[data-payment-editor]"),
  coupons: document.querySelector("[data-coupons-editor]"),
  stats: document.querySelector("[data-stats-editor]"),
  advantages: document.querySelector("[data-advantages-editor]"),
  workSteps: document.querySelector("[data-worksteps-editor]"),
  reviews: document.querySelector("[data-reviews-editor]"),
  visibility: document.querySelector("[data-visibility-editor]"),
};

const VISIBILITY_GROUPS = [
  {
    title: "РЁР°РїРєР°",
    items: [
      ["header", "Р’СЃСЏ С€Р°РїРєР°"],
      ["headerNav", "РњРµРЅСЋ: Р“Р»Р°РІРЅР°СЏ / РњР°РіР°Р·РёРЅ / РќРѕРІРѕСЃС‚Рё"],
      ["langSwitch", "РџРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ СЏР·С‹РєРѕРІ"],
      ["themeToggle", "РљРЅРѕРїРєР° С‚РµРјС‹"],
      ["telegramHeaderButton", "РљРЅРѕРїРєР° Telegram РІ С€Р°РїРєРµ"],
      ["adminButton", "РљРЅРѕРїРєР° РђРґРјРёРЅРєР°"],
      ["cartButton", "РљРЅРѕРїРєР° РєРѕСЂР·РёРЅС‹"],
    ],
  },
  {
    title: "Р“Р»Р°РІРЅР°СЏ",
    items: [
      ["hero", "РџРµСЂРІС‹Р№ СЌРєСЂР°РЅ РїРѕР»РЅРѕСЃС‚СЊСЋ"],
      ["heroEyebrow", "РњР°Р»РµРЅСЊРєР°СЏ РїРѕРґРїРёСЃСЊ РЅР°Рґ РіР»Р°РІРЅС‹Рј Р·Р°РіРѕР»РѕРІРєРѕРј"],
      ["heroTitle", "Р“Р»Р°РІРЅС‹Р№ Р·Р°РіРѕР»РѕРІРѕРє"],
      ["heroLead", "РўРµРєСЃС‚ РїРѕРґ РіР»Р°РІРЅС‹Рј Р·Р°РіРѕР»РѕРІРєРѕРј"],
      ["heroCatalogButton", "РљРЅРѕРїРєР° РЎРјРѕС‚СЂРµС‚СЊ РєР°С‚Р°Р»РѕРі"],
      ["heroTelegramButton", "РљРЅРѕРїРєР° РќР°РїРёСЃР°С‚СЊ РІ Telegram"],
      ["heroPromo", "РџСЂРѕРјРѕРєРѕРґ"],
      ["heroTrust", "РўСЂРё РїРѕРґРїРёСЃРё РїРѕРґ РїСЂРѕРјРѕРєРѕРґРѕРј"],
      ["heroImage", "РљР°СЂС‚РёРЅРєР° СЃРїСЂР°РІР°"],
      ["paymentStrip", "Р‘Р»РѕРє РѕРїР»Р°С‚С‹ РїРѕРґ РїРµСЂРІС‹Рј СЌРєСЂР°РЅРѕРј"],
      ["stats", "Р‘Р»РѕРє С†РёС„СЂ"],
      ["drops", "Р“РѕСЂСЏС‡РёРµ РїСЂРµРґР»РѕР¶РµРЅРёСЏ"],
      ["advantages", "РќР°С€Рё РїСЂРµРёРјСѓС‰РµСЃС‚РІР°"],
      ["homeCategories", "Р Р°Р·РґРµР»С‹ РјР°РіР°Р·РёРЅР° РЅР° РіР»Р°РІРЅРѕР№"],
      ["pages", "РЎС‚Р°СЂС‹Р№ Р±Р»РѕРє СЃС‚СЂР°РЅРёС†"],
      ["telegramBlock", "Telegram-Р±Р»РѕРє"],
      ["workSteps", "РљР°Рє РјС‹ СЂР°Р±РѕС‚Р°РµРј"],
      ["reviews", "РћС‚Р·С‹РІС‹"],
      ["homeNews", "РќРѕРІРѕСЃС‚Рё РЅР° РіР»Р°РІРЅРѕР№"],
      ["partnerCta", "Р‘Р»РѕРє РЎС‚Р°С‚СЊ РїР°СЂС‚РЅРµСЂРѕРј"],
      ["contact", "Р¤РѕСЂРјР° Р·Р°СЏРІРєРё"],
      ["faq", "FAQ"],
      ["finalCta", "Р¤РёРЅР°Р»СЊРЅС‹Р№ CTA"],
      ["footer", "Footer"],
    ],
  },
  {
    title: "РњР°РіР°Р·РёРЅ Рё СЃС‚СЂР°РЅРёС†С‹",
    items: [
      ["shopHero", "Р’РµСЂС…РЅРёР№ Р±Р»РѕРє РјР°РіР°Р·РёРЅР°"],
      ["shopCategories", "РљР°С‚РµРіРѕСЂРёРё РјР°РіР°Р·РёРЅР°"],
      ["shopFilters", "Р¤РёР»СЊС‚СЂС‹ Рё СЃРѕСЂС‚РёСЂРѕРІРєР°"],
      ["shopProducts", "РЎРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ"],
      ["shopVipBanners", "VIP-Р±Р°РЅРЅРµСЂС‹"],
      ["infoHero", "Р’РµСЂС…РЅРёР№ Р±Р»РѕРє РќРѕРІРѕСЃС‚Рё / РЎРѕР±С‹С‚РёСЏ / РџР°СЂС‚РЅРµСЂС‹"],
    ],
  },
];

const NEWS_ADMIN_CATEGORIES = [
  ["arbitraj", "РђСЂР±РёС‚СЂР°Р¶"],
  ["kripto", "РљСЂРёРїС‚РѕРІР°Р»СЋС‚Р°"],
  ["marketing", "РњР°СЂРєРµС‚РёРЅРі"],
];

const COUNTRY_FLAG_OPTIONS = [
  ["", "Без флага"],
  ["🇺🇦", "🇺🇦 Украина"],
  ["🇺🇸", "🇺🇸 США"],
  ["🇬🇧", "🇬🇧 Великобритания"],
  ["🇩🇪", "🇩🇪 Германия"],
  ["🇵🇱", "🇵🇱 Польша"],
  ["🇫🇷", "🇫🇷 Франция"],
  ["🇪🇸", "🇪🇸 Испания"],
  ["🇮🇹", "🇮🇹 Италия"],
  ["🇳🇱", "🇳🇱 Нидерланды"],
  ["🇨🇦", "🇨🇦 Канада"],
  ["🇧🇷", "🇧🇷 Бразилия"],
  ["🇹🇷", "🇹🇷 Турция"],
  ["🇮🇳", "🇮🇳 Индия"],
  ["🇯🇵", "🇯🇵 Япония"],
];

const ADMIN_LABELS_RU = {
  fields: {
    id: "ID РєР°С‚РµРіРѕСЂРёРё",
    icon: "РРєРѕРЅРєР°",
    name: "РќР°Р·РІР°РЅРёРµ",
    site: "РЎСЃС‹Р»РєР° РЅР° СЃР°Р№С‚",
    siteLabel: "Текст кнопки SITE",
    promo: "РџСЂРѕРјРѕРєРѕРґ",
    price: "Р¦РµРЅР°",
    stockQty: "РќР°Р»РёС‡РёРµ",
    countryFlag: "Р¤Р»Р°Рі СЃС‚СЂР°РЅС‹",
    category: "РљР°С‚РµРіРѕСЂРёСЏ",
    badge: "Р‘РµР№РґР¶",
    status: "РЎС‚Р°С‚СѓСЃ",
    inStock: "Р’ РЅР°Р»РёС‡РёРё",
    drop: "РџРѕРєР°Р·С‹РІР°С‚СЊ РЅР° РіР»Р°РІРЅРѕР№",
    featured: "РђРєС†РµРЅС‚РЅР°СЏ РєР°СЂС‚РѕС‡РєР°",
    size: "Р Р°Р·РјРµСЂ РєР°СЂС‚РѕС‡РєРё",
    date: "Р”Р°С‚Р°",
    value: "Р—РЅР°С‡РµРЅРёРµ",
    code: "Промокод",
    discount: "Скидка %",
  },
  i18n: {
    title: "Р—Р°РіРѕР»РѕРІРѕРє",
    name: "РќР°Р·РІР°РЅРёРµ",
    text: "РўРµРєСЃС‚",
    description: "РћРїРёСЃР°РЅРёРµ",
    categoryLabel: "РџРѕРґРїРёСЃСЊ РєР°С‚РµРіРѕСЂРёРё",
    status: "РЎС‚Р°С‚СѓСЃ",
    excerpt: "РљРѕСЂРѕС‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ",
    body: "РўРµРєСЃС‚ СЃС‚Р°С‚СЊРё",
    location: "РњРµСЃС‚Рѕ",
    question: "Р’РѕРїСЂРѕСЃ",
    answer: "РћС‚РІРµС‚",
    label: "РџРѕРґРїРёСЃСЊ",
  },
  images: {
    categories: "РљР°СЂС‚РёРЅРєР° РєР°С‚РµРіРѕСЂРёРё",
    products: "РљР°СЂС‚РёРЅРєР° С‚РѕРІР°СЂР°",
    guides: "РћР±Р»РѕР¶РєР° РЅРѕРІРѕСЃС‚Рё",
    events: "РљР°СЂС‚РёРЅРєР° СЃРѕР±С‹С‚РёСЏ",
    partnersList: "Р›РѕРіРѕС‚РёРї РїР°СЂС‚РЅРµСЂР°",
  },
};

ADMIN_LABELS_RU.fields.visible = "Показывать на сайте";
ddFixDeep(VISIBILITY_GROUPS);
ddFixDeep(NEWS_ADMIN_CATEGORIES);
ddFixDeep(ADMIN_LABELS_RU);

function updateAuthView() {
  const authed = localStorage.getItem(DD_ADMIN_AUTH_KEY) === "1";
  document.body.classList.toggle("admin-locked", !authed);
  if (loginScreen) loginScreen.classList.toggle("is-hidden", authed);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function setStatus(text) {
  if (saveStatus) saveStatus.textContent = typeof ddFixText === "function" ? ddFixText(text) : text;
}

function fixAdminText(root = document.body) {
  if (typeof ddFixText !== "function" || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const fixed = ddFixText(node.nodeValue);
    if (fixed !== node.nodeValue) node.nodeValue = fixed;
  });
  document.querySelectorAll("[title], [aria-label], [placeholder]").forEach((node) => {
    ["title", "aria-label", "placeholder"].forEach((attr) => {
      if (!node.hasAttribute(attr)) return;
      const current = node.getAttribute(attr);
      const fixed = ddFixText(current);
      if (fixed !== current) node.setAttribute(attr, fixed);
    });
  });
}

function rawMulti(value) {
  if (value && typeof value === "object") return { ua: value.ua || "", en: value.en || "", ru: value.ru || "" };
  return { ua: value || "", en: "", ru: "" };
}

function field(name) {
  return form?.elements[name];
}

function imagePreview(src) {
  return src ? `<div class="image-preview filled" style="background-image:url('${src}')"></div>` : `<div class="image-preview">РќРµС‚ РєР°СЂС‚РёРЅРєРё</div>`;
}

function categoryOptions(selected) {
  return (adminData.categories || [])
    .map((category) => `<option value="${category.id}" ${category.id === selected ? "selected" : ""}>${ddText(category.title, "ua") || category.id}</option>`)
    .join("");
}

function newsCategoryOptions(selected = "arbitraj") {
  return NEWS_ADMIN_CATEGORIES
    .map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`)
    .join("");
}

function flagOptions(selected = "") {
  return COUNTRY_FLAG_OPTIONS
    .map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`)
    .join("");
}

function normalizeAdminData() {
  adminData.visibility = ddNormalizeVisibility(adminData.visibility);
  adminData.coupons = ddNormalizeCoupons(adminData.coupons);
  adminData.categories = adminData.categories || [];
  adminData.products = adminData.products || [];
  adminData.guides = adminData.guides || [];
  adminData.guides.forEach((item) => {
    item.category ||= "arbitraj";
  });

  const addCategoryIfMissing = (category) => {
    if (!category?.id || adminData.categories.some((item) => item.id === category.id)) return;
    adminData.categories.push(ddClone(category));
  };

  (DD_DEFAULT_DATA.categories || []).forEach(addCategoryIfMissing);

  [...new Set(adminData.products.map((product) => product.category).filter(Boolean))].forEach((id) => {
    if (adminData.categories.some((category) => category.id === id)) return;
    const sample = adminData.products.find((product) => product.category === id);
    adminData.categories.push({
      id,
      icon: (id || "#").slice(0, 2).toUpperCase(),
      image: "",
      title: rawMulti(sample?.categoryLabel || id),
      text: {
        ua: "Р РѕР·РґС–Р» С‚РѕРІР°СЂС–РІ",
        en: "Product section",
        ru: "Р Р°Р·РґРµР» С‚РѕРІР°СЂРѕРІ",
      },
    });
  });
}

function multiInputs(scope, key, value, label, area = false) {
  const data = rawMulti(value);
  return ["ua", "en", "ru"]
    .map((lang) => {
      const attr = `data-${scope}-i18n="${key}" data-lang-field="${lang}"`;
      return area
        ? `<label class="wide">${label} ${lang.toUpperCase()}<textarea ${attr}>${data[lang]}</textarea></label>`
        : `<label>${label} ${lang.toUpperCase()}<input ${attr} value="${data[lang]}" /></label>`;
    })
    .join("");
}

function visibleToggle(item) {
  return `<label class="check-row visibility-inline"><input data-field="visible" type="checkbox" ${item.visible !== false ? "checked" : ""} />Показывать на сайте</label>`;
}

function renderVisibilityEditor() {
  if (!editors.visibility) return;
  adminData.visibility = ddNormalizeVisibility(adminData.visibility);
  editors.visibility.innerHTML = VISIBILITY_GROUPS.map((group) => `
    <article class="admin-card visibility-card">
      <div class="admin-card-title"><strong>${group.title}</strong></div>
      <div class="visibility-list">
        ${group.items.map(([key, label]) => `
          <label class="check-row">
            <input type="checkbox" data-visibility-key="${key}" ${adminData.visibility[key] !== false ? "checked" : ""} />
            ${label}
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function categoryCard(category, index) {
  const count = (adminData.products || []).filter((product) => product.category === category.id).length;
  return `
    <article class="admin-card category-admin-card" data-row="categories" data-index="${index}">
      <div class="admin-card-title">
        <div>
          <strong>${ddText(category.title, "ua") || category.id}</strong>
          <small>${count} С‚РѕРІР°СЂРѕРІ В· Р“Р»Р°РІРЅР°СЏ + РњР°РіР°Р·РёРЅ</small>
        </div>
        <button class="danger-button" type="button" data-remove="categories" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button>
      </div>
      ${imagePreview(category.image)}
      <label class="wide">РљР°СЂС‚РёРЅРєР° СЂР°Р·РґРµР»Р° / Р»РѕРіРѕС‚РёРї<input type="file" accept="image/*" data-image-list="categories" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(category)}
        <label>ID СЂР°Р·РґРµР»Р°<input data-field="id" value="${category.id}" placeholder="google" /></label>
        <label>Р—РЅР°Рє РµСЃР»Рё РЅРµС‚ РєР°СЂС‚РёРЅРєРё<input data-field="icon" maxlength="4" value="${category.icon || ""}" /></label>
        ${multiInputs("item", "title", category.title, "РќР°Р·РІР°РЅРёРµ")}
        ${multiInputs("item", "text", category.text, "РћРїРёСЃР°РЅРёРµ", true)}
        <label class="wide">Подкатегории строкой<input data-field="subcategories" value="${category.subcategories || ""}" placeholder="GMAIL · HOTMAIL · FIRSTMAIL" /></label>
      </div>
    </article>
  `;
}

function fillContent() {
  Object.entries(adminData.content).forEach(([key, value]) => {
    if (!field(key)) return;
    field(key).value = typeof value === "object" ? ddText(value, "ua") : value || "";
  });
  document.querySelectorAll("[data-content-preview]").forEach((node) => {
    const key = node.dataset.contentPreview;
    node.classList.toggle("filled", Boolean(adminData.content[key]));
    node.style.backgroundImage = adminData.content[key] ? `url('${adminData.content[key]}')` : "";
    node.textContent = adminData.content[key] ? "" : "РќРµС‚ РєР°СЂС‚РёРЅРєРё";
  });
}

function productCard(product, index) {
  return `
    <article class="admin-card" data-row="products" data-index="${index}">
      <div class="admin-card-title">
        <strong>${ddText(product.name, "ua") || "РќРѕРІРёР№ С‚РѕРІР°СЂ"}</strong>
        <div class="admin-actions">
          <button class="cart-button" type="button" data-auto-product="${index}">РђРІС‚РѕРїРµСЂРµРІРѕРґ</button>
          <button class="danger-button" type="button" data-remove="products" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button>
        </div>
      </div>
      ${imagePreview(product.image)}
      <label class="wide">РљР°СЂС‚РёРЅРєР° С‚РѕРІР°СЂР°<input type="file" accept="image/*" data-image-list="products" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(product)}
        ${multiInputs("item", "name", product.name, "РќР°Р·РІР°РЅРёРµ")}
        ${multiInputs("item", "description", product.description, "РћРїРёСЃР°РЅРёРµ", true)}
        ${multiInputs("item", "details", product.details, "Доп. информация на странице товара", true)}
        <label>Р¦РµРЅР°<input data-field="price" type="number" min="0" value="${product.price}" /></label>
        <label>Количество в наличии<input data-field="stockQty" type="number" min="0" value="${product.stockQty ?? 0}" /></label>
        <label>Флаг страны аккаунта
          <select data-field="countryFlag">${flagOptions(product.countryFlag || "")}</select>
        </label>
        <label>РљР°С‚РµРіРѕСЂРёСЏ
          <select data-field="category">
            ${categoryOptions(product.category)}
          </select>
        </label>
        <label>Подкатегория товара<input data-field="subcategory" value="${product.subcategory || ""}" placeholder="GMAIL / HOTMAIL / BM / FARM" /></label>
        ${multiInputs("item", "categoryLabel", product.categoryLabel, "РџРѕРґРїРёСЃСЊ РєР°С‚РµРіРѕСЂРёРё")}
        <label>Р‘РµР№РґР¶<input data-field="badge" maxlength="4" value="${product.badge}" /></label>
        ${multiInputs("item", "status", product.status, "РЎС‚Р°С‚СѓСЃ")}
        <label class="check-row"><input data-field="inStock" type="checkbox" ${product.inStock !== false ? "checked" : ""} />Р’ РЅР°Р»РёС‡РёРё</label>
        <label class="check-row"><input data-field="drop" type="checkbox" ${product.drop ? "checked" : ""} />РџРѕРєР°Р·С‹РІР°С‚СЊ РІ РґСЂРѕРїР°С…</label>
        <label class="check-row"><input data-field="featured" type="checkbox" ${product.featured ? "checked" : ""} />РђРєС†РµРЅС‚РЅР°СЏ РєР°СЂС‚РѕС‡РєР°</label>
      </div>
    </article>
  `;
}

function guideCard(item, index) {
  return `
    <article class="admin-card" data-row="guides" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua")}</strong><button class="danger-button" type="button" data-remove="guides" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      ${imagePreview(item.image)}
      <label class="wide">Р—Р°РіР»Р°РІРЅР°СЏ РєР°СЂС‚РёРЅРєР°<input type="file" accept="image/*" data-image-list="guides" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>РўРµРјР°С‚РёРєР°
          <select data-field="category">${newsCategoryOptions(item.category || "arbitraj")}</select>
        </label>
        ${multiInputs("item", "title", item.title, "Р—Р°РіРѕР»РѕРІРѕРє")}
        ${multiInputs("item", "excerpt", item.excerpt, "РљРѕСЂРѕС‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ", true)}
        ${multiInputs("item", "body", item.body, "РўРµРєСЃС‚ СЃС‚Р°С‚СЊРё", true)}
        <label>Р Р°Р·РјРµСЂ РєР°СЂС‚РѕС‡РєРё<select data-field="size"><option value="medium" ${item.size === "medium" ? "selected" : ""}>medium</option><option value="large" ${item.size === "large" ? "selected" : ""}>large</option></select></label>
      </div>
    </article>
  `;
}

function eventCard(item, index) {
  return `
    <article class="admin-card" data-row="events" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua")}</strong><button class="danger-button" type="button" data-remove="events" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      ${imagePreview(item.image)}
      <label class="wide">РљР°СЂС‚РёРЅРєР° РїРѕРґС–С—<input type="file" accept="image/*" data-image-list="events" data-index="${index}" data-image-key="image" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        ${multiInputs("item", "title", item.title, "РќР°Р·РІР°РЅРёРµ")}
        <label>Р”Р°С‚Р°<input data-field="date" type="date" value="${item.date || ""}" /></label>
        ${multiInputs("item", "location", item.location, "РњРµСЃС‚Рѕ")}
        ${multiInputs("item", "text", item.text, "РћРїРёСЃР°РЅРёРµ", true)}
      </div>
    </article>
  `;
}

function partnerCard(item, index) {
  return `
    <article class="admin-card" data-row="partnersList" data-index="${index}">
      <div class="admin-card-title"><strong>${item.name}</strong><button class="danger-button" type="button" data-remove="partnersList" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      ${imagePreview(item.logo)}
      <label class="wide">Р›РѕРіРѕС‚РёРї РїР°СЂС‚РЅРµСЂР°<input type="file" accept="image/*" data-image-list="partnersList" data-index="${index}" data-image-key="logo" /></label>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>РќР°Р·РІР°РЅРёРµ<input data-field="name" value="${item.name}" /></label>
        <label>РЎР°Р№С‚<input data-field="site" value="${item.site}" /></label>
        <label>Текст кнопки SITE<input data-field="siteLabel" value="${item.siteLabel || "SITE"}" /></label>
        <label>РџСЂРѕРјРѕРєРѕРґ<input data-field="promo" value="${item.promo}" /></label>
        ${multiInputs("item", "text", item.text, "РћРїРёСЃР°РЅРёРµ", true)}
      </div>
    </article>
  `;
}

function faqCard(item, index) {
  return `
    <article class="admin-card" data-row="faq" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.question, "ua")}</strong><button class="danger-button" type="button" data-remove="faq" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        ${multiInputs("item", "question", item.question, "Р’РѕРїСЂРѕСЃ")}
        ${multiInputs("item", "answer", item.answer, "РћС‚РІРµС‚", true)}
      </div>
    </article>
  `;
}

function paymentCard(item, index) {
  return `
    <article class="admin-card" data-row="paymentStrip" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua") || "РћРїР»Р°С‚Р°"}</strong><button class="danger-button" type="button" data-remove="paymentStrip" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>РРєРѕРЅРєР°<input data-field="icon" maxlength="4" value="${item.icon || ""}" /></label>
        ${multiInputs("item", "title", item.title, "РќР°Р·РІР°РЅРёРµ")}
        ${multiInputs("item", "text", item.text, "РћРїРёСЃР°РЅРёРµ", true)}
      </div>
    </article>
  `;
}

function couponCard(item, index) {
  return `
    <article class="admin-card" data-row="coupons" data-index="${index}">
      <div class="admin-card-title"><strong>${item.code || "Промокод"}</strong><button class="danger-button" type="button" data-remove="coupons" data-index="${index}">Удалить</button></div>
      <div class="admin-card-grid">
        <label>Показывать<input data-field="active" type="checkbox" ${item.active !== false ? "checked" : ""} /></label>
        <label>Промокод<input data-field="code" value="${item.code || ""}" /></label>
        <label>Скидка %<input data-field="discount" type="number" min="0" max="100" value="${item.discount ?? 10}" /></label>
      </div>
    </article>
  `;
}

function statCard(item, index) {
  return `
    <article class="admin-card" data-row="stats" data-index="${index}">
      <div class="admin-card-title"><strong>${item.value || "Р¦РёС„СЂР°"}</strong><button class="danger-button" type="button" data-remove="stats" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>Р—РЅР°С‡РµРЅРёРµ<input data-field="value" value="${item.value || ""}" /></label>
        ${multiInputs("item", "label", item.label, "РџРѕРґРїРёСЃСЊ")}
      </div>
    </article>
  `;
}

function advantageCard(item, index) {
  return `
    <article class="admin-card" data-row="advantages" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.text, "ua") || "РџСЂРµРёРјСѓС‰РµСЃС‚РІРѕ"}</strong><button class="danger-button" type="button" data-remove="advantages" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>РРєРѕРЅРєР°<input data-field="icon" maxlength="4" value="${item.icon || ""}" /></label>
        ${multiInputs("item", "text", item.text, "РўРµРєСЃС‚", true)}
      </div>
    </article>
  `;
}

function workStepCard(item, index) {
  return `
    <article class="admin-card" data-row="workSteps" data-index="${index}">
      <div class="admin-card-title"><strong>${ddText(item.title, "ua") || "РЁР°Рі"}</strong><button class="danger-button" type="button" data-remove="workSteps" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        ${multiInputs("item", "title", item.title, "Р—Р°РіРѕР»РѕРІРѕРє")}
        ${multiInputs("item", "text", item.text, "РўРµРєСЃС‚", true)}
      </div>
    </article>
  `;
}

function reviewCard(item, index) {
  return `
    <article class="admin-card" data-row="reviews" data-index="${index}">
      <div class="admin-card-title"><strong>${item.name || "РћС‚Р·С‹РІ"}</strong><button class="danger-button" type="button" data-remove="reviews" data-index="${index}">РЈРґР°Р»РёС‚СЊ</button></div>
      <div class="admin-card-grid">
        ${visibleToggle(item)}
        <label>РРјСЏ<input data-field="name" value="${item.name || ""}" /></label>
        ${multiInputs("item", "text", item.text, "РўРµРєСЃС‚", true)}
      </div>
    </article>
  `;
}

function renderAdmin() {
  normalizeAdminData();
  fillContent();
  renderVisibilityEditor();
  if (editors.paymentStrip) editors.paymentStrip.innerHTML = (adminData.paymentStrip || []).map(paymentCard).join("");
  if (editors.coupons) editors.coupons.innerHTML = (adminData.coupons || []).map(couponCard).join("");
  if (editors.stats) editors.stats.innerHTML = (adminData.stats || []).map(statCard).join("");
  if (editors.advantages) editors.advantages.innerHTML = (adminData.advantages || []).map(advantageCard).join("");
  if (editors.workSteps) editors.workSteps.innerHTML = (adminData.workSteps || []).map(workStepCard).join("");
  if (editors.reviews) editors.reviews.innerHTML = (adminData.reviews || []).map(reviewCard).join("");
  editors.categories.innerHTML = (adminData.categories || []).map(categoryCard).join("");
  editors.products.innerHTML = (adminData.products || []).map(productCard).join("");
  editors.guides.innerHTML = (adminData.guides || []).map(guideCard).join("");
  editors.events.innerHTML = (adminData.events || []).map(eventCard).join("");
  editors.partnersList.innerHTML = (adminData.partnersList || []).map(partnerCard).join("");
  editors.faq.innerHTML = (adminData.faq || []).map(faqCard).join("");
  normalizeAdminLabels();
  fixAdminText();
}

function setControlLabel(control, text) {
  const label = control?.closest("label");
  if (!label) return;
  Array.from(label.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) node.remove();
  });
  const textNode = document.createTextNode(text);
  if (control.type === "checkbox") label.append(textNode);
  else label.insertBefore(textNode, label.firstChild);
}

function normalizeAdminLabels() {
  const fieldLabels = ADMIN_LABELS_RU.fields;
  const i18nLabels = ADMIN_LABELS_RU.i18n;
  const imageLabels = ADMIN_LABELS_RU.images;

  document.querySelectorAll("[data-field]").forEach((control) => {
    setControlLabel(control, fieldLabels[control.dataset.field] || control.dataset.field);
  });
  document.querySelectorAll("[data-item-i18n]").forEach((control) => {
    const base = i18nLabels[control.dataset.itemI18n] || control.dataset.itemI18n;
    const lang = (control.dataset.langField || "").toUpperCase();
    setControlLabel(control, `${base} ${lang}`.trim());
  });
  document.querySelectorAll("[data-image-list]").forEach((control) => {
    setControlLabel(control, imageLabels[control.dataset.imageList] || "Image");
  });
  document.querySelectorAll(".image-preview:not(.filled)").forEach((node) => {
    if (node.textContent.trim()) node.textContent = "РќРµС‚ РєР°СЂС‚РёРЅРєРё";
  });
  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.textContent = "РЈРґР°Р»РёС‚СЊ";
  });
  document.querySelectorAll("[data-auto-product]").forEach((button) => {
    button.textContent = "РђРІС‚РѕРїРµСЂРµРІРѕРґ";
  });
}

function collectContent() {
  Object.keys(adminData.content).forEach((key) => {
    if (!field(key)) return;
    if (typeof adminData.content[key] === "object") {
      adminData.content[key] = { ...rawMulti(adminData.content[key]), ua: field(key).value };
    } else {
      adminData.content[key] = field(key).value;
    }
  });
}

function updateItemInput(input) {
  const card = input.closest("[data-row]");
  if (!card) return;
  const list = card.dataset.row;
  const index = Number(card.dataset.index);
  const item = adminData[list][index];
  const key = input.dataset.field;
  const i18nKey = input.dataset.itemI18n;

  if (key) item[key] = input.type === "checkbox" ? input.checked : input.type === "number" ? Number(input.value) : input.value;
  if (i18nKey) {
    item[i18nKey] = rawMulti(item[i18nKey]);
    item[i18nKey][input.dataset.langField] = input.value;
  }
}

function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSide = 1100;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const keepsAlpha = /image\/(png|webp|gif|avif)/i.test(file.type || "");
        resolve(keepsAlpha ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.86));
      };
      image.onerror = () => resolve(reader.result);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function autoProduct(index) {
  const product = adminData.products[index];
  ["name", "description", "details", "categoryLabel", "status"].forEach((key) => {
    product[key] = rawMulti(product[key]);
    product[key].en ||= product[key].ua;
    product[key].ru ||= product[key].ua;
  });
  renderAdmin();
}

async function saveAll() {
  collectContent();
  setStatus("Сохраняю на сервер...");
  try {
    let savedData = null;
    for (const endpoint of DD_API_ENDPOINTS) {
      try {
        const separator = endpoint.includes("?") ? "&" : "?";
        const response = await fetch(`${endpoint}${separator}ts=${Date.now()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
          body: JSON.stringify(adminData),
        });
        if (!response.ok) continue;
        savedData = await response.json();
        break;
      } catch (error) {}
    }
    if (!savedData) throw new Error("Save failed");
    adminData = ddMergeStoreData(savedData);
    setStatus("Сохранено в базу. Изменения сразу доступны всем посетителям.");
  } catch (error) {
    setStatus("Не удалось сохранить на сервер. Проверь backend/права на data/db.json.");
  }
}

form?.addEventListener("input", (event) => {
  const visibilityToggle = event.target.closest("[data-visibility-key]");
  if (visibilityToggle) {
    adminData.visibility = ddNormalizeVisibility(adminData.visibility);
    adminData.visibility[visibilityToggle.dataset.visibilityKey] = visibilityToggle.checked;
    setStatus("Есть несохраненные изменения");
    return;
  }
  collectContent();
  updateItemInput(event.target);
  setStatus("Есть несохраненные изменения");
});

form?.addEventListener("change", async (event) => {
  const contentImage = event.target.closest("[data-content-image]");
  const listImage = event.target.closest("[data-image-list]");
  const file = event.target.files?.[0];
  if (!file) return;
  const src = await readImage(file);

  if (contentImage) adminData.content[contentImage.dataset.contentImage] = src;
  if (listImage) adminData[listImage.dataset.imageList][Number(listImage.dataset.index)][listImage.dataset.imageKey] = src;
  renderAdmin();
  setStatus("РљР°СЂС‚РёРЅРєР° Р·Р°РіСЂСѓР¶РµРЅР°. РќРµ Р·Р°Р±СѓРґСЊС‚Рµ СЃРѕС…СЂР°РЅРёС‚СЊ.");
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const login = loginForm.elements.login.value.trim();
  const password = loginForm.elements.password.value;
  if (login === DD_ADMIN_LOGIN && password === DD_ADMIN_PASSWORD) {
    localStorage.setItem(DD_ADMIN_AUTH_KEY, "1");
    if (loginError) loginError.textContent = "";
    updateAuthView();
    return;
  }
  if (loginError) loginError.textContent = "РќРµРІРµСЂРЅС‹Р№ Р»РѕРіРёРЅ РёР»Рё РїР°СЂРѕР»СЊ";
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-admin-logout]")) {
    localStorage.removeItem(DD_ADMIN_AUTH_KEY);
    updateAuthView();
  }

  const tab = event.target.closest("[data-admin-tab]");
  if (tab) {
    document.querySelectorAll("[data-admin-tab]").forEach((button) => button.classList.remove("active"));
    document.querySelectorAll("[data-admin-section]").forEach((section) => section.classList.add("is-hidden"));
    tab.classList.add("active");
    document.querySelector(`[data-admin-section="${tab.dataset.adminTab}"]`)?.classList.remove("is-hidden");
  }

  if (event.target.closest("[data-save]")) saveAll();
  if (event.target.closest("[data-reset]")) {
    adminData = ddClone(DD_DEFAULT_DATA);
    renderAdmin();
    setStatus("Данные сброшены в форме. Нажмите сохранить, чтобы обновить базу.");
  }

  const remove = event.target.closest("[data-remove]");
  if (remove) {
    adminData[remove.dataset.remove].splice(Number(remove.dataset.index), 1);
    renderAdmin();
    setStatus("РЈРґР°Р»РµРЅРѕ. РќРµ Р·Р°Р±СѓРґСЊС‚Рµ СЃРѕС…СЂР°РЅРёС‚СЊ.");
  }

  const auto = event.target.closest("[data-auto-product]");
  if (auto) autoProduct(Number(auto.dataset.autoProduct));

  if (event.target.closest("[data-add-category]")) {
    adminData.categories.unshift({
      id: uid("category"),
      icon: "#",
      image: "",
      title: { ua: "РќРѕРІР° РєР°С‚РµРіРѕСЂС–СЏ", en: "New category", ru: "РќРѕРІР°СЏ РєР°С‚РµРіРѕСЂРёСЏ" },
      text: { ua: "РћРїРёСЃ РєР°С‚РµРіРѕСЂС–С—", en: "Category description", ru: "РћРїРёСЃР°РЅРёРµ РєР°С‚РµРіРѕСЂРёРё" },
    });
    renderAdmin();
    setStatus("РљР°С‚РµРіРѕСЂРёСЏ РґРѕР±Р°РІР»РµРЅР°.");
  }

  if (event.target.closest("[data-add-payment]")) {
    adminData.paymentStrip = adminData.paymentStrip || [];
    adminData.paymentStrip.push({
      icon: "$",
      title: { ua: "РќРѕРІРёР№ СЃРїРѕСЃС–Р±", en: "New method", ru: "РќРѕРІС‹Р№ СЃРїРѕСЃРѕР±" },
      text: { ua: "РћРїРёСЃ РѕРїР»Р°С‚Рё", en: "Payment note", ru: "РћРїРёСЃР°РЅРёРµ РѕРїР»Р°С‚С‹" },
    });
    renderAdmin();
    setStatus("РџР»Р°С‚РµР¶РЅС‹Р№ РїСѓРЅРєС‚ РґРѕР±Р°РІР»РµРЅ.");
  }

  if (event.target.closest("[data-add-coupon]")) {
    adminData.coupons = adminData.coupons || [];
    adminData.coupons.push({ code: "DD2026", discount: 10, active: true });
    renderAdmin();
    setStatus("Промокод добавлен.");
  }

  if (event.target.closest("[data-add-stat]")) {
    adminData.stats = adminData.stats || [];
    adminData.stats.push({ value: "100+", label: { ua: "РЅРѕРІРёР№ РїРѕРєР°Р·РЅРёРє", en: "new stat", ru: "РЅРѕРІС‹Р№ РїРѕРєР°Р·Р°С‚РµР»СЊ" } });
    renderAdmin();
    setStatus("РџРѕРєР°Р·Р°С‚РµР»СЊ РґРѕР±Р°РІР»РµРЅ.");
  }

  if (event.target.closest("[data-add-advantage]")) {
    adminData.advantages = adminData.advantages || [];
    adminData.advantages.push({ icon: "вњ“", text: { ua: "РќРѕРІР° РїРµСЂРµРІР°РіР°", en: "New advantage", ru: "РќРѕРІРѕРµ РїСЂРµРёРјСѓС‰РµСЃС‚РІРѕ" } });
    renderAdmin();
    setStatus("РџСЂРµРёРјСѓС‰РµСЃС‚РІРѕ РґРѕР±Р°РІР»РµРЅРѕ.");
  }

  if (event.target.closest("[data-add-work-step]")) {
    adminData.workSteps = adminData.workSteps || [];
    adminData.workSteps.push({
      title: { ua: "РќРѕРІРёР№ РєСЂРѕРє", en: "New step", ru: "РќРѕРІС‹Р№ С€Р°Рі" },
      text: { ua: "РћРїРёСЃ РєСЂРѕРєСѓ", en: "Step description", ru: "РћРїРёСЃР°РЅРёРµ С€Р°РіР°" },
    });
    renderAdmin();
    setStatus("РЁР°Рі РґРѕР±Р°РІР»РµРЅ.");
  }

  if (event.target.closest("[data-add-review]")) {
    adminData.reviews = adminData.reviews || [];
    adminData.reviews.push({ name: "Client", text: { ua: "РќРѕРІРёР№ РІС–РґРіСѓРє", en: "New review", ru: "РќРѕРІС‹Р№ РѕС‚Р·С‹РІ" } });
    renderAdmin();
    setStatus("РћС‚Р·С‹РІ РґРѕР±Р°РІР»РµРЅ.");
  }

  if (event.target.closest("[data-add-product]")) {
    adminData.products.unshift({
      id: uid("product"),
      name: { ua: "РќРѕРІРёР№ С‚РѕРІР°СЂ", en: "", ru: "" },
      description: { ua: "РћРїРёСЃ С‚РѕРІР°СЂСѓ", en: "", ru: "" },
      details: { ua: "Детальное описание товара", en: "", ru: "" },
      category: "social",
      subcategory: "",
      categoryLabel: { ua: "РЎРѕС†РјРµСЂРµР¶С–", en: "", ru: "" },
      badge: "NN",
      status: { ua: "Р’ РЅР°СЏРІРЅРѕСЃС‚С–", en: "", ru: "" },
      price: 25,
      stockQty: 10,
      countryFlag: "",
      featured: false,
      drop: false,
      inStock: true,
      image: "",
    });
    autoProduct(0);
    setStatus("РўРѕРІР°СЂ РґРѕР±Р°РІР»РµРЅ.");
  }

  if (event.target.closest("[data-add-guide]")) {
    adminData.guides.unshift({ id: uid("news"), title: { ua: "РќРѕРІР° РЅРѕРІРёРЅР°", en: "New post", ru: "РќРѕРІР°СЏ РЅРѕРІРѕСЃС‚СЊ" }, excerpt: { ua: "РљРѕСЂРѕС‚РєРёР№ РѕРїРёСЃ", en: "Short excerpt", ru: "РљРѕСЂРѕС‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ" }, body: { ua: "РўРµРєСЃС‚ РЅРѕРІРёРЅРё", en: "Article text", ru: "РўРµРєСЃС‚ РЅРѕРІРѕСЃС‚Рё" }, category: "arbitraj", size: "medium", image: "" });
    renderAdmin();
  }

  if (event.target.closest("[data-add-event]")) {
    adminData.events.unshift({ id: uid("event"), title: { ua: "РќРѕРІР° РїРѕРґС–СЏ", en: "New event", ru: "РќРѕРІРѕРµ СЃРѕР±С‹С‚РёРµ" }, date: "", location: { ua: "Online", en: "Online", ru: "Online" }, text: { ua: "РћРїРёСЃ РїРѕРґС–С—", en: "Event description", ru: "РћРїРёСЃР°РЅРёРµ СЃРѕР±С‹С‚РёСЏ" }, image: "" });
    renderAdmin();
  }

  if (event.target.closest("[data-add-partner]")) {
    adminData.partnersList.unshift({ id: uid("partner"), name: "New partner", site: "https://example.com", siteLabel: "SITE", promo: "DAMAGE", text: { ua: "РћРїРёСЃ РїР°СЂС‚РЅРµСЂР°", en: "Partner description", ru: "РћРїРёСЃР°РЅРёРµ РїР°СЂС‚РЅРµСЂР°" }, logo: "" });
    renderAdmin();
  }

  if (event.target.closest("[data-add-faq]")) {
    adminData.faq.push({ question: { ua: "РќРѕРІРµ РїРёС‚Р°РЅРЅСЏ", en: "New question", ru: "РќРѕРІС‹Р№ РІРѕРїСЂРѕСЃ" }, answer: { ua: "Р’С–РґРїРѕРІС–РґСЊ.", en: "Answer.", ru: "РћС‚РІРµС‚." } });
    renderAdmin();
  }
});

async function initAdmin() {
  adminData = await ddLoadServerStore();
  updateAuthView();
  renderAdmin();
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {}
  }
  document.documentElement.classList.add("dd-ready");
}

initAdmin();


