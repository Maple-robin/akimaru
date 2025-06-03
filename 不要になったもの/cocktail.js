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

    // --- カクテル一覧ページ固有のロジック ---
    const filterButton = document.getElementById('filter-button');
    const sortButton = document.getElementById('sort-button');
    const filterOverlay = document.getElementById('filter-overlay');
    const sortOverlay = document.getElementById('sort-overlay');
    const filterCloseButton = document.getElementById('filter-close-button');
    const sortCloseButton = document.getElementById('sort-close-button');
    const applyFilterButton = document.querySelector('#filter-overlay .apply-filter-button');
    const applySortButton = document.querySelector('#sort-overlay .apply-sort-button');
    const displayGridButton = document.getElementById('display-grid');
    const displayListButton = document.getElementById('display-list');
    const productList = document.getElementById('product-list');

    // 商品データ (カクテルに特化)
    let products = [
        {
            id: 1,
            name: 'モヒート',
            image: 'https://placehold.co/300x200/98FB98/000000?text=Mojito',
            volume: '300ml',
            price: 850,
            tags: ['爽やか', '初心者向け', '度数低め'],
            category: 'カクテル',
            releaseDate: '2024-05-20',
            rankingScore: 120
        },
        {
            id: 2,
            name: 'マティーニ',
            image: 'https://placehold.co/300x200/E0BBE4/000000?text=Martini',
            volume: '150ml',
            price: 1200,
            tags: ['辛口', '度数高め'],
            category: 'カクテル',
            releaseDate: '2023-11-10',
            rankingScore: 115
        },
        {
            id: 3,
            name: 'ジントニック',
            image: 'https://placehold.co/300x200/ADD8E6/000000?text=GinTonic',
            volume: '250ml',
            price: 780,
            tags: ['定番', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-01-15',
            rankingScore: 110
        },
        {
            id: 4,
            name: 'スクリュードライバー',
            image: 'https://placehold.co/300x200/FFD700/000000?text=Screwdriver',
            volume: '200ml',
            price: 750,
            tags: ['甘口', '度数低め'],
            category: 'カクテル',
            releaseDate: '2023-08-01',
            rankingScore: 105
        },
        {
            id: 5,
            name: 'カシスオレンジ',
            image: 'https://placehold.co/300x200/FFA07A/000000?text=CassisOrange',
            volume: '250ml',
            price: 800,
            tags: ['甘口', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-03-05',
            rankingScore: 100
        },
        {
            id: 6,
            name: 'ブラッディ・メアリー',
            image: 'https://placehold.co/300x200/DC143C/FFFFFF?text=BloodyMary',
            volume: '200ml',
            price: 900,
            tags: ['辛口', '個性派'],
            category: 'カクテル',
            releaseDate: '2023-09-25',
            rankingScore: 95
        },
        {
            id: 7,
            name: 'ブルーハワイ',
            image: 'https://placehold.co/300x200/87CEEB/000000?text=BlueHawaii',
            volume: '250ml',
            price: 950,
            tags: ['トロピカル', '甘口'],
            category: 'カクテル',
            releaseDate: '2024-06-01',
            rankingScore: 118
        },
        {
            id: 8,
            name: 'コスモポリタン',
            image: 'https://placehold.co/300x200/FF69B4/000000?text=Cosmopolitan',
            volume: '180ml',
            price: 1100,
            tags: ['スタイリッシュ', '辛口'],
            category: 'カクテル',
            releaseDate: '2023-04-12',
            rankingScore: 108
        }
    ];

    // 初期フィルター設定: 「カクテル」カテゴリのみを選択
    let currentFilters = {
        categories: ['カクテル'],
        tags: []
    };
    let currentSortOrder = 'ranking'; // デフォルトの並び順

    // 商品カードをレンダリングする関数
    function renderProducts(productsToRender, displayMode) {
        productList.innerHTML = ''; // 既存の商品をクリア
        // 表示モードに応じてクラスを切り替え
        productList.className = displayMode === 'grid' ? 'product-grid' : 'product-list';

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // リスト表示の場合に 'product-list-item' クラスを追加
            if (displayMode === 'list') {
                productCard.classList.add('product-list-item');
            }

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-card__image">
                <div class="product-card__details"> <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__volume">${product.volume}</p>
                    <p class="product-card__price">¥ ${product.price.toLocaleString()} <span>~ 【税込】</span></p>
                    <span class="product-card__tag">${product.tags[0] || ''}</span>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    // フィルターとソートを適用して商品を再レンダリングする関数
    function applyFiltersAndSort() {
        let filteredProducts = [...products]; // 全ての商品から開始

        // カテゴリフィルターを適用
        // 「すべて」が選択されていない、かつカテゴリフィルターが設定されている場合
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes('すべて')) {
            filteredProducts = filteredProducts.filter(product =>
                currentFilters.categories.includes(product.category)
            );
        } else if (currentFilters.categories.includes('すべて')) {
            // 「すべて」が選択されている場合は、全てのカテゴリを表示
            // 何もフィルタリングしない
        } else {
            // どのカテゴリも選択されていない場合は、デフォルトで「カクテル」を表示
            filteredProducts = filteredProducts.filter(product => product.category === 'カクテル');
        }


        // タグフィルターを適用
        if (currentFilters.tags.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.tags.some(tag => currentFilters.tags.includes(tag))
            );
        }

        // ソートを適用
        if (currentSortOrder === 'newest') {
            filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (currentSortOrder === 'oldest') {
            filteredProducts.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        } else if (currentSortOrder === 'ranking') {
            filteredProducts.sort((a, b) => b.rankingScore - a.rankingScore);
        }

        // 現在の表示モードを決定してレンダリング
        const currentDisplayMode = displayGridButton.classList.contains('active') ? 'grid' : 'list';
        renderProducts(filteredProducts, currentDisplayMode);
    }

    // フィルターパネルを開くイベントリスナー
    filterButton.addEventListener('click', () => {
        // フィルターパネルを開くときに、現在のフィルター状態をチェックボックスに反映
        document.querySelectorAll('#filter-overlay input[name="category"]').forEach(checkbox => {
            checkbox.checked = currentFilters.categories.includes(checkbox.value);
        });
        document.querySelectorAll('#filter-overlay input[name="tag"]').forEach(checkbox => {
            checkbox.checked = currentFilters.tags.includes(checkbox.value);
        });
        filterOverlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
    });

    // ソートパネルを開くイベントリスナー
    sortButton.addEventListener('click', () => {
        // ソートパネルを開くときに、現在のソート状態をラジオボタンに反映
        document.querySelector(`#sort-overlay input[name="sort_order"][value="${currentSortOrder}"]`).checked = true;
        sortOverlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
    });

    // フィルターパネルを閉じるイベントリスナー
    filterCloseButton.addEventListener('click', () => {
        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    });

    // ソートパネルを閉じるイベントリスナー
    sortCloseButton.addEventListener('click', () => {
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    });

    // フィルター適用ボタンのイベントリスナー
    applyFilterButton.addEventListener('click', () => {
        currentFilters.categories = [];
        currentFilters.tags = [];

        // 選択されたカテゴリを取得
        document.querySelectorAll('#filter-overlay input[name="category"]:checked').forEach(checkbox => {
            currentFilters.categories.push(checkbox.value);
        });
        // 選択されたタグを取得
        document.querySelectorAll('#filter-overlay input[name="tag"]:checked').forEach(checkbox => {
            currentFilters.tags.push(checkbox.value);
        });

        // 「すべて」が選択された場合、他のカテゴリの選択を解除
        if (currentFilters.categories.includes('すべて')) {
            currentFilters.categories = ['すべて'];
        } else if (currentFilters.categories.length === 0) {
            // どのカテゴリも選択されていない場合、デフォルトで「カクテル」を選択
            currentFilters.categories = ['カクテル'];
            // フィルターパネルの「カクテル」チェックボックスもチェックする
            document.querySelector('#filter-overlay input[name="category"][value="カクテル"]').checked = true;
        }

        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort(); // フィルターとソートを適用して再レンダリング
    });

    // ソート適用ボタンのイベントリスナー
    applySortButton.addEventListener('click', () => {
        currentSortOrder = document.querySelector('#sort-overlay input[name="sort_order"]:checked').value;
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort(); // フィルターとソートを適用して再レンダリング
    });

    // グリッド表示ボタンのイベントリスナー
    displayGridButton.addEventListener('click', () => {
        displayGridButton.classList.add('active');
        displayListButton.classList.remove('active');
        applyFiltersAndSort(); // 新しい表示モードで再レンダリング
    });

    // リスト表示ボタンのイベントリスナー
    displayListButton.addEventListener('click', () => {
        displayListButton.classList.add('active');
        displayGridButton.classList.remove('active');
        applyFiltersAndSort(); // 新しい表示モードで再レンダリング
    });

    // 初期レンダリング
    // ページロード時に「カクテル」カテゴリのチェックボックスを自動でチェック
    const cocktailCategoryCheckbox = document.querySelector('#filter-overlay input[name="category"][value="カクテル"]');
    if (cocktailCategoryCheckbox) {
        cocktailCategoryCheckbox.checked = true;
    }
    applyFiltersAndSort();
});
