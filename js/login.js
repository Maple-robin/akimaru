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
    const hamburger = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    // ハンバーガーアイコンがクリックされた時の処理
    if (hamburger && spMenu) { // 要素が存在することを確認
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('is-active'); // ハンバーガーアイコンの形を切り替える
            spMenu.classList.toggle('is-active'); // メニュー本体の表示/非表示を切り替える

            // メニューが開いたときにbodyにスクロール禁止クラスを追加（オプション）
            // body.classList.toggle('no-scroll');
        });

        // メニュー項目をクリックしたらメニューを閉じる（オプション）
        // これにより、メニューを開いて項目を選択した後に自動的にメニューが閉じます。
        const spMenuItems = document.querySelectorAll('.sp-menu__list a');
        spMenuItems.forEach(item => {
            item.addEventListener('click', function () {
                hamburger.classList.remove('is-active'); // ハンバーガーアイコンを元の形に戻す
                spMenu.classList.remove('is-active'); // メニューを非表示にする
                // body.classList.remove('no-scroll'); // スクロール禁止を解除（オプション）
            });
        });
    }
});
