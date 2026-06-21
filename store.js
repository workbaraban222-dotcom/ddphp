const DD_STORAGE_KEY = "doubleDamageStoreV3";
const DD_LANG_KEY = "doubleDamageLang";
const DD_LANGS = ["ua", "en", "ru"];

const DD_CP1251_CHARS = "\u0402\u0403\u201a\u0453\u201e\u2026\u2020\u2021\u20ac\u2030\u0409\u2039\u040a\u040c\u040b\u040f\u0452\u2018\u2019\u201c\u201d\u2022\u2013\u2014\ufffd\u2122\u0459\u203a\u045a\u045c\u045b\u045f\u00a0\u040e\u045e\u0408\u00a4\u0490\u00a6\u00a7\u0401\u00a9\u0404\u00ab\u00ac\u00ad\u00ae\u0407\u00b0\u00b1\u0406\u0456\u0491\u00b5\u00b6\u00b7\u0451\u2116\u0454\u00bb\u0458\u0405\u0455\u0457\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f";

function ddLooksBroken(value) {
  return typeof value === "string" && /(?:Р.|С.|в.|В©|Рџ|Рќ|Рљ|Рђ|Рґ|СЊ|С–|С—|Рі|Рµ|Рё)/.test(value);
}

function ddFixText(value) {
  if (typeof value !== "string") return value;
  const bytes = [];
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code < 128) bytes.push(code);
    else {
      const index = DD_CP1251_CHARS.indexOf(char);
      if (index < 0) return value;
      bytes.push(index + 128);
    }
  }
  try {
    const fixed = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    return fixed.includes("\uFFFD") ? value : fixed;
  } catch {
    return value;
  }
}

function ddFixDeep(value) {
  if (typeof value === "string") return ddFixText(value);
  if (Array.isArray(value)) return value.map(ddFixDeep);
  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => {
      value[key] = ddFixDeep(value[key]);
    });
  }
  return value;
}

const DD_UI = {
  ua: {
    home: "Головна",
    shop: "Магазин",
    guides: "Новини",
    events: "Події",
    partners: "Партнери",
    admin: "Адмінка",
    cart: "Кошик",
    openCatalog: "Відкрити каталог",
    watchDrops: "Дивитись дропи",
    drops: "Гарячі дропи",
    dropsTitle: "Швидкі позиції для старту",
    catalog: "Каталог",
    catalogTitle: "Розділи магазину",
    all: "Всі",
    social: "Соцмережі",
    ads: "Реклама",
    mail: "Пошта",
    bundle: "Набори",
    addCart: "До кошика",
    pagesEyebrow: "Сторінки каталогу",
    pagesTitle: "Окремі входи в розділи",
    advantages: "Наші переваги",
    telegramTitle: "Підпишись в Telegram",
    telegramText: "Будь в курсі всіх подій DOUBLE DAMAGE",
    subscribe: "Підписатися на канал",
    howEyebrow: "Процес роботи",
    howTitle: "Як ми працюємо?",
    howText: "Простий процес від вибору до отримання",
    reviews: "Відгуки",
    faq: "Часті питання",
    request: "Відправити запит",
    cartOrder: "Ваше замовлення",
    emptyCart: "Поки пусто. Додайте позицію з каталогу.",
    total: "Разом",
    checkout: "Оформити запит",
  },
  en: {
    home: "Home",
    shop: "Shop",
    guides: "News",
    events: "Events",
    partners: "Partners",
    admin: "Admin",
    cart: "Cart",
    openCatalog: "Open catalog",
    watchDrops: "View drops",
    drops: "Hot drops",
    dropsTitle: "Fast picks for launch",
    catalog: "Catalog",
    catalogTitle: "Store sections",
    all: "All",
    social: "Social",
    ads: "Ads",
    mail: "Mail",
    bundle: "Bundles",
    addCart: "Add to cart",
    pagesEyebrow: "Catalog pages",
    pagesTitle: "Separate entry points",
    advantages: "Our advantages",
    telegramTitle: "Follow us on Telegram",
    telegramText: "Stay tuned for every DOUBLE DAMAGE update",
    subscribe: "Subscribe to channel",
    howEyebrow: "Work process",
    howTitle: "How we work",
    howText: "A simple flow from choosing to receiving access",
    reviews: "Reviews",
    faq: "FAQ",
    request: "Send request",
    cartOrder: "Your order",
    emptyCart: "Cart is empty. Add an item from the catalog.",
    total: "Total",
    checkout: "Send request",
  },
  ru: {
    home: "Главная",
    shop: "Магазин",
    guides: "Новости",
    events: "События",
    partners: "Партнеры",
    admin: "Админка",
    cart: "Корзина",
    openCatalog: "Открыть каталог",
    watchDrops: "Смотреть дропы",
    drops: "Горячие дропы",
    dropsTitle: "Быстрые позиции для старта",
    catalog: "Каталог",
    catalogTitle: "Разделы магазина",
    all: "Все",
    social: "Соцсети",
    ads: "Реклама",
    mail: "Почта",
    bundle: "Наборы",
    addCart: "В корзину",
    pagesEyebrow: "Странички каталога",
    pagesTitle: "Отдельные входы в разделы",
    advantages: "Наши преимущества",
    telegramTitle: "Подпишись в Telegram",
    telegramText: "Будь в курсе всех событий DOUBLE DAMAGE",
    subscribe: "Подписаться на канал",
    howEyebrow: "Процесс работы",
    howTitle: "Как мы работаем?",
    howText: "Простой процесс от выбора до получения",
    reviews: "Отзывы",
    faq: "Частые вопросы",
    request: "Отправить запрос",
    cartOrder: "Ваш заказ",
    emptyCart: "Пока пусто. Добавьте позицию из каталога.",
    total: "Итого",
    checkout: "Оформить запрос",
  },
};

ddFixDeep(DD_UI);

const DD_DEFAULT_DATA = {
  content: {
    brandName: "DOUBLE DAMAGE",
    brandMark: "DD",
    telegramUrl: "https://t.me/",
    heroImage: "",
    heroImageLight: "",
    heroImageDark: "",
    telegramImage: "",
    shopVipLeftImage: "",
    shopVipLeftUrl: "",
    shopVipRightImage: "",
    shopVipRightUrl: "",
    partnerCtaEyebrow: { ua: "Партнерство", en: "Partnership", ru: "Партнерство" },
    partnerCtaTitle: { ua: "СТАТИ ПАРТНЕРОМ DOUBLE DAMAGE", en: "BECOME A DOUBLE DAMAGE PARTNER", ru: "СТАТЬ ПАРТНЕРОМ DOUBLE DAMAGE" },
    partnerCtaText: { ua: "Залиште контакт або напишіть нам у Telegram - обговоримо трафік, постачання, промокоди та спільні запуски.", en: "Leave a contact or message us on Telegram - we will discuss traffic, supply, promo codes and joint launches.", ru: "Оставьте контакт или напишите нам в Telegram - обсудим трафик, поставки, промокоды и совместные запуски." },
    partnerCtaButton: { ua: "Зв'язатися", en: "Contact us", ru: "Связаться" },
    heroEyebrow: {
      ua: "Расходники для арбитража",
      en: "Traffic arbitrage supplies",
      ru: "Расходники для арбитража",
    },
    heroTitle: {
      ua: "РАСХОДНИКИ ДЛЯ АРБИТРАЖА",
      en: "TRAFFIC SUPPLY MARKET",
      ru: "РАСХОДНИКИ ДЛЯ АРБИТРАЖА",
    },
    heroLead: {
      ua: "Аккаунты, сервисы, инструменты и digital-расходники для медиабаеров, Telegram-команд, SMM и трафик-проектов. Быстро. Жирно. Без лишнего шума.",
      en: "Accounts, services, tools and digital supplies for media buyers, Telegram teams, SMM and traffic projects. Fast. Heavy. No noise.",
      ru: "Аккаунты, сервисы, инструменты и digital-расходники для медиабаеров, Telegram-команд, SMM и трафик-проектов. Быстро. Жирно. Без лишнего шума.",
    },
    shopPageTitle: { ua: "DOUBLE DAMAGE SHOP", en: "DOUBLE DAMAGE SHOP", ru: "DOUBLE DAMAGE SHOP" },
    shopPageText: { ua: "Акаунти, сервіси, інструменти та digital-розхідники для трафіку.", en: "Accounts, services, tools and digital supplies for traffic.", ru: "Аккаунты, сервисы, инструменты и digital-расходники для трафика." },
    guidesPageTitle: { ua: "Новини", en: "News", ru: "Новости" },
    guidesPageText: { ua: "Матеріали про арбітраж, криптовалюту, маркетинг та digital-ринок.", en: "Materials about arbitrage, crypto, marketing and the digital market.", ru: "Материалы про арбитраж, криптовалюту, маркетинг и digital-рынок." },
    eventsPageTitle: { ua: "Події", en: "Events", ru: "События" },
    eventsPageText: { ua: "Анонси конференцій, дропів, оновлення магазину та спеціальні пропозиції.", en: "Conference announcements, drops, store updates and special offers.", ru: "Анонсы конференций, дропов, обновления магазина и специальные предложения." },
    partnersPageTitle: { ua: "Партнери", en: "Partners", ru: "Партнеры" },
    partnersPageText: { ua: "Партнерські пропозиції, промокоди та корисні сервіси DOUBLE DAMAGE.", en: "Partner offers, promo codes and useful DOUBLE DAMAGE services.", ru: "Партнерские предложения, промокоды и полезные сервисы DOUBLE DAMAGE." },
    replacePageTitle: { ua: "Заявка на заміну товару", en: "Product replacement request", ru: "Заявка на замену товара" },
    replacePageText: {
      ua: "Щоб оформити заміну, напишіть у підтримку номер замовлення, опишіть проблему, вкажіть список невалідних акаунтів і прикріпіть скриншот помилки.",
      en: "To request a replacement, send support your order number, describe the issue, list invalid accounts and attach an error screenshot.",
      ru: "Чтобы оформить замену, напишите в поддержку номер заказа, опишите проблему, укажите список невалидных аккаунтов и прикрепите скриншот ошибки.",
    },
    replaceExampleTitle: { ua: "Приклад заявки", en: "Request example", ru: "Пример заявки" },
    replaceExampleText: {
      ua: "#11111\nАкаунт заблокований / невірний логін або пароль / товар не відповідає опису.\nСписок акаунтів або дані товару.\nСкриншот помилки.",
      en: "#11111\nAccount blocked / wrong login or password / product does not match the description.\nAccount list or product data.\nError screenshot.",
      ru: "#11111\nАккаунт заблокирован / неверный логин или пароль / товар не соответствует описанию.\nСписок аккаунтов или данные товара.\nСкриншот ошибки.",
    },
    replaceButtonText: { ua: "Онлайн підтримка по заміні", en: "Replacement support online", ru: "Онлайн поддержка по замене" },
    replaceTermsTitle: { ua: "Умови заміни товару", en: "Replacement terms", ru: "Условия замены товара" },
    replaceTermsText: {
      ua: "Заявка розглядається після перевірки замовлення та опису проблеми. Умови можуть залежати від конкретного товару і постачальника, тому перед покупкою уважно дивіться опис позиції.",
      en: "The request is reviewed after checking the order and issue description. Terms may depend on the specific product and supplier, so review the product description before purchase.",
      ru: "Заявка рассматривается после проверки заказа и описания проблемы. Условия могут зависеть от конкретного товара и поставщика, поэтому перед покупкой внимательно смотрите описание позиции.",
    },
    promoCode: "DAMAGE10",
    contactEyebrow: {
      ua: "Запит поставки",
      en: "Custom request",
      ru: "Запрос поставки",
    },
    contactTitle: {
      ua: "Потрібен свій сетап? Зберемо під задачу",
      en: "Need a custom setup? We will build it",
      ru: "Нужен свой сетап? Соберем под задачу",
    },
    contactText: {
      ua: "Форма залишена прямо на лендингу: покупець може написати, що саме йому потрібно, а кошик збирає готові позиції з каталогу.",
      en: "The form stays on the landing page: a buyer can describe the request while the cart collects ready catalog items.",
      ru: "Форма оставлена прямо на лендинге: покупатель может написать, что именно ему нужно, а корзина собирает готовые позиции из каталога.",
    },
    finalEyebrow: {
      ua: "Traffic supply",
      en: "Traffic supply",
      ru: "Traffic supply",
    },
    finalTitle: {
      ua: "ПОТРІБНІ РОЗХІДНИКИ ПІД ТРАФІК?",
      en: "NEED SUPPLIES FOR TRAFFIC?",
      ru: "НУЖНЫ РАСХОДНИКИ ПОД ТРАФИК?",
    },
    finalText: {
      ua: "Відкрий каталог або напиши нам в Telegram - підберемо потрібні позиції під твою задачу.",
      en: "Open the catalog or message us on Telegram - we will pick the right items for your task.",
      ru: "Открой каталог или напиши нам в Telegram - подберем нужные позиции под твою задачу.",
    },
  },
  visibility: {
    header: true,
    headerNav: true,
    langSwitch: true,
    themeToggle: true,
    telegramHeaderButton: true,
    adminButton: true,
    cartButton: true,
    hero: true,
    heroEyebrow: true,
    heroTitle: true,
    heroLead: true,
    heroCatalogButton: true,
    heroTelegramButton: true,
    heroPromo: true,
    heroTrust: true,
    heroImage: true,
    paymentStrip: true,
    stats: true,
    drops: false,
    advantages: true,
    homeCategories: true,
    pages: false,
    telegramBlock: true,
    workSteps: true,
    reviews: true,
    homeNews: true,
    partnerCta: true,
    contact: true,
    faq: true,
    finalCta: true,
    footer: true,
    shopHero: true,
    shopCategories: true,
    shopFilters: true,
    shopProducts: true,
    shopVipBanners: true,
    infoHero: true,
  },
  coupons: [
    { code: "DAMAGE10", discount: 10, active: true },
    { code: "DD2026", discount: 10, active: true },
  ],
  paymentStrip: [
    { icon: "₮", title: { ua: "USDT / CRYPTO", en: "USDT / CRYPTO", ru: "USDT / CRYPTO" }, text: { ua: "TRC20, ERC20, BTC, ETH", en: "TRC20, ERC20, BTC, ETH", ru: "TRC20, ERC20, BTC, ETH" } },
    { icon: "₴", title: { ua: "UAH / CARD", en: "UAH / CARD", ru: "UAH / CARD" }, text: { ua: "Переказ на карту", en: "Bank card transfer", ru: "Перевод на карту" } },
    { icon: "%", title: { ua: "Постійним клієнтам", en: "Regular clients", ru: "Постоянным клиентам" }, text: { ua: "накопичувальна знижка 5-10%", en: "loyalty discount 5-10%", ru: "накопительная скидка 5-10%" } },
  ],
  stats: [
    { value: "148", label: { ua: "позицій у каталозі", en: "catalog items", ru: "позиций в каталоге" } },
    { value: "24/7", label: { ua: "підтримка замовлень", en: "order support", ru: "поддержка заказов" } },
    { value: "5", label: { ua: "років досвіду", en: "years of experience", ru: "лет опыта" } },
    { value: "10%", label: { ua: "стартовий промокод", en: "starter promo code", ru: "стартовый промокод" } },
  ],
  advantages: [
    { icon: "↗", text: { ua: "Досвід роботи більше 5 років", en: "Over 5 years of experience", ru: "Опыт работы больше 5 лет" } },
    { icon: "♕", text: { ua: "Висока якість акаунтів", en: "High quality accounts", ru: "Высокое качество аккаунтов" } },
    { icon: "◌", text: { ua: "Індивідуальний підхід", en: "Personal approach", ru: "Индивидуальный подход" } },
    { icon: "ϟ", text: { ua: "Зручна передача даних", en: "Convenient data transfer", ru: "Удобная передача данных" } },
    { icon: "◇", text: { ua: "Повний доступ до акаунтів", en: "Full account access", ru: "Полный доступ к аккаунтам" } },
    { icon: "☏", text: { ua: "Підтримка 24/7", en: "24/7 support", ru: "Поддержка 24/7" } },
    { icon: "◷", text: { ua: "Гнучка політика повернення", en: "Flexible return policy", ru: "Гибкая политика возврата" } },
    { icon: "✓", text: { ua: "Всі вертикалі соціальних мереж", en: "All social media verticals", ru: "Все вертикали социальных сетей" } },
  ],
  workSteps: [
    { title: { ua: "Виберіть товар", en: "Choose item", ru: "Выберите товар" }, text: { ua: "Перегляньте каталог та оберіть потрібний товар", en: "Browse the catalog and choose what you need", ru: "Просмотрите каталог и выберите нужный товар" } },
    { title: { ua: "Оформіть замовлення", en: "Place order", ru: "Оформите заказ" }, text: { ua: "Заповніть форму з необхідними даними", en: "Fill in the request form", ru: "Заполните форму с необходимыми данными" } },
    { title: { ua: "Здійсніть оплату", en: "Pay", ru: "Оплатите" }, text: { ua: "Оплатіть замовлення зручним способом", en: "Pay with a convenient method", ru: "Оплатите удобным способом" } },
    { title: { ua: "Отримайте доступ", en: "Get access", ru: "Получите доступ" }, text: { ua: "Отримайте доступ після оплати", en: "Receive access after payment", ru: "Получите доступ после оплаты" } },
    { title: { ua: "Підтримка 10:00-22:00", en: "Support 10:00-22:00", ru: "Поддержка 10:00-22:00" }, text: { ua: "Команда завжди готова допомогти", en: "Our team is ready to help", ru: "Команда всегда готова помочь" } },
  ],
  reviews: [
    { name: "Maksym", text: { ua: "Швидко отримав доступ, усе працює як описано.", en: "Got access fast, everything works as described.", ru: "Быстро получил доступ, все работает как описано." } },
    { name: "Artem", text: { ua: "Зручно, що є кошик і можна зібрати кілька позицій.", en: "The cart makes it easy to collect several items.", ru: "Удобно, что есть корзина и можно собрать несколько позиций." } },
    { name: "Daria", text: { ua: "Підтримка допомогла підібрати акаунти під задачу.", en: "Support helped pick accounts for my task.", ru: "Поддержка помогла подобрать аккаунты под задачу." } },
  ],
  products: [
    { id: "starter-pack", name: { ua: "Social Starter Pack", en: "Social Starter Pack", ru: "Social Starter Pack" }, description: { ua: "Набір акаунтів для тесту контенту і перших запусків.", en: "A set of accounts for content tests and first launches.", ru: "Набор аккаунтов для теста контента и первых запусков." }, category: "bundle", categoryLabel: { ua: "Набір", en: "Bundle", ru: "Набор" }, badge: "DD", status: { ua: "Top", en: "Top", ru: "Top" }, price: 49, featured: true, drop: true },
    { id: "business-profile", name: { ua: "Business Profile", en: "Business Profile", ru: "Business Profile" }, description: { ua: "Профіль під рекламні задачі та прогрів кампаній.", en: "Profile for ad tasks and campaign warm-up.", ru: "Профиль под рекламные задачи и прогрев кампаний." }, category: "ads", categoryLabel: { ua: "Реклама", en: "Ads", ru: "Реклама" }, badge: "BP", status: { ua: "Ads", en: "Ads", ru: "Ads" }, price: 64, featured: false, drop: true },
    { id: "telegram-utility", name: { ua: "Telegram Utility", en: "Telegram Utility", ru: "Telegram Utility" }, description: { ua: "Робочий комплект під комунікацію і сервісні задачі.", en: "A working kit for communication and service tasks.", ru: "Рабочий комплект под коммуникацию и сервисные задачи." }, category: "social", categoryLabel: { ua: "Соцмережі", en: "Social", ru: "Соцсети" }, badge: "TG", status: { ua: "Fast", en: "Fast", ru: "Fast" }, price: 35, featured: false, drop: true },
    { id: "instagram-aged", name: { ua: "Instagram Aged", en: "Instagram Aged", ru: "Instagram Aged" }, description: { ua: "Вікові профілі під контент, тести і м'який прогрів.", en: "Aged profiles for content, tests and soft warm-up.", ru: "Возрастные профили под контент, тесты и мягкий прогрев." }, category: "social", categoryLabel: { ua: "Соцмережі", en: "Social", ru: "Соцсети" }, badge: "IG", status: { ua: "В наявності", en: "In stock", ru: "В наличии" }, price: 29, featured: false, drop: false },
    { id: "tiktok-creator", name: { ua: "TikTok Creator", en: "TikTok Creator", ru: "TikTok Creator" }, description: { ua: "Профілі для контентних гіпотез і швидких запусків.", en: "Profiles for content hypotheses and fast launches.", ru: "Профили для контентных гипотез и быстрых запусков." }, category: "social", categoryLabel: { ua: "Соцмережі", en: "Social", ru: "Соцсети" }, badge: "TT", status: { ua: "В наявності", en: "In stock", ru: "В наличии" }, price: 39, featured: false, drop: false },
    { id: "facebook-ads", name: { ua: "Facebook Ads Profile", en: "Facebook Ads Profile", ru: "Facebook Ads Profile" }, description: { ua: "Профіль під рекламні тести, кампанії і зв'язки.", en: "Profile for ad tests, campaigns and funnels.", ru: "Профиль под рекламные тесты, кампании и связки." }, category: "ads", categoryLabel: { ua: "Реклама", en: "Ads", ru: "Реклама" }, badge: "FB", status: { ua: "Hot", en: "Hot", ru: "Hot" }, price: 64, featured: false, drop: false },
    { id: "gmail-workspace", name: { ua: "Gmail Workspace", en: "Gmail Workspace", ru: "Gmail Workspace" }, description: { ua: "Поштові акаунти під реєстрацію і робочі процеси.", en: "Mail accounts for registration and workflows.", ru: "Почтовые аккаунты под регистрацию и рабочие процессы." }, category: "mail", categoryLabel: { ua: "Пошта", en: "Mail", ru: "Почта" }, badge: "GM", status: { ua: "В наявності", en: "In stock", ru: "В наличии" }, price: 18, featured: false, drop: false },
    { id: "damage-launch-kit", name: { ua: "Damage Launch Kit", en: "Damage Launch Kit", ru: "Damage Launch Kit" }, description: { ua: "Комплект соцмереж, пошти і рекламного профілю для старту.", en: "Social, mail and ad profile kit for launch.", ru: "Комплект соцсетей, почты и рекламного профиля для старта." }, category: "bundle", categoryLabel: { ua: "Набір", en: "Bundle", ru: "Набор" }, badge: "DD", status: { ua: "Bundle", en: "Bundle", ru: "Bundle" }, price: 119, featured: false, drop: false },
    { id: "business-manager", name: { ua: "Business Manager", en: "Business Manager", ru: "Business Manager" }, description: { ua: "Сетап для командних рекламних процесів і масштабування.", en: "Setup for team ad workflows and scaling.", ru: "Сетап для командных рекламных процессов и масштабирования." }, category: "ads", categoryLabel: { ua: "Реклама", en: "Ads", ru: "Реклама" }, badge: "BM", status: { ua: "Limited", en: "Limited", ru: "Limited" }, price: 92, featured: false, drop: false },
  ],
  categories: [
    { id: "meta", icon: "∞", title: { ua: "Meta / Facebook", en: "Meta / Facebook", ru: "Meta / Facebook" }, text: { ua: "Акаунти, BM та рекламні активи.", en: "Accounts, BM and ad assets.", ru: "Аккаунты, BM и рекламные активы." } },
    { id: "google", icon: "G", title: { ua: "Google", en: "Google", ru: "Google" }, text: { ua: "Google Ads, Gmail та workspace.", en: "Google Ads, Gmail and workspace.", ru: "Google Ads, Gmail и workspace." } },
    { id: "tiktok", icon: "♪", title: { ua: "TikTok", en: "TikTok", ru: "TikTok" }, text: { ua: "Акаунти TikTok та рекламні розхідники.", en: "TikTok accounts and ad supplies.", ru: "Аккаунты TikTok и рекламные расходники." } },
    { id: "telegram", icon: "✈", title: { ua: "Telegram", en: "Telegram", ru: "Telegram" }, text: { ua: "Telegram акаунти, канали та сервіси.", en: "Telegram accounts, channels and services.", ru: "Telegram аккаунты, каналы и сервисы." } },
    { id: "x-twitter", icon: "𝕏", title: { ua: "X / Twitter", en: "X / Twitter", ru: "X / Twitter" }, text: { ua: "X акаунти та traffic tools.", en: "X accounts and traffic tools.", ru: "X аккаунты и traffic tools." } },
    { id: "proxy", icon: "◎", title: { ua: "Проксі", en: "Proxies", ru: "Прокси" }, text: { ua: "Робоча інфраструктура під запуск.", en: "Infrastructure for launches.", ru: "Рабочая инфраструктура под запуск." } },
    { id: "tools", icon: "⚒", title: { ua: "Інструменти", en: "Tools", ru: "Инструменты" }, text: { ua: "Сервіси та digital-утиліти.", en: "Services and digital utilities.", ru: "Сервисы и digital-утилиты." } },
    { id: "other", icon: "☆", title: { ua: "Інше", en: "Other", ru: "Другое" }, text: { ua: "Позиції під нестандартні задачі.", en: "Items for custom tasks.", ru: "Позиции под нестандартные задачи." } },
  ],
  pages: [
    { number: "01", title: { ua: "Соцмережі", en: "Social media", ru: "Соцсети" }, text: { ua: "Instagram, TikTok, Telegram та інші площадки.", en: "Instagram, TikTok, Telegram and other platforms.", ru: "Instagram, TikTok, Telegram и другие площадки." }, href: "shop.html" },
    { number: "02", title: { ua: "Реклама", en: "Ads", ru: "Реклама" }, text: { ua: "Профілі, бізнес-менеджери і запускові сетапи.", en: "Profiles, business managers and launch setups.", ru: "Профили, бизнес-менеджеры и запусковые сетапы." }, href: "shop.html" },
    { number: "03", title: { ua: "Пошта і сервіси", en: "Mail and services", ru: "Почта и сервисы" }, text: { ua: "Поштові акаунти і інфраструктура під команди.", en: "Mail accounts and team infrastructure.", ru: "Почтовые аккаунты и инфраструктура под команды." }, href: "shop.html" },
    { number: "04", title: { ua: "Індивідуальний заказ", en: "Custom order", ru: "Индивидуальный заказ" }, text: { ua: "Форма для запиту позиції, якої немає у вітрині.", en: "Request a position that is not in the catalog.", ru: "Форма для запроса позиции, которой нет в витрине." }, href: "#contact" },
  ],
  faq: [
    { question: { ua: "Кошик вже працює?", en: "Does the cart work?", ru: "Корзина уже работает?" }, answer: { ua: "Так. Можна додавати товари, змінювати кількість і бачити суму.", en: "Yes. You can add items, change quantity and see the total.", ru: "Да. Можно добавлять товары, менять количество и видеть сумму." } },
    { question: { ua: "Можна редагувати ціни?", en: "Can I edit prices?", ru: "Можно редактировать цены?" }, answer: { ua: "Так, ціни, товари і тексти редагуються в адмінці.", en: "Yes, prices, products and texts are edited in the admin panel.", ru: "Да, цены, товары и тексты редактируются в админке." } },
    { question: { ua: "Є три мови?", en: "Are there three languages?", ru: "Есть три языка?" }, answer: { ua: "Так: UA, ENG і RU з перемикачем у шапці.", en: "Yes: UA, ENG and RU with a header switcher.", ru: "Да: UA, ENG и RU с переключателем в шапке." } },
  ],
  guides: [
    {
      id: "guide-media-buying",
      title: { ua: "Старт у media buying", en: "Media buying start", ru: "Старт в media buying" },
      excerpt: { ua: "Базові правила підготовки акаунтів, бюджетів і перших тестів.", en: "Basic rules for accounts, budgets and first tests.", ru: "Базовые правила подготовки аккаунтов, бюджетов и первых тестов." },
      body: { ua: "Починайте з маленьких тестів, фіксуйте джерело трафіку, креативи і результат.", en: "Start with small tests, track traffic source, creatives and result.", ru: "Начинайте с маленьких тестов, фиксируйте источник трафика, креативы и результат." },
      category: "arbitraj",
      size: "large",
      image: "",
    },
    {
      id: "guide-safety",
      title: { ua: "Безпека акаунтів", en: "Account safety", ru: "Безопасность аккаунтов" },
      excerpt: { ua: "Що перевірити перед запуском і передачею доступів.", en: "What to check before launch and access transfer.", ru: "Что проверить перед запуском и передачей доступов." },
      body: { ua: "Перевіряйте прив'язки, резервні контакти і порядок передачі даних.", en: "Check bindings, recovery contacts and transfer process.", ru: "Проверяйте привязки, резервные контакты и порядок передачи данных." },
      category: "marketing",
      size: "medium",
      image: "",
    },
    {
      id: "news-crypto-payments",
      title: { ua: "Криптооплати для команд", en: "Crypto payments for teams", ru: "Криптооплаты для команд" },
      excerpt: { ua: "USDT, BTC та швидкі перекази для закупівлі digital-розхідників.", en: "USDT, BTC and fast transfers for buying digital supplies.", ru: "USDT, BTC и быстрые переводы для закупки digital-расходников." },
      body: { ua: "Для стабільної роботи тримайте окремі гаманці під закупівлі, фіксуйте мережу переказу і зберігайте історію платежів.", en: "For stable work, keep separate wallets for purchases, track the transfer network and save payment history.", ru: "Для стабильной работы держите отдельные кошельки под закупки, фиксируйте сеть перевода и сохраняйте историю платежей." },
      category: "kripto",
      size: "medium",
      image: "",
    },
  ],
  events: [
    {
      id: "event-affiliate-conf",
      title: { ua: "Affiliate conf: весняний анонс", en: "Affiliate conf: spring announcement", ru: "Affiliate conf: весенний анонс" },
      date: "2026-07-20",
      location: { ua: "Київ / online", en: "Kyiv / online", ru: "Киев / online" },
      text: { ua: "Конференція про арбітраж, медіабаїнг і рекламну інфраструктуру.", en: "Conference about affiliate marketing, media buying and ad infrastructure.", ru: "Конференция про арбитраж, медиабаинг и рекламную инфраструктуру." },
      image: "",
    },
  ],
  partnersList: [
    {
      id: "partner-alpha",
      name: "Alpha Media",
      site: "https://example.com",
      siteLabel: "SITE",
      promo: "DAMAGE",
      text: { ua: "Партнер по медіабаїнгу та рекламним запускам.", en: "Media buying and ad launch partner.", ru: "Партнер по медиабаингу и рекламным запускам." },
      logo: "",
    },
  ],
};

ddFixDeep(DD_DEFAULT_DATA);

function ddClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ddCleanAdvantages(items) {
  return (items || []).filter((item) => {
    const text = `${ddText(item.text, "ua")} ${ddText(item.text, "ru")} ${ddText(item.text, "en")}`.toLowerCase();
    return !text.includes("створення акаунтів за запитом") &&
      !text.includes("создание аккаунтов по запросу") &&
      !text.includes("accounts by request");
  });
}

function ddNormalizeVisibility(value) {
  return { ...(DD_DEFAULT_DATA.visibility || {}), ...(value || {}) };
}

function ddNormalizeCoupons(value) {
  const coupons = Array.isArray(value) ? value : DD_DEFAULT_DATA.coupons;
  return coupons
    .map((coupon) => ({
      code: String(coupon.code || "").trim().toUpperCase(),
      discount: Math.max(0, Math.min(100, Number(coupon.discount || 0))),
      active: coupon.active !== false,
    }))
    .filter((coupon) => coupon.code);
}

function ddLoadStore() {
  try {
    const saved = localStorage.getItem(DD_STORAGE_KEY);
    if (!saved) {
      const defaultsOnly = ddClone(DD_DEFAULT_DATA);
      defaultsOnly.advantages = ddCleanAdvantages(defaultsOnly.advantages);
      defaultsOnly.visibility = ddNormalizeVisibility(defaultsOnly.visibility);
      defaultsOnly.coupons = ddNormalizeCoupons(defaultsOnly.coupons);
      return defaultsOnly;
    }
    const parsed = ddFixDeep(JSON.parse(saved));
    const defaults = ddClone(DD_DEFAULT_DATA);
    return {
      ...defaults,
      ...parsed,
      content: { ...defaults.content, ...(parsed.content || {}) },
      visibility: ddNormalizeVisibility(parsed.visibility),
      coupons: ddNormalizeCoupons(parsed.coupons || defaults.coupons),
      paymentStrip: parsed.paymentStrip || defaults.paymentStrip,
      stats: parsed.stats || defaults.stats,
      advantages: ddCleanAdvantages(parsed.advantages || defaults.advantages),
      workSteps: parsed.workSteps || defaults.workSteps,
      reviews: parsed.reviews || defaults.reviews,
    };
  } catch {
    const fallback = ddClone(DD_DEFAULT_DATA);
    fallback.advantages = ddCleanAdvantages(fallback.advantages);
    fallback.visibility = ddNormalizeVisibility(fallback.visibility);
    fallback.coupons = ddNormalizeCoupons(fallback.coupons);
    return fallback;
  }
}

function ddMergeStoreData(parsed = {}) {
  const fixed = ddFixDeep(parsed || {});
  const defaults = ddClone(DD_DEFAULT_DATA);
  return {
    ...defaults,
    ...fixed,
    content: { ...defaults.content, ...(fixed.content || {}) },
    visibility: ddNormalizeVisibility(fixed.visibility || defaults.visibility),
    coupons: ddNormalizeCoupons(fixed.coupons || defaults.coupons),
    paymentStrip: fixed.paymentStrip || defaults.paymentStrip,
    stats: fixed.stats || defaults.stats,
    advantages: ddCleanAdvantages(fixed.advantages || defaults.advantages),
    workSteps: fixed.workSteps || defaults.workSteps,
    reviews: fixed.reviews || defaults.reviews,
    categories: fixed.categories || defaults.categories,
    products: fixed.products || defaults.products,
    guides: fixed.guides || defaults.guides,
    events: fixed.events || defaults.events,
    partnersList: fixed.partnersList || defaults.partnersList,
    faq: fixed.faq || defaults.faq,
  };
}

async function ddLoadServerStore() {
  try {
    if (typeof window !== "undefined" && window.__DD_SERVER_DATA__) {
      const merged = ddMergeStoreData(window.__DD_SERVER_DATA__);
      localStorage.setItem(DD_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
    const response = await fetch("/api/site", { cache: "no-store" });
    if (!response.ok) throw new Error("Store request failed");
    const serverData = await response.json();
    const merged = ddMergeStoreData(serverData);
    localStorage.setItem(DD_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return ddLoadStore();
  }
}

function ddSaveStore(data) {
  localStorage.setItem(DD_STORAGE_KEY, JSON.stringify(data));
}

function ddLang() {
  const saved = localStorage.getItem(DD_LANG_KEY);
  return DD_LANGS.includes(saved) ? saved : "ua";
}

function ddSetLang(lang) {
  localStorage.setItem(DD_LANG_KEY, DD_LANGS.includes(lang) ? lang : "ua");
}

function ddText(value, lang = ddLang()) {
  if (value && typeof value === "object") return value[lang] || value.ua || value.en || value.ru || "";
  return value || "";
}

function ddMulti(value = "") {
  if (value && typeof value === "object") {
    return {
      ua: value.ua || value.en || value.ru || "",
      en: value.en || value.ua || value.ru || "",
      ru: value.ru || value.ua || value.en || "",
    };
  }
  return { ua: value, en: value, ru: value };
}
