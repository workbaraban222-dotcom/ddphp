<!doctype html>
<html lang="ru" class="dd-boot">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
        
    <style>html.dd-boot:not(.dd-ready) body{visibility:hidden!important}html{overflow-y:scroll;scrollbar-gutter:stable both-edges;overflow-x:hidden}</style><script>
      (function () {
        try {
          document.documentElement.classList.add('dd-boot');
          var theme = localStorage.getItem('doubleDamageThemeV2') === 'light' ? 'light' : 'dark';
          document.documentElement.dataset.theme = theme;
        } catch (e) {}
      })();
    </script><title>DOUBLE DAMAGE | Digital marketplace</title>
    <meta
      name="description"
      content="DOUBLE DAMAGE - магазин digital-расходников, аккаунтов, профилей и готовых сетапов."
    />
  <link rel="stylesheet" href="styles.css?v=106" />
  <?php require_once __DIR__ . '/partials/bootstrap.php'; dd_bootstrap_script(); ?>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="DOUBLE DAMAGE">
        <span class="brand-mark" data-brand-mark>DD</span>
        <span data-brand-name>DOUBLE DAMAGE</span>
      </a>

      <nav class="main-nav">
        <a href="index.php" data-i18n="home">Головна</a>
        <a href="shop.php" data-i18n="shop">Магазин</a>
        <a href="events.php" data-i18n="events">Події</a>
        <a href="guides.php" data-i18n="guides">Новини</a>
        <a href="partners.php" data-i18n="partners">Партнери</a>
      </nav>

      <div class="header-tools">
        <div class="lang-switch" data-lang-switch><button class="active" type="button" data-lang="ua">UA</button><button type="button" data-lang="en">ENG</button><button type="button" data-lang="ru">RU</button></div>
        
        <a class="replace-pill" href="replace.php" data-replace-link>Заміна товару</a><button class="theme-toggle" type="button" data-theme-toggle>Light</button><button class="cart-button" type="button" data-cart-open><span data-i18n="cart">Кошик</span><strong data-cart-count>0</strong></button>
      </div>
    </header>

    <main id="top">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow" data-hero-eyebrow></p>
          <h1 data-hero-title></h1>
          <p class="lead" data-hero-lead></p>
          <div class="hero-actions">
            <a class="button primary" href="shop.php" data-hero-catalog>&#1057;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1082;&#1072;&#1090;&#1072;&#1083;&#1086;&#1075;</a>
            <a class="button ghost" data-telegram-link href="#" target="_blank" rel="noreferrer" data-hero-telegram>&#1053;&#1072;&#1087;&#1080;&#1089;&#1072;&#1090;&#1100; &#1074; Telegram</a>
          </div>
          <div class="promo">
            <span data-promo-label>&#1055;&#1088;&#1086;&#1084;&#1086;&#1082;&#1086;&#1076; &#1085;&#1072; &#1087;&#1077;&#1088;&#1074;&#1099;&#1081; &#1079;&#1072;&#1082;&#1072;&#1079;</span>
            <strong data-promo-code></strong>
          </div>
          <div class="hero-trust">
            <span>Guaranteed quality</span>
            <span>Instant delivery</span>
            <span>Anonymous & secure</span>
          </div>
        </div>

        <div class="hero-visual" aria-label="Р’РёС‚СЂРёРЅР° DOUBLE DAMAGE">
        </div>
      </section>

      <section class="payment-strip" aria-label="РЎРїРѕСЃРѕР±С‹ РѕРїР»Р°С‚С‹" data-payment-strip>
        <article>
          <span>в‚®</span>
          <strong>USDT / CRYPTO</strong>
          <small>TRC20, ERC20, BTC, ETH</small>
        </article>
        <article>
          <span>в‚ґ</span>
          <strong>UAH / CARD</strong>
          <small>РџРµСЂРµРІРѕРґ РЅР° РєР°СЂС‚Сѓ</small>
        </article>
        <article>
          <span>%</span>
          <strong>РџРѕСЃС‚РѕСЏРЅРЅС‹Рј РєР»РёРµРЅС‚Р°Рј</strong>
          <small>РЅР°РєРѕРїРёС‚РµР»СЊРЅР°СЏ СЃРєРёРґРєР° 5-10%</small>
        </article>
      </section>

      <section class="stats-strip" aria-label="РџРѕРєР°Р·Р°С‚РµР»Рё РјР°РіР°Р·РёРЅР°" data-stats></section>

      <section class="section catalog-section home-category-section" id="catalog">
        <div class="section-heading compact">
          <p class="eyebrow" data-i18n="catalog">РљР°С‚Р°Р»РѕРі</p>
          <h2 data-i18n="catalogTitle">Р РѕР·РґС–Р»Рё РјР°РіР°Р·РёРЅСѓ</h2>
        </div>

        <div class="shop-category-grid home-shop-categories" data-pages></div>
      </section>

      <section class="section is-hidden-home-block" id="drops">
        <div class="section-heading">
          <p class="eyebrow" data-i18n="drops">Р“Р°СЂСЏС‡С– РґСЂРѕРїРё</p>
          <h2>РЁРІРёРґРєС– РїСЂРѕРїРѕР·РёС†С–С—</h2>
        </div>
        <div class="drop-list" data-drops></div>
      </section>

      <section class="section advantages-section">
        <div class="section-heading compact">
          <p class="eyebrow">DOUBLE DAMAGE</p>
          <h2 data-i18n="advantages">РќР°С€С– РїРµСЂРµРІР°РіРё</h2>
        </div>
        <div class="advantage-grid" data-advantages></div>
      </section>

      <section class="section pages-section is-hidden-home-block" id="pages">
        <div class="section-heading">
          <p class="eyebrow">Supply categories</p>
          <h2>РљР°С‚РµРіРѕСЂРёРё СЂР°СЃС…РѕРґРЅРёРєРѕРІ</h2>
        </div>
        <div class="page-grid" data-pages></div>
      </section>

      <section class="telegram-section">
        <div class="telegram-art">
          <div class="graffiti-badge">DD</div>
        </div>
        <div class="telegram-copy">
          <p class="eyebrow">Telegram</p>
          <h2 data-i18n="telegramTitle">РќР°С€ Telegram РєР°РЅР°Р»</h2>
          <p data-i18n="telegramText">РџС–РґРїРёСЃСѓР№С‚РµСЃСЊ С‚Р° РѕС‚СЂРёРјСѓР№С‚Рµ РЅР°Р№РєРѕСЂРёСЃРЅС–С€Сѓ С–РЅС„РѕСЂРјР°С†С–СЋ</p>
          <div class="telegram-preview">
            <strong data-i18n="subscribe">РџС–РґРїРёСЃР°С‚РёСЃСЏ РЅР° РєР°РЅР°Р»</strong>
          </div>
          <a class="button blue-button" data-telegram-link target="_blank" rel="noreferrer" href="#">
            <span>в†—</span>
            <span data-i18n="subscribe">РџС–РґРїРёСЃР°С‚РёСЃСЏ РЅР° РєР°РЅР°Р»</span>
          </a>
        </div>
      </section>

      <section class="section work-section" id="how">
        <div class="section-heading center">
          <p class="eyebrow" data-i18n="howEyebrow">РџСЂРѕС†РµСЃ СЂРѕР±РѕС‚Рё</p>
          <h2 data-i18n="howTitle">РЇРє РјРё РїСЂР°С†СЋС”РјРѕ?</h2>
          <p data-i18n="howText">РџСЂРѕСЃС‚РёР№ РїСЂРѕС†РµСЃ РІС–Рґ РІРёР±РѕСЂСѓ РґРѕ РѕС‚СЂРёРјР°РЅРЅСЏ</p>
        </div>
        <div class="work-steps" data-work-steps></div>
      </section>

      <section class="section reviews-section" id="reviews">
        <div class="section-heading compact">
          <p class="eyebrow">Social proof</p>
          <h2 data-i18n="reviews">Р’С–РґРіСѓРєРё</h2>
        </div>
        <div class="review-grid" data-reviews></div>
      </section>

      <section class="section home-news-section">
        <div class="section-heading compact">
          <p class="eyebrow" data-i18n="guides">Новости</p>
          <h2>Последние материалы</h2>
        </div>
        <div class="content-grid guides-grid" data-home-news></div>
      </section>

      <section class="partner-cta" data-partner-cta></section>

      <section class="split-section" id="contact">
        <div>
          <p class="eyebrow" data-contact-eyebrow></p>
          <h2 data-contact-title></h2>
          <p data-contact-text></p>
        </div>
        <form class="contact-form">
          <label>
            Имя
            <input type="text" name="name" placeholder="Ваше имя" />
          </label>
          <label>
            Контакт
            <input type="text" name="contact" placeholder="Telegram или email" />
          </label>
          <label>
            Запрос
            <textarea name="message" placeholder="Какие аккаунты или сетап нужны"></textarea>
          </label>
          <button class="button primary" type="submit">Отправить запрос</button>
        </form>
      </section>

      <section class="section faq" id="faq">
        <div class="section-heading compact">
          <p class="eyebrow">FAQ</p>
          <h2 data-i18n="faq">Р§Р°СЃС‚С– РїРёС‚Р°РЅРЅСЏ</h2>
        </div>
        <div data-faq></div>
      </section>

      <section class="final-cta">
        <div>
          <p class="eyebrow" data-final-eyebrow>Traffic supply</p>
          <h2 data-final-title>РќРЈР–РќР« Р РђРЎРҐРћР”РќРРљР РџРћР” РўР РђР¤РРљ?</h2>
          <p data-final-text>
            РћС‚РєСЂРѕР№ РєР°С‚Р°Р»РѕРі РёР»Рё РЅР°РїРёС€Рё РЅР°Рј РІ Telegram - РїРѕРґР±РµСЂРµРј РЅСѓР¶РЅС‹Рµ РїРѕР·РёС†РёРё
            РїРѕРґ С‚РІРѕСЋ Р·Р°РґР°С‡Сѓ.
          </p>
        </div>
        <div class="hero-actions">
          <a class="button primary" href="shop.php" data-hero-catalog>&#1057;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1082;&#1072;&#1090;&#1072;&#1083;&#1086;&#1075;</a>
          <a class="button ghost" data-telegram-link href="#" target="_blank" rel="noreferrer" data-hero-telegram>&#1053;&#1072;&#1087;&#1080;&#1089;&#1072;&#1090;&#1100; &#1074; Telegram</a>
        </div>
      </section>
    </main>

    <aside class="cart-panel" aria-label="РљРѕСЂР·РёРЅР°" aria-hidden="true">
      <div class="cart-head">
        <div>
          <p class="eyebrow">РљРѕСЂР·РёРЅР°</p>
          <h2 data-i18n="cartOrder">Р’Р°С€Рµ Р·Р°РјРѕРІР»РµРЅРЅСЏ</h2>
        </div>
        <button class="icon-button" type="button" data-cart-close aria-label="Р—Р°РєСЂС‹С‚СЊ РєРѕСЂР·РёРЅСѓ">x</button>
      </div>
      <div class="cart-items" data-cart-items>
        <p class="empty-cart">РџРѕРєР° РїСѓСЃС‚Рѕ. Р”РѕР±Р°РІСЊС‚Рµ РїРѕР·РёС†РёСЋ РёР· РєР°С‚Р°Р»РѕРіР°.</p>
      </div>
      <div class="cart-total">
        <span data-i18n="total">Р Р°Р·РѕРј</span>
        <strong data-cart-total>$0</strong>
      </div>
      <a class="button primary checkout-button" href="#contact" data-cart-close data-i18n="checkout">РћС„РѕСЂРјРёС‚Рё Р·Р°РїРёС‚</a>
    </aside>
    <div class="cart-backdrop" data-cart-close></div>

    <footer class="footer">
      <span data-footer-copy></span>
      <div>
        <a href="shop.php" data-i18n="shop">РњР°РіР°Р·РёРЅ</a>
        <a href="guides.php" data-i18n="guides">Новости</a>
        <a href="partners.php" data-i18n="partners">РџР°СЂС‚РЅРµСЂРё</a>
      </div>
    </footer>

    <script src="store.js?v=13"></script>
    <script src="script.js?v=50"></script>
  </body>
</html>













































