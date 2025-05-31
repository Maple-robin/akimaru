// ProfileEdit.js
document.addEventListener('DOMContentLoaded', () => {
    // アイコン変更処理
    const userIconInput = document.getElementById('user-icon');
    const profileIconPreview = document.querySelector('.profile-icon-preview');
    const btnChangeIcon = document.querySelector('.btn-change-icon');

    if (userIconInput && profileIconPreview && btnChangeIcon) {
        // ボタンクリックでファイル選択をトリガー
        btnChangeIcon.addEventListener('click', () => {
            userIconInput.click();
        });

        userIconInput.addEventListener('change', (event) => {
            const file = event.target.files ? event.target.files.item(0) : null;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileIconPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 自己紹介文字数カウント
    const bioTextarea = document.getElementById('bio');
    const bioCurrentChar = document.getElementById('bio-current-char');
    const MAX_BIO_LENGTH = 200; // 自己紹介の最大文字数

    if (bioTextarea && bioCurrentChar) {
        function updateCharCount() {
            const currentLength = bioTextarea.value.length;
            bioCurrentChar.textContent = currentLength;

            if (currentLength > MAX_BIO_LENGTH) {
                bioCurrentChar.style.color = 'red';
                // 必要であれば、保存ボタンを無効にする処理などを追加
            } else {
                bioCurrentChar.style.color = '#888';
                // 無効にしたボタンを有効に戻す処理など
            }
        }

        bioTextarea.addEventListener('input', updateCharCount);
        // ページ読み込み時にも一度カウントを更新
        updateCharCount();
    }

    // 保存ボタンのクリックイベント (ここではダミー。実際はサーバーサイドに送信)
    const btnSaveProfile = document.querySelector('.btn-save-profile');
    if (btnSaveProfile) {
        btnSaveProfile.addEventListener('click', () => {
            alert('プロフィールを保存しました！ (この機能はまだ実装されていません)');
            // 実際の保存処理（Fetch APIなどを使ってサーバーへデータ送信）
            // 保存成功後、マイページトップへ遷移するなど
            // window.location.href = 'mypage.html';
        });
    }

    // キャンセルボタンのクリックイベント (HTMLでonclick="history.back()"を設定済み)
    // const btnCancelProfile = document.querySelector('.btn-cancel-profile');
    // if (btnCancelProfile) {
    //     btnCancelProfile.addEventListener('click', () => {
    //         history.back(); // 前のページに戻る
    //     });
    // }
});