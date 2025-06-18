// DOMContentLoadedは、HTMLの読み込みが完了したときに実行されます。
document.addEventListener('DOMContentLoaded', function() {
    // テスト用の投稿データ
    const testPosts = [
        {
            userIcon: "https://placehold.co/40x40/FF5733/FFFFFF?text=A",
            userName: "ユーザーA",
            title: "画像1枚",
            content: "これは画像1枚の投稿です。",
            images: [
                "https://placehold.co/600x320/87CEFA/000000?text=1"
            ]
        },
        {
            userIcon: "https://placehold.co/40x40/33A8FF/FFFFFF?text=B",
            userName: "ユーザーB",
            title: "画像2枚",
            content: "これは画像2枚の投稿です。",
            images: [
                "https://placehold.co/300x200/F08080/000000?text=1",
                "https://placehold.co/300x200/FFDAB9/000000?text=2"
            ]
        },
        {
            userIcon: "https://placehold.co/40x40/33FF57/FFFFFF?text=C",
            userName: "ユーザーC",
            title: "画像3枚",
            content: "これは画像3枚の投稿です。",
            images: [
                "https://placehold.co/300x200/8B4513/FFFFFF?text=1",
                "https://placehold.co/150x98/6A5ACD/FFFFFF?text=2",
                "https://placehold.co/150x98/F5DEB3/000000?text=3"
            ]
        },
        {
            userIcon: "https://placehold.co/40x40/FF33CC/FFFFFF?text=D",
            userName: "ユーザーD",
            title: "画像4枚",
            content: "これは画像4枚の投稿です。",
            images: [
                "https://placehold.co/150x98/8B0000/FFFFFF?text=1",
                "https://placehold.co/150x98/87CEFA/000000?text=2",
                "https://placehold.co/150x98/FFDAB9/000000?text=3",
                "https://placehold.co/150x98/F08080/000000?text=4"
            ]
        },
        {
            userIcon: "https://placehold.co/40x40/AAAAAA/FFFFFF?text=E",
            userName: "ユーザーE",
            title: "画像なし",
            content: "これは画像なしの投稿です。",
            images: []
        }
    ];

    // 投稿カードを生成して表示
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer) {
        postsContainer.innerHTML = testPosts.map(renderPost).join('');
    }

    // 投稿データを元にカードを作成し表示する関数
    function renderPosts() {
        postsList.innerHTML = ''; // 既存の投稿をクリア
        postsData.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.dataset.postId = post.id; // 投稿IDをデータ属性として保持

            postCard.innerHTML = `
                <div class="post-header">
                    <img src="${post.icon}" alt="ユーザーアイコン" class="post-user-icon">
                    <h2 class="post-title">${post.title}</h2>
                    <button class="menu-button">⋮</button>
                    <div class="menu-dropdown">
                        <ul>
                            <li><a href="" class="report-action" data-post-id="${post.id}">通報する</a></li>
                            <li><a href="#">シェア</a></li>
                        </ul>
                    </div>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-images">
                    ${post.images.map(img => `<img src="${img}" alt="投稿画像" class="post-image">`).join('')}
                </div>
                <div class="post-actions">
                    <button class="reaction-button good" data-reaction="good">
                        👍 <span class="like-count">${post.likes}</span>
                    </button>
                    <button class="reaction-button heart" data-reaction="heart">
                        ❤️ <span class="heart-count">${post.hearts}</span>
                    </button>
                </div>
            `;
            postsList.appendChild(postCard);
        });

        // 動的に追加された要素にイベントリスナーを設定
        attachEventListeners();
    }

    // イベントリスナーをアタッチする関数
    function attachEventListeners() {
        // メニューボタンの処理
        document.querySelectorAll('.menu-button').forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // クリックイベントの伝播を停止
                const dropdown = this.nextElementSibling; // 次の兄弟要素がドロップダウン
                // 他の開いているドロップダウンを閉じる
                document.querySelectorAll('.menu-dropdown.is-active').forEach(openDropdown => {
                    if (openDropdown !== dropdown) {
                        openDropdown.classList.remove('is-active');
                    }
                });
                dropdown.classList.toggle('is-active'); // ドロップダウンの表示/非表示を切り替え
            });
        });

        // ドロップダウン外をクリックしたら閉じる
        document.addEventListener('click', function(event) {
            document.querySelectorAll('.menu-dropdown.is-active').forEach(openDropdown => {
                if (!openDropdown.contains(event.target) && !openDropdown.previousElementSibling.contains(event.target)) {
                    openDropdown.classList.remove('is-active');
                }
            });
        });


        // 「通報する」アクションの処理
        document.querySelectorAll('.report-action').forEach(item => {
            item.addEventListener('click', function(event) {
                event.preventDefault(); // リンクのデフォルト動作を防ぐ
                const postId = this.dataset.postId;
                // report.htmlに遷移（投稿IDをクエリパラメータで渡す）
                window.location.href = `report.html?postId=${encodeURIComponent(postId)}`;
            });
        });

        // リアクションボタンの処理
        document.querySelectorAll('.reaction-button').forEach(button => {
            button.addEventListener('click', function() {
                const postCard = this.closest('.post-card');
                const postId = parseInt(postCard.dataset.postId);
                const reactionType = this.dataset.reaction; // 'good' または 'bad'

                // 該当する投稿データを取得
                const post = postsData.find(p => p.id === postId);
                if (!post) return;

                // 同じ投稿内のGood/Badボタンを全て取得
                const goodButton = postCard.querySelector('.reaction-button.good');
                const heartButton = postCard.querySelector('.reaction-button.heart');
                const likeCountSpan = postCard.querySelector('.like-count');
                const heartCountSpan = postCard.querySelector('.heart-count');

                if (reactionType === 'good') {
                    if (this.classList.contains('active')) {
                        // 既に「いいね」済みなら取り消し
                        post.likes--;
                        this.classList.remove('active');
                    } else {
                        // 「いいね」
                        post.likes++;
                        this.classList.add('active');
                        // もし「よくないね」済みなら取り消し
                        if (heartButton.classList.contains('active')) {
                            post.hearts--;
                            heartButton.classList.remove('active');
                        }
                    }
                } else if (reactionType === 'heart') {
                    if (this.classList.contains('active')) {
                        // 既に「よくないね」済みなら取り消し
                        post.hearts--;
                        this.classList.remove('active');
                    } else {
                        // 「よくないね」
                        post.hearts++;
                        this.classList.add('active');
                        // もし「いいね」済みなら取り消し
                        if (goodButton.classList.contains('active')) {
                            post.likes--;
                            goodButton.classList.remove('active');
                        }
                    }
                }

                // カウントを更新
                likeCountSpan.textContent = post.likes;
                heartCountSpan.textContent = post.hearts;

                // 実際のアプリケーションでは、ここでサーバーサイドにリアクションを送信
            });
        });
    }

    // ページ読み込み時に投稿をレンダリング
    renderPosts();


    // カスタムメッセージボックスを表示する関数 (signup.jsから流用)
    function displayMessage(message, type) {
        const messageBox = document.createElement('div');
        messageBox.classList.add('custom-message-box');
        if (type === 'success') {
            messageBox.classList.add('success');
        } else if (type === 'error') {
            messageBox.classList.add('error');
        } else if (type === 'info') { // 情報メッセージ用
            messageBox.classList.add('info');
        }
        messageBox.textContent = message;

        document.body.appendChild(messageBox);

        // メッセージボックスを数秒後に非表示にする
        setTimeout(() => {
            messageBox.remove();
        }, 3000); // 3秒後に消える
    }

    // カスタムメッセージボックスのスタイルを動的に追加 (signup.jsから流用)
    // このスタイルは一度だけ追加すれば良いので、重複しないように注意
    if (!document.head.querySelector('style#custom-message-style')) {
        const style = document.createElement('style');
        style.id = 'custom-message-style'; // 重複防止用のID
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
            .custom-message-box.info { /* 情報メッセージ用 */
                background-color: #007bff; /* 青色 */
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                10% { opacity: 1; transform: translateX(-50%) translateY(0); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }

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

    function updateReaction(post) {
        const postElement = document.querySelector(`#post-${post.id}`);
        postElement.querySelector('.islike-count').textContent = post.likes;
        postElement.querySelector('.isheart-count').textContent = post.hearts; // dislikes → hearts
    }
});
