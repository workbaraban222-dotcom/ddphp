<!doctype html>
<html lang="uk" class="dd-boot">
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
    </script><title>DOUBLE DAMAGE | РџРѕРґС–С—</title>
  <link rel="stylesheet" href="styles.css?v=106" />
  <?php require_once __DIR__ . '/partials/bootstrap.php'; dd_bootstrap_script(); ?>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="index.php"><span class="brand-mark" data-brand-mark>DD</span><span data-brand-name>DOUBLE DAMAGE</span></a>
      <nav class="main-nav">
        <a href="index.php" data-i18n="home">Головна</a>
        <a href="shop.php" data-i18n="shop">Магазин</a>
        <a href="events.php" data-i18n="events">Події</a>
        <a href="guides.php" data-i18n="guides">Новини</a>
        <a href="partners.php" data-i18n="partners">Партнери</a>
      </nav>
      <div class="header-tools"><div class="lang-switch" data-lang-switch><button class="active" type="button" data-lang="ua">UA</button><button type="button" data-lang="en">ENG</button><button type="button" data-lang="ru">RU</button></div><a class="replace-pill" href="replace.php" data-replace-link>Заміна товару</a><button class="theme-toggle" type="button" data-theme-toggle>Light</button><button class="cart-button" type="button" data-cart-open><span data-i18n="cart">Кошик</span><strong data-cart-count>0</strong></button></div>
    </header>
    <main data-info-page="events"></main>
    <footer class="footer"><span data-footer-copy></span><div><a href="shop.php" data-i18n="shop">Магазин</a><a href="guides.php" data-i18n="guides">Новости</a><a href="partners.php" data-i18n="partners">Партнери</a></div></footer>
    <aside class="cart-panel" aria-hidden="true"><div class="cart-head"><div><p class="eyebrow" data-i18n="cart">РљРѕС€РёРє</p><h2 data-i18n="cartOrder">Р’Р°С€Рµ Р·Р°РјРѕРІР»РµРЅРЅСЏ</h2></div><button class="icon-button" type="button" data-cart-close>x</button></div><div class="cart-items" data-cart-items></div><div class="cart-total"><span data-i18n="total">Р Р°Р·РѕРј</span><strong data-cart-total>$0</strong></div></aside><div class="cart-backdrop" data-cart-close></div>
<script src="store.js?v=13"></script><script src="script.js?v=50"></script>
  </body>
</html>













































