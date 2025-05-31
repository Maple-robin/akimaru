// js/post.js

document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const cancelButton = document.querySelector('.cancel-btn');

    // 「キャンセル」ボタンがクリックされた時の処理
    if (cancelButton) {
        cancelButton.addEventListener('click', function () {
            // 確認ダイアログを表示
            const confirmCancel = confirm('入力中の内容は破棄されます。本当にキャンセルしますか？');
            if (confirmCancel) {
                // ユーザーがOKを選択した場合、前のページに戻る
                history.back();
            }
        });
    }

    // フォームが送信された時の処理（仮の動作）
    if (postForm) {
        postForm.addEventListener('submit', function (event) {
            event.preventDefault(); // フォームのデフォルト送信をキャンセル

            const title = document.getElementById('post-title').value.trim();
            const content = document.getElementById('post-content').value.trim();

            if (title === '' || content === '') {
                alert('タイトルと内容の両方を入力してください。');
                return;
            }

            // ここに、入力されたデータをサーバーに送信する処理を追加します。
            // 例: Fetch API や XMLHttpRequest を使用してデータをPOSTする。

            alert('投稿が完了しました！\nタイトル: ' + title + '\n内容: ' + content.substring(0, 50) + '...'); // 内容は一部のみ表示
            
            // 実際のサイトでは、投稿成功後に別のページにリダイレクトしたり、
            // フォームをクリアしたりする処理を行います。
            // 例: window.location.href = 'confirmation_page.html';
            postForm.reset(); // フォームをクリア
        });
    }
});