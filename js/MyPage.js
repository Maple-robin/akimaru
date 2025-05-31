// DOMContentLoadedは、HTMLの読み込みが完了したときに実行されます。
document.addEventListener('DOMContentLoaded', function() {
    // ダミーのユーザーデータ
    const userData = {
        icon: 'https://placehold.co/100x100/FFD700/000000?text=USER',
        username: 'サンプル太郎',
        birthday: '1990年1月1日',
        bio: 'お酒と美味しい料理をこよなく愛するサンプル太郎です。特に日本酒の奥深さに魅了されており、週末は新しい銘柄を探しに出かけるのが趣味です。皆さんお酒に関する情報交換ができたら嬉しいです！',
    };

    // ダミーの投稿データ (posts.jsから流用し、マイページ用に調整)
    const allPostsData = [
        {
            id: 1,
            icon: 'https://placehold.co/40x40/FF5733/FFFFFF?text=A',
            title: '新商品のワインレビュー',
            content: '先日発売されたばかりの限定ワインを試しました！フルーティーで口当たりが良く、デザートにも合う素晴らしい一本でした。おすすめ度：★★★★★\n#ワイン #限定品 #レビュー',
            likes: 15,
            dislikes: 2,
            isMyPost: true, // 自分の投稿
            isLiked: false, // いいねしていない
        },
        {
            id: 2,
            icon: 'https://placehold.co/40x40/33A8FF/FFFFFF?text=B',
            title: '週末のテイスティングイベント',
            content: '今週末、〇〇酒造で開催されるテイスティングイベントに参加します！新しい日本酒に出会えるのが楽しみです。皆さんのおすすめ銘柄はありますか？\n#日本酒 #イベント #テイスティング',
            likes: 8,
            dislikes: 0,
            isMyPost: false, // 自分の投稿ではない
            isLiked: true, // いいねしている
        },
        {
            id: 3,
            icon: 'https://placehold.co/40x40/33FF57/FFFFFF?text=C',
            title: '自宅でカクテル作り',
            content: '最近ジンにはまっていて、自宅で色々なカクテルを作るのに挑戦中です。おすすめのジンベースカクテルレシピがあれば教えてください！マティーニとジントニック以外で！\n#カクテル #ジン #おうち時間',
            likes: 22,
            dislikes: 5,
            isMyPost: true, // 自分の投稿
            isLiked: false,
        },
        {
            id: 4,
            icon: 'https://placehold.co/40x40/FF33CC/FFFFFF?text=D',
            title: 'ウィスキーの熟成について',
            content: '長期熟成ウィスキーの奥深さに感動しています。樽の種類や熟成期間によってこんなにも味が変わるなんて驚きです。特に〇〇の熟成ウィスキーが最高でした。皆さんの好きな熟成ウィスキーは？\n#ウィスキー #熟成 #酒好き',
            likes: 10,
            dislikes: 1,
            isMyPost: false,
            isLiked: true, // いいねしている
        },
        {
            id: 5,
            icon: 'https://placehold.co/40x40/5733FF/FFFFFF?text=E',
            title: '日本酒と和食のマリアージュ',
            content: '伊勢の地酒と和食の組み合わせは最高ですね！特に〇〇の純米吟醸と旬の魚料理が絶妙でした。皆さんのマリアージュ体験も教えてください！\n#日本酒 #和食 #マリアージュ',
            likes: 7,
            dislikes: 0,
            isMyPost: true, // 自分の投稿
            isLiked: false,
        },
    ];

    // プロフィール情報を表示
    document.querySelector('.profile-icon').src = userData.icon;
    document.querySelector('.profile-username').textContent = `ユーザー名：${userData.username}`;
    document.querySelector('.profile-birthday').textContent = `誕生日：${userData.birthday}`;
    document.querySelector('.profile-bio').textContent = userData.bio;

    // プロフィール編集ボタンの処理 (仮)
    const editProfileButton = document.querySelector('.edit-profile-button');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            displayMessage('プロフィール編集機能は未実装です。', 'info');
        });
    }

    // タブ切り替えの処理
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 全てのタブボタンからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // クリックされたボタンにactiveクラスを追加
            this.classList.add('active');

            // 全てのタブコンテンツを非表示
            tabContents.forEach(content => content.classList.remove('active'));

            // 対応するタブコンテンツを表示
            const targetTabId = this.dataset.tab;
            const targetContent = document.getElementById(targetTabId + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
                // タブが切り替わったら投稿を再レンダリング
                if (targetTabId === 'my-posts') {
                    renderPosts('my-posts');
                } else if (targetTabId === 'liked-posts') {
                    renderPosts('liked-posts');
                }
            }
        });
    });

    // 投稿データを元にカードを作成し表示する関数
    function renderPosts(tabType) {
        const targetList = document.querySelector(`#${tabType}-content .posts-list`);
        if (!targetList) return;

        targetList.innerHTML = ''; // 既存の投稿をクリア

        let postsToRender = [];
        if (tabType === 'my-posts') {
            postsToRender = allPostsData.filter(post => post.isMyPost);
        } else if (tabType === 'liked-posts') {
            postsToRender = allPostsData.filter(post => post.isLiked);
        }

        if (postsToRender.length === 0) {
            targetList.innerHTML = `<p style="text-align: center; color: #777; margin-top: 30px;">まだ投稿がありません。</p>`;
            return;
        }

        postsToRender.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.dataset.postId = post.id;

            postCard.innerHTML = `
                <div class="post-header">
                    <img src="${post.icon}" alt="ユーザーアイコン" class="post-user-icon">
                    <h2 class="post-title">${post.title}</h2>
                    <button class="menu-button">⋮</button>
                    <div class="menu-dropdown">
                        <ul>
                            <li><a href="#" class="report-action" data-post-id="${post.id}">通報する</a></li>
                            <li><a href="#">シェア</a></li>
                            </ul>
                    </div>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-actions">
                    <button class="reaction-button good ${post.isLiked ? 'active' : ''}" data-reaction="good">
                        👍 <span class="like-count">${post.likes}</span>
                    </button>
                    <button class="reaction-button bad" data-reaction="bad">
                        👎 <span class="dislike-count">${post.dislikes}</span>
                    </button>
                </div>
            `;
            targetList.appendChild(postCard);
        });

        // 動的に追加された要素にイベントリスナーを設定
        attachEventListeners();
    }

    // イベントリスナーをアタッチする関数 (posts.jsから流用)
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
                displayMessage(`投稿ID: ${postId} を通報しました。`, 'info');
                // 実際のアプリケーションでは、ここでサーバーサイドに通報リクエストを送信
                // ドロップダウンを閉じる
                this.closest('.menu-dropdown').classList.remove('is-active');
            });
        });

        // リアクションボタンの処理
        document.querySelectorAll('.reaction-button').forEach(button => {
            button.addEventListener('click', function() {
                const postCard = this.closest('.post-card');
                const postId = parseInt(postCard.dataset.postId);
                const reactionType = this.dataset.reaction; // 'good' または 'bad'

                // 該当する投稿データを取得
                const post = allPostsData.find(p => p.id === postId);
                if (!post) return;

                // 同じ投稿内のGood/Badボタンを全て取得
                const goodButton = postCard.querySelector('.reaction-button.good');
                const badButton = postCard.querySelector('.reaction-button.bad');
                const likeCountSpan = postCard.querySelector('.like-count');
                const dislikeCountSpan = postCard.querySelector('.dislike-count');

                if (reactionType === 'good') {
                    if (this.classList.contains('active')) {
                        // 既に「いいね」済みなら取り消し
                        post.likes--;
                        this.classList.remove('active');
                        post.isLiked = false; // いいね状態を更新
                    } else {
                        // 「いいね」
                        post.likes++;
                        this.classList.add('active');
                        post.isLiked = true; // いいね状態を更新
                        // もし「よくないね」済みなら取り消し
                        if (badButton.classList.contains('active')) {
                            post.dislikes--;
                            badButton.classList.remove('active');
                        }
                    }
                } else if (reactionType === 'bad') {
                    if (this.classList.contains('active')) {
                        // 既に「よくないね」済みなら取り消し
                        post.dislikes--;
                        this.classList.remove('active');
                    } else {
                        // 「よくないね」
                        post.dislikes++;
                        this.classList.add('active');
                        // もし「いいね」済みなら取り消し
                        if (goodButton.classList.contains('active')) {
                            post.likes--;
                            goodButton.classList.remove('active');
                            post.isLiked = false; // いいね状態を更新
                        }
                    }
                }

                // カウントを更新
                likeCountSpan.textContent = post.likes;
                dislikeCountSpan.textContent = post.dislikes;

                // 実際のアプリケーションでは、ここでサーバーサイドにリアクションを送信
            });
        });
    }

    // ページ読み込み時に「自分の投稿」タブをデフォルトで表示
    renderPosts('my-posts');


    // カスタムメッセージボックスを表示する関数 (signup.js/posts.jsから流用)
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

    // カスタムメッセージボックスのスタイルを動的に追加 (signup.js/posts.jsから流用)
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


    // ハンバーガーメニューの要素を取得
    const hamburger = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    // ハンバーガーアイコンがクリックされた時の処理
    if (hamburger && spMenu) { // 要素が存在することを確認
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('is-active'); // ハンバーガーアイコンの形を切り替える
            spMenu.classList.toggle('is-active'); // メニュー本体の表示/非表示を切り替える

            // メニューが開いたときにbodyにスクロール禁止クラスを追加（オプション）
            // document.body.classList.toggle('no-scroll');
        });

        // メニュー項目をクリックしたらメニューを閉じる（オプション）
        const spMenuItems = document.querySelectorAll('.sp-menu__list a');
        spMenuItems.forEach(item => {
            item.addEventListener('click', function () {
                hamburger.classList.remove('is-active'); // ハンバーガーアイコンを元の形に戻す
                spMenu.classList.remove('is-active'); // メニューを非表示にする
                // document.body.classList.remove('no-scroll'); // スクロール禁止を解除（オプション）
            });
        });
    }
});
