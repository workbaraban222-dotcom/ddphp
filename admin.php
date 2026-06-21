<!doctype html>
<html lang="ru" class="dd-boot">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
        
    <style>html.dd-boot:not(.dd-ready) body{visibility:hidden!important}html{overflow-y:scroll;scrollbar-gutter:stable;overflow-x:hidden}</style><script>
      (function () {
        try {
          document.documentElement.classList.add('dd-boot');
          var theme = localStorage.getItem('doubleDamageThemeV2') === 'light' ? 'light' : 'dark';
          document.documentElement.dataset.theme = theme;
        } catch (e) {}
      })();
    </script><title>Админка | DOUBLE DAMAGE</title>
  <link rel="stylesheet" href="styles.css?v=101" />
  <link rel="stylesheet" href="admin.css?v=18" />
  <?php require_once __DIR__ . '/partials/bootstrap.php'; dd_bootstrap_script(); ?>
  </head>
  <body class="admin-body">
    <section class="admin-login" data-login-screen>
      <form class="admin-login-card" data-login-form>
        <span class="brand-mark">DD</span>
        <p class="eyebrow">Доступ в админку</p>
        <h1>DOUBLE DAMAGE</h1>
        <label>Логин<input name="login" autocomplete="username" /></label>
        <label>Пароль<input name="password" type="password" autocomplete="current-password" /></label>
        <p class="login-error" data-login-error></p>
        <button class="button primary" type="submit">Войти</button>
      </form>
    </section>

    <header class="site-header admin-header">
      <a class="brand" href="index.php">
        <span class="brand-mark">DD</span>
        <span>DOUBLE DAMAGE ADMIN</span>
      </a>
      <div class="header-tools">
        <button class="theme-toggle" type="button" data-admin-logout>Выйти</button>
        <a class="replace-pill" href="replace.php" data-replace-link>Заміна товару</a><button class="theme-toggle" type="button" data-theme-toggle>Light</button><button class="cart-button" type="button" data-reset>Сбросить</button>
        <a class="profile-pill" href="index.php"><span></span>На сайт</a>
      </div>
    </header>

    <main class="admin-shell">
      <section class="admin-hero">
        <p class="eyebrow">Панель управления</p>
        <h1>Редактор сайта</h1>
        <p>Здесь можно менять главную, разделы магазина, товары, цены, картинки, партнеров, события, новости, FAQ и остальные блоки.</p>
      </section>

      <nav class="admin-tabs" aria-label="Admin sections">
        <button class="active" type="button" data-admin-tab="home">Главная</button>
        <button type="button" data-admin-tab="visibility">Видимость</button>
        <button type="button" data-admin-tab="categories">Категории</button>
        <button type="button" data-admin-tab="products">Товары</button>
        <button type="button" data-admin-tab="guides">Новости</button>
        <button type="button" data-admin-tab="events">События</button>
        <button type="button" data-admin-tab="partners">Партнеры</button>
        <button type="button" data-admin-tab="replacement">Замена товара</button>
        <button type="button" data-admin-tab="faq">FAQ</button>
      </nav>

      <form class="admin-grid" data-admin-form>
        <section class="admin-panel" data-admin-section="home">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Главная</p><h2>Тексты и картинки</h2></div>
          </div>
          <div class="form-grid">
            <label>Название бренда<input name="brandName" /></label>
            <label>Текст в логотипе<input name="brandMark" maxlength="4" /></label>
            <label>Промокод<input name="promoCode" /></label>
            <label>Ссылка Telegram<input name="telegramUrl" placeholder="https://t.me/your_channel" /></label>
            <label class="wide">Картинка первого экрана<input type="file" accept="image/*" data-content-image="heroImage" /></label>
            <div class="image-preview wide" data-content-preview="heroImage"></div>
            <label class="wide">Логотип первого экрана для светлой темы<input type="file" accept="image/*" data-content-image="heroImageLight" /></label>
            <div class="image-preview wide" data-content-preview="heroImageLight"></div>
            <label class="wide">Логотип первого экрана для темной темы<input type="file" accept="image/*" data-content-image="heroImageDark" /></label>
            <div class="image-preview wide" data-content-preview="heroImageDark"></div>
            <label class="wide">Картинка Telegram-блока<input type="file" accept="image/*" data-content-image="telegramImage" /></label>
            <div class="image-preview wide" data-content-preview="telegramImage"></div>
            <label>Ссылка левого VIP-баннера<input name="shopVipLeftUrl" placeholder="https://..." /></label>
            <label>Ссылка правого VIP-баннера<input name="shopVipRightUrl" placeholder="https://..." /></label>
            <label class="wide">Левый VIP-баннер<input type="file" accept="image/*" data-content-image="shopVipLeftImage" /></label>
            <div class="image-preview wide" data-content-preview="shopVipLeftImage"></div>
            <label class="wide">Правый VIP-баннер<input type="file" accept="image/*" data-content-image="shopVipRightImage" /></label>
            <div class="image-preview wide" data-content-preview="shopVipRightImage"></div>
            <label>Маленькая подпись hero UA<input name="heroEyebrow" /></label>
            <label>Заголовок hero UA<input name="heroTitle" /></label>
            <label class="wide">Текст hero UA<textarea name="heroLead"></textarea></label>
            <label>Заголовок магазина UA<input name="shopPageTitle" /></label>
            <label class="wide">Текст магазина UA<textarea name="shopPageText"></textarea></label>
            <label>Заголовок новостей UA<input name="guidesPageTitle" /></label>
            <label class="wide">Текст новостей UA<textarea name="guidesPageText"></textarea></label>
            <label>Заголовок подій UA<input name="eventsPageTitle" /></label>
            <label class="wide">Текст подій UA<textarea name="eventsPageText"></textarea></label>
            <label>Заголовок партнеров UA<input name="partnersPageTitle" /></label>
            <label class="wide">Текст партнеров UA<textarea name="partnersPageText"></textarea></label>
            <label>Подпись блока партнерства UA<input name="partnerCtaEyebrow" /></label>
            <label>Заголовок блока партнерства UA<input name="partnerCtaTitle" /></label>
            <label class="wide">Текст блока партнерства UA<textarea name="partnerCtaText"></textarea></label>
            <label>Кнопка блока партнерства UA<input name="partnerCtaButton" /></label>
            <label>Подпись формы UA<input name="contactEyebrow" /></label>
            <label>Заголовок формы UA<input name="contactTitle" /></label>
            <label class="wide">Текст формы UA<textarea name="contactText"></textarea></label>
            <label>Подпись CTA UA<input name="finalEyebrow" /></label>
            <label>Заголовок CTA UA<input name="finalTitle" /></label>
            <label class="wide">Текст CTA UA<textarea name="finalText"></textarea></label>
          </div>

          <div class="admin-panel-head inner">
            <div><p class="eyebrow">Оплата</p><h2>Тонкий блок под первым экраном</h2></div>
            <button class="button ghost" type="button" data-add-payment>Добавить оплату</button>
          </div>
          <div class="admin-list compact-list" data-payment-editor></div>

          <div class="admin-panel-head inner">
            <div><p class="eyebrow">Промокоды</p><h2>Скидки для корзины</h2></div>
            <button class="button ghost" type="button" data-add-coupon>Добавить промокод</button>
          </div>
          <div class="admin-list compact-list" data-coupons-editor></div>

          <div class="admin-panel-head inner">
            <div><p class="eyebrow">Цифры</p><h2>Показатели магазина</h2></div>
            <button class="button ghost" type="button" data-add-stat>Добавить цифру</button>
          </div>
          <div class="admin-list compact-list" data-stats-editor></div>

          <div class="admin-panel-head inner">
            <div><p class="eyebrow">Преимущества</p><h2>Почему выбирают нас</h2></div>
            <button class="button ghost" type="button" data-add-advantage>Добавить преимущество</button>
          </div>
          <div class="admin-list compact-list" data-advantages-editor></div>

          <div class="admin-panel-head inner">
            <div><p class="eyebrow">Процесс</p><h2>Как мы работаем</h2></div>
            <button class="button ghost" type="button" data-add-work-step>Добавить шаг</button>
          </div>
          <div class="admin-list compact-list" data-worksteps-editor></div>

          <div class="admin-panel-head inner">
            <div><p class="eyebrow">Отзывы</p><h2>Социальное доверие</h2></div>
            <button class="button ghost" type="button" data-add-review>Добавить отзыв</button>
          </div>
          <div class="admin-list compact-list" data-reviews-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="visibility">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Видимость</p><h2>Что показывать на сайте</h2></div>
          </div>
          <p class="admin-note">Выключенный блок не удаляется, а просто пропадает с сайта. Его можно включить обратно в любой момент.</p>
          <div class="visibility-grid" data-visibility-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="categories">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Категории</p><h2>Google, FB, TikTok и другие</h2></div>
            <button class="button primary" type="button" data-add-category>Добавить категорию</button>
          </div>
          <p class="admin-note">Здесь только разделы магазина: уже существующие категории и новые, которые ты будешь добавлять. Они показываются на главной и в магазине, а товары потом привязываются к ним.</p>
          <div class="admin-list" data-categories-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="products">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Товары</p><h2>Позиции магазина и цены</h2></div>
            <button class="button primary" type="button" data-add-product>Добавить товар</button>
          </div>
          <p class="admin-note">Здесь только товары: все текущие позиции и новые товары, которые ты добавишь. Категория товара выбирается внутри карточки товара.</p>
          <div class="admin-list" data-products-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="guides">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Новости</p><h2>Статьи, тематики и обложки</h2></div>
            <button class="button primary" type="button" data-add-guide>Добавить новость</button>
          </div>
          <div class="admin-list" data-guides-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="events">
          <div class="admin-panel-head">
            <div><p class="eyebrow">События</p><h2>Конференции и анонсы</h2></div>
            <button class="button primary" type="button" data-add-event>Добавить событие</button>
          </div>
          <div class="admin-list" data-events-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="partners">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Партнеры</p><h2>Сайты, логотипы и промокоды</h2></div>
            <button class="button primary" type="button" data-add-partner>Добавить партнера</button>
          </div>
          <div class="admin-list" data-partners-editor></div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="replacement">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Замена товара</p><h2>Текст страницы замены</h2></div>
          </div>
          <p class="admin-note">Здесь редактируется отдельная страница “Замена товара” и кнопка онлайн-поддержки.</p>
          <div class="form-grid">
            <label>Заголовок страницы UA<input name="replacePageTitle" /></label>
            <label class="wide">Описание страницы UA<textarea name="replacePageText"></textarea></label>
            <label>Заголовок примера UA<input name="replaceExampleTitle" /></label>
            <label class="wide">Текст примера заявки UA<textarea name="replaceExampleText"></textarea></label>
            <label>Текст кнопки UA<input name="replaceButtonText" /></label>
            <label>Заголовок условий UA<input name="replaceTermsTitle" /></label>
            <label class="wide">Текст условий UA<textarea name="replaceTermsText"></textarea></label>
          </div>
        </section>

        <section class="admin-panel is-hidden" data-admin-section="faq">
          <div class="admin-panel-head">
            <div><p class="eyebrow">FAQ</p><h2>Частые вопросы</h2></div>
            <button class="button primary" type="button" data-add-faq>Добавить FAQ</button>
          </div>
          <div class="admin-list" data-faq-editor></div>
        </section>
      </form>
    </main>

    <div class="save-bar">
      <span data-save-status>Готово к редактированию</span>
      <div>
        <a class="button ghost" href="index.php">Посмотреть сайт</a>
        <button class="button primary" type="button" data-save>Сохранить изменения</button>
      </div>
    </div>

    <script src="store.js?v=11"></script>
  <script src="admin.js?v=29"></script>
  </body>
</html>












































