document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');
    // const spMenuCloseButton = document.querySelector('.sp-menu__close-button'); // 削除
    const spCategoryToggle = document.querySelector('.sp-menu__category-toggle');
    const spSubList = document.querySelector('.sp-menu__sub-list');

    // ハンバーガーメニューの開閉
    if (hamburgerMenu && spMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('is-active');
            spMenu.classList.toggle('is-active');
            // メニューが開いたらbodyにoverflow: hidden;を適用してスクロールを止める
            document.body.classList.toggle('no-scroll', spMenu.classList.contains('is-active'));
        });

        // 閉じるボタンのクリックイベント (削除)
        // if (spMenuCloseButton) { // 条件分岐も不要
        //     spMenuCloseButton.addEventListener('click', function() {
        //         hamburgerMenu.classList.remove('is-active');
        //         spMenu.classList.remove('is-active');
        //         document.body.classList.remove('no-scroll');
        //     });
        // }
    }

    // 商品カテゴリのサブメニュー開閉
    if (spCategoryToggle && spSubList) {
        spCategoryToggle.addEventListener('click', function() {
            spCategoryToggle.classList.toggle('is-open');
            spSubList.classList.toggle('is-open');
        });
    }

    // タブ切り替え機能 (既存のまま)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;

            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            document.getElementById(`${tab}-content`).classList.add('active');
            button.classList.add('active');
        });
    });

    // 初期表示で「自分の投稿」タブをアクティブにする (既存のまま)
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    // 動的に投稿カードを生成する関数 (既存のまま)
    function generatePostCard(post) {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.dataset.id = post.id; // 投稿IDを設定

        // ユーザーアイコンのURLを動的に生成
        const userIconUrl = post.is_mine ?
            'https://placehold.co/48x48/FFD700/000000?text=YOU' :
            'https://placehold.co/48x48/CCCCCC/000000?text=USER';

        postCard.innerHTML = `
            <div class="post-header">
                <img src="${userIconUrl}" alt="ユーザーアイコン" class="post-user-icon">
                <h3 class="post-title">${post.title}</h3>
                <button class="menu-button"><i class="fas fa-ellipsis-h"></i></button>
                <div class="menu-dropdown">
                    <ul>
                        <li><a href="#" class="edit-post-button" data-id="${post.id}">編集</a></li>
                        <li><a href="#" class="delete-post-button" data-id="${post.id}">削除</a></li>
                    </ul>
                </div>
            </div>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="reaction-button good ${post.liked ? 'active' : ''}" data-type="good">
                    <i class="fas fa-thumbs-up"></i> <span>${post.goods}</span>
                </button>
                <button class="reaction-button bad ${post.baddened ? 'active' : ''}" data-type="bad">
                    <i class="fas fa-thumbs-down"></i> <span>${post.bads}</span>
                </button>
            </div>
        `;

        // ドロップダウンメニューの開閉
        const menuButton = postCard.querySelector('.menu-button');
        const menuDropdown = postCard.querySelector('.menu-dropdown');
        if (menuButton && menuDropdown) {
            menuButton.addEventListener('click', (event) => {
                event.stopPropagation(); // イベントの伝播を停止
                // 他の開いているドロップダウンを閉じる
                document.querySelectorAll('.menu-dropdown.is-active').forEach(openDropdown => {
                    if (openDropdown !== menuDropdown) {
                        openDropdown.classList.remove('is-active');
                    }
                });
                menuDropdown.classList.toggle('is-active');
            });
        }

        // いいね/よくないねボタンのイベントリスナー
        const reactionButtons = postCard.querySelectorAll('.reaction-button');
        reactionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const type = this.dataset.type;
                const postId = post.id;
                let countSpan = this.querySelector('span');
                let currentCount = parseInt(countSpan.textContent);

                // アクティブ状態の切り替え
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    currentCount--;
                    if (type === 'good') post.liked = false;
                    else post.baddened = false;
                } else {
                    this.classList.add('active');
                    currentCount++;
                    if (type === 'good') post.liked = true;
                    else post.baddened = true;

                    // もう一方のボタンがアクティブなら解除
                    const otherButton = postCard.querySelector(`.reaction-button:not([data-type="${type}"])`);
                    if (otherButton && otherButton.classList.contains('active')) {
                        let otherCountSpan = otherButton.querySelector('span');
                        let otherCurrentCount = parseInt(otherCountSpan.textContent);
                        otherButton.classList.remove('active');
                        otherCountSpan.textContent = otherCurrentCount - 1;
                        if (type === 'good') post.baddened = false;
                        else post.liked = false;
                    }
                }
                countSpan.textContent = currentCount;
            });
        });

        // 編集・削除ボタンのイベントリスナー（今回はアラートのみ）
        const editButton = postCard.querySelector('.edit-post-button');
        const deleteButton = postCard.querySelector('.delete-post-button');

        if (editButton) {
            editButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                alert(`投稿ID: ${post.id} を編集します。`);
                menuDropdown.classList.remove('is-active'); // ドロップダウンを閉じる
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (confirm(`投稿ID: ${post.id} を本当に削除しますか？`)) {
                    postCard.remove(); // 投稿をDOMから削除
                    alert(`投稿ID: ${post.id} を削除しました。`);
                }
                menuDropdown.classList.remove('is-active'); // ドロップダウンを閉じる
            });
        }

        return postCard;
    }

    // 投稿データを取得し表示する関数 (既存のまま)
    function loadPosts() {
        // サンプルデータ
        const myPosts = [
            { id: 1, title: '今日の晩酌🍶', content: '新しく手に入れた日本酒「〇〇」を開栓！フルーティーで飲みやすかったです。肴はアジのたたきで完璧でした！', goods: 15, bads: 2, is_mine: true, liked: false, baddened: false },
            { id: 2, title: 'おすすめクラフトビール🍺', content: '最近ハマっているのは「△△ブルワリー」のIPA。ホップの香りが最高で、苦味もちょうど良いんです。', goods: 8, bads: 0, is_mine: true, liked: false, baddened: false },
            { id: 3, title: '初心者向けカクテル🍹', content: '自宅で簡単に作れるカクテル「ジントニック」をご紹介。シンプルだけど奥深い味わいです！', goods: 20, bads: 1, is_mine: true, liked: false, baddened: false }
        ];

        const likedPosts = [
            { id: 4, title: '週末はウイスキーで🥃', content: '普段飲まない方も、ストレートで一口試してみてほしい「響」。香りが格別です。', goods: 30, bads: 5, is_mine: false, liked: true, baddened: false },
            { id: 5, title: '夏にぴったりのハイボール', content: 'レモンとミントをたっぷり入れたハイボールが最高。暑い日にゴクゴクいけますね！', goods: 25, bads: 3, is_mine: false, liked: true, baddened: false }
        ];

        const myPostsContainer = document.querySelector('#my-posts-content .posts-list');
        const likedPostsContainer = document.querySelector('#liked-posts-content .posts-list');

        myPostsContainer.innerHTML = '';
        likedPostsContainer.innerHTML = '';

        myPosts.forEach(post => {
            myPostsContainer.appendChild(generatePostCard(post));
        });

        likedPosts.forEach(post => {
            likedPostsContainer.appendChild(generatePostCard(post));
        });
    }

    loadPosts(); // ページ読み込み時に投稿をロード

    // どこかクリックでドロップダウンを閉じる (既存のまま)
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.menu-dropdown.is-active').forEach(openDropdown => {
            if (!openDropdown.contains(event.target) && !event.target.classList.contains('menu-button')) {
                openDropdown.classList.remove('is-active');
            }
        });
    });

    // bodyのno-scrollクラスを制御
    document.body.addEventListener('click', (event) => {
        // ハンバーガーメニューかメニュー自体をクリックしない限り閉じないように変更
        // メニュー外をクリックで閉じたい場合は、このロジックを調整します。
        // 例：if (!spMenu.contains(event.target) && !hamburgerMenu.contains(event.target) && spMenu.classList.contains('is-active')) { ... }
        // 今回はヘッダーのハンバーガーメニューで閉じるので、特に調整は不要です。
    });
});