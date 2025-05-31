// DOMContentLoadedは、HTMLの読み込みが完了したときに実行されます。
document.addEventListener('DOMContentLoaded', function() {
    // 新規登録フォームの処理
    const signupForm = document.querySelector('.signup-form');
    const ageErrorMessage = document.getElementById('age-error');
    const passwordMatchErrorMessage = document.getElementById('password-match-error');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            // フォームのデフォルト送信を防ぐ（ページ遷移をしないようにする）
            event.preventDefault();

            // エラーメッセージをリセット
            ageErrorMessage.textContent = '';
            passwordMatchErrorMessage.textContent = '';

            // 入力値の取得
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const dob = document.getElementById('dob').value; // YYYY-MM-DD形式

            let isValid = true; // バリデーションの状態を追跡

            // 1. パスワードの一致確認
            if (password !== confirmPassword) {
                passwordMatchErrorMessage.textContent = 'パスワードが一致しません。';
                isValid = false;
            }

            // 2. 生年月日（年齢）の確認
            if (dob) {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--; // 誕生日がまだ来ていない場合
                }

                if (age < 20) {
                    ageErrorMessage.textContent = '20歳未満の方は登録できません。';
                    isValid = false;
                }
            } else {
                ageErrorMessage.textContent = '生年月日を入力してください。';
                isValid = false;
            }

            // 全てのバリデーションが成功した場合
            if (isValid) {
                // 実際のアプリケーションでは、ここでサーバーサイドへの登録リクエストを行います。
                // 今回は仮の成功メッセージを表示します。
                // alert() の代わりにカスタムメッセージボックスを使用
                displayMessage('登録が完了しました！', 'success');
                console.log('新規登録情報:', { username, email, dob });
                // フォームをクリアすることも可能
                // signupForm.reset();
            } else {
                displayMessage('入力内容にエラーがあります。ご確認ください。', 'error');
            }
        });
    }

    // カスタムメッセージボックスを表示する関数
    function displayMessage(message, type) {
        const messageBox = document.createElement('div');
        messageBox.classList.add('custom-message-box');
        if (type === 'success') {
            messageBox.classList.add('success');
        } else if (type === 'error') {
            messageBox.classList.add('error');
        }
        messageBox.textContent = message;

        document.body.appendChild(messageBox);

        // メッセージボックスを数秒後に非表示にする
        setTimeout(() => {
            messageBox.remove();
        }, 3000); // 3秒後に消える
    }

    // カスタムメッセージボックスのスタイルを動的に追加
    const style = document.createElement('style');
    style.textContent = `
        .custom-message-box {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 1.6rem;
            color: #fff;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            opacity: 0;
            animation: fadeInOut 3s forwards;
        }
        .custom-message-box.success {
            background-color: #28a745; /* 緑色 */
        }
        .custom-message-box.error {
            background-color: #dc3545; /* 赤色 */
        }
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            10% { opacity: 1; transform: translateX(-50%) translateY(0); }
            90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);


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
