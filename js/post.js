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

    const imageInput = document.getElementById('post-images');
    const previewArea = document.getElementById('image-preview');
    const maxFiles = 4; // 最大4枚に変更

    if (imageInput && previewArea) {
        imageInput.addEventListener('change', function() {
            previewArea.innerHTML = '';
            const files = Array.from(this.files).slice(0, maxFiles);
            files.forEach(file => {
                if (!file.type.startsWith('image/')) return;
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previewArea.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
            if (this.files.length > maxFiles) {
                alert('画像は最大4枚まで選択できます。');
            }
        });
    }
});

function renderPost(post) {
  let imagesHtml = '';
  const imgs = post.images || [];
  if (imgs.length === 1) {
    imagesHtml = `<div class="post-images one"><img src="${imgs[0]}" alt=""></div>`;
  } else if (imgs.length === 2) {
    imagesHtml = `
      <div class="post-images two">
        <img src="${imgs[0]}" alt="">
        <img src="${imgs[1]}" alt="">
      </div>`;
  } else if (imgs.length === 3) {
    imagesHtml = `
      <div class="post-images three">
        <div><img src="${imgs[0]}" alt=""></div>
        <div>
          <img src="${imgs[1]}" alt="">
          <img src="${imgs[2]}" alt="">
        </div>
      </div>`;
  } else if (imgs.length === 4) {
    imagesHtml = `
      <div class="post-images four">
        <img src="${imgs[0]}" alt="">
        <img src="${imgs[1]}" alt="">
        <img src="${imgs[2]}" alt="">
        <img src="${imgs[3]}" alt="">
      </div>`;
  }
  return `
    <div class="post-card">
      <div class="post-header">
        <img src="${post.userIcon}" alt="${post.userName}" class="post-user-icon">
        <h3 class="post-title">${post.title}</h3>
      </div>
      <div class="post-content">${post.content}</div>
      ${imagesHtml}
      <div class="post-actions">
        <!-- いいね等のボタン -->
      </div>
    </div>
  `;
}