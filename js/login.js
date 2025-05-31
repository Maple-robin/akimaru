// DOMContentLoadedは、HTMLの読み込みが完了したときに実行されます。
document.addEventListener('DOMContentLoaded', function() {
    // ログインフォームの処理
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // フォームのデフォルト送信を防ぐ（ページ遷移をしないようにする）
            event.preventDefault();

            // 入力されたユーザー名とパスワードを取得
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // デモンストレーションとしてコンソールに表示
            console.log('Logging in with:', username, password);

            // 実際のアプリケーションでは、ここでサーバーサイドへの認証リクエストを行います。
            // 今回は仮のメッセージを表示します。
            alert('ログイン処理は実装されていません。\n(ユーザー名: ' + username + ', パスワード: ' + password + ')');
        });
    }

    // ハンバーガーメニューの要素を取得
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    // ハンバーガーメニューの開閉
    if (hamburgerMenu && spMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('is-active');
            spMenu.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll', spMenu.classList.contains('is-active'));
        });
    }

    // 複数カテゴリトグル対応
    const spCategoryToggles = document.querySelectorAll('.sp-menu__category-toggle');
    spCategoryToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('is-open');
            const subList = this.querySelector('.sp-menu__sub-list');
            if (subList) {
                subList.classList.toggle('is-open');
            }
        });
    });
});
