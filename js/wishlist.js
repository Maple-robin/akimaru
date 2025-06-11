document.addEventListener('DOMContentLoaded', function() {
    // --- ハンバーガーメニューとSPメニューの制御 ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    if (hamburgerMenu && spMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('is-active');
            spMenu.classList.toggle('is-active');
            // メニューが開いているときはスクロールを無効にする
            document.body.classList.toggle('no-scroll', spMenu.classList.contains('is-active'));

            // メニューの開閉に合わせてクラスを追加/削除
            if (spMenu.classList.contains('is-active')) {
                document.body.classList.add('menu-open');   // 開くとき
            } else {
                document.body.classList.remove('menu-open'); // 閉じるとき
            }
        });
    }

    // SPメニューのカテゴリトグル機能
    const spCategoryToggles = document.querySelectorAll('.sp-menu__category-toggle');
    spCategoryToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // クリックされた要素がトグル自体か、その中のアイコンの場合のみ処理
            if (e.target === this || e.target.classList.contains('category-icon')) {
                this.classList.toggle('is-open');
                const subList = this.querySelector('.sp-menu__sub-list');
                if (subList) {
                    subList.classList.toggle('is-open');
                }
            }
        });
    });

    // --- お気に入りページ固有のロジック ---
    const displayGridButton = document.getElementById('display-grid');
    const displayListButton = document.getElementById('display-list');
    const productList = document.getElementById('product-list');
    
    const pageTitleEn = document.querySelector('.page-title .en');
    const pageTitleJa = document.querySelector('.page-title .ja');

    // 商品データ（ダミーデータ、実際はサーバーやストレージから取得）
    // isFavorite: true のものがお気に入りとして表示される
    let products = [
        {
            id: 1,
            name: '【新発売】ベリーベリー カシスaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            image: '../img/berry.png', // このパスは仮です。実際に画像があるか確認してください
            volume: '200ml/720ml',
            price: 1750,
            tags: ['新発売', '甘口', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-06-01',
            rankingScore: 150,
            isFavorite: true // お気に入り
        },
        {
            id: 2,
            name: 'オリジナルエールビール',
            image: 'https://placehold.co/300x200/F08080/000000?text=AleBeer',
            volume: '350ml',
            price: 550,
            tags: ['定番', '辛口', '度数高め'],
            category: 'ビール',
            releaseDate: '2022-01-01',
            rankingScore: 120,
            isFavorite: false // お気に入りではない
        },
        {
            id: 3,
            name: 'フルーツIPA',
            image: 'https://placehold.co/300x200/87CEFA/000000?text=FruitIPA',
            volume: '350ml',
            price: 600,
            tags: ['限定', '甘口', '初心者向け'],
            category: 'ビール',
            releaseDate: '2024-04-10',
            rankingScore: 110,
            isFavorite: true // お気に入り
        },
        {
            id: 4,
            name: 'ダークラガー',
            image: 'https://placehold.co/300x200/8B4513/FFFFFF?text=DarkLager',
            volume: '350ml',
            price: 580,
            tags: ['濃厚', '辛口'],
            category: 'ビール',
            releaseDate: '2023-11-20',
            rankingScore: 105,
            isFavorite: false
        },
        {
            id: 5,
            name: 'ホワイトビール',
            image: 'https://placehold.co/300x200/F5DEB3/000000?text=WhiteBeer',
            volume: '330ml',
            price: 520,
            tags: ['爽やか', '初心者向け'],
            category: 'ビール',
            releaseDate: '2023-05-15',
            rankingScore: 98,
            isFavorite: true // お気に入り
        },
        {
            id: 6,
            name: 'ペールエール',
            image: 'https://placehold.co/300x200/FFDAB9/000000?text=PaleAle',
            volume: '350ml',
            price: 570,
            tags: ['ホップ', '苦味'],
            category: 'ビール',
            releaseDate: '2022-09-01',
            rankingScore: 92,
            isFavorite: true // お気に入り
        },
        {
            id: 7,
            name: 'スタウト',
            image: 'https://placehold.co/300x200/36454F/FFFFFF?text=Stout',
            volume: '330ml',
            price: 620,
            tags: ['ロースト', '濃厚'],
            category: 'ビール',
            releaseDate: '2023-02-28',
            rankingScore: 85,
            isFavorite: false
        },
        // ハイボール
        {
            id: 8,
            name: 'オリジナルハイボール',
            image: 'https://placehold.co/300x200/A0522D/FFFFFF?text=Highball',
            volume: '500ml',
            price: 450,
            tags: ['定番', '爽快'],
            category: 'ハイボール',
            releaseDate: '2022-03-01',
            rankingScore: 80,
            isFavorite: false
        },
        // カクテル
        {
            id: 9,
            name: 'モヒート',
            image: 'https://placehold.co/300x200/6A5ACD/FFFFFF?text=Cocktail',
            volume: '300ml',
            price: 700,
            tags: ['限定', '甘口', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-05-01',
            rankingScore: 95,
            isFavorite: true // お気に入り
        },
        // ワイン
        {
            id: 10,
            name: '赤ワイン ボルドー',
            image: 'https://placehold.co/300x200/8B0000/FFFFFF?text=Wine',
            volume: '750ml',
            price: 2500,
            tags: ['濃厚', '辛口'],
            category: 'ワイン',
            releaseDate: '2021-10-01',
            rankingScore: 130,
            isFavorite: false
        },
        // 日本酒
        {
            id: 11,
            name: '純米大吟醸 〇〇',
            image: 'https://placehold.co/300x200/F0F8FF/000000?text=Sake',
            volume: '720ml',
            price: 3000,
            tags: ['華やか', 'ギフト'],
            category: '日本酒',
            releaseDate: '2023-09-01',
            rankingScore: 115,
            isFavorite: false
        },
        // ウイスキー
        {
            id: 12,
            name: 'シングルモルト 〇〇aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            image: '../img/berry.png', // このパスは仮です。実際に画像があるか確認してください
            volume: '700ml',
            price: 4000,
            tags: ['本格派', '熟成'],
            category: 'ウイスキー',
            releaseDate: '2020-07-01',
            rankingScore: 140,
            isFavorite: false
        }
    ];

    let currentDisplayMode = 'list'; // デフォルトをリスト表示に変更

    // お気に入り商品のみを抽出する関数
    function getFavoriteProducts() {
        return products.filter(product => product.isFavorite);
    }

    // 商品をレンダリングする関数
    function renderProducts(productsToRender, displayMode) {
        productList.innerHTML = '';
        productList.className = '';
        productList.classList.add('product-grid');

        // 既存のメッセージを削除
        const oldMsg = document.querySelector('.no-favorites-message');
        if (oldMsg) oldMsg.remove();

        if (productsToRender.length === 0) {
            // グリッドの外にメッセージを追加
            const msg = document.createElement('div');
            msg.className = 'no-favorites-message';
            msg.textContent = 'お気に入りの商品はありません。';
            productList.parentNode.insertBefore(msg, productList.nextSibling);
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // ハートアイコンのクラスを動的に設定 (お気に入りページでは常にfas fa-heart)
            // お気に入りページでは、isFavoriteは常にtrue（表示されているから）
            // クリックで解除できるように、isFavorite状態を反映
            const favoriteClass = product.isFavorite ? 'fas fa-heart is-favorite' : 'far fa-heart';

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-card__image">
                <i class="${favoriteClass} product-card__favorite" data-product-id="${product.id}"></i>
                <div class="product-card__details">
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__volume">${product.volume}</p>
                    <p class="product-card__price">¥ ${product.price.toLocaleString()} <span>~ 【税込】</span></p>
                    <span class="product-card__tag">${product.tags[0] || ''}</span>
                </div>
            `;
            productList.appendChild(productCard);
        });

        // ハートアイコンのクリックイベントリスナーを設定
        document.querySelectorAll('.product-card__favorite').forEach(heartIcon => {
            heartIcon.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                const product = products.find(p => p.id === productId); // 全商品データから見つける
                if (product) {
                    product.isFavorite = !product.isFavorite; // お気に入り状態をトグル
                    // お気に入り状態が変わったら、表示を更新
                    renderCurrentFavorites();
                }
            });
        });
    }

    // ページタイトルを更新する関数（お気に入りページ固定）
    function updatePageTitle() {
        pageTitleEn.textContent = "FAVORITES LIST";
        pageTitleJa.textContent = "( お気に入り一覧 )";
    }

    // 現在のお気に入り商品を表示する関数
    function renderCurrentFavorites() {
        const favoriteProducts = getFavoriteProducts();
        // 表示モードを決定
        const modeToRender = (window.innerWidth > 767) ? 'grid' : currentDisplayMode; // PCではグリッド固定、スマホでは現在の選択
        renderProducts(favoriteProducts, modeToRender);
    }

    // 表示モードボタン（グリッド）
    if (displayGridButton && displayListButton) {
        displayGridButton.addEventListener('click', () => {
            displayGridButton.classList.add('active');
            displayListButton.classList.remove('active');
            currentDisplayMode = 'grid';
            renderCurrentFavorites();
        });

        // 表示モードボタン（リスト）
        displayListButton.addEventListener('click', () => {
            displayListButton.classList.add('active');
            displayGridButton.classList.remove('active');
            currentDisplayMode = 'list';
            renderCurrentFavorites();
        });

        // 初期表示モードを決定
        if (window.innerWidth > 767) {
            displayGridButton.classList.add('active');
            displayListButton.classList.remove('active');
            currentDisplayMode = 'grid';
        } else {
            displayListButton.classList.add('active');
            displayGridButton.classList.remove('active');
            currentDisplayMode = 'list';
        }
    } else {
        // ボタンがない場合は常にグリッド表示にする
        currentDisplayMode = 'grid';
    }

    // ウィンドウのリサイズ時に適用されるロジックも修正
    window.addEventListener('resize', () => {
        renderCurrentFavorites();
        if (displayGridButton && displayListButton) {
            if (window.innerWidth > 767) {
                displayGridButton.classList.add('active');
                displayListButton.classList.remove('active');
                currentDisplayMode = 'grid';
            } else {
                if (currentDisplayMode === 'grid') {
                    displayGridButton.classList.add('active');
                    displayListButton.classList.remove('active');
                } else {
                    displayListButton.classList.add('active');
                    displayGridButton.classList.remove('active');
                }
            }
        } else {
            currentDisplayMode = (window.innerWidth > 767) ? 'grid' : 'list';
        }
    });

    // 初期表示
    updatePageTitle();
    renderCurrentFavorites();
});

