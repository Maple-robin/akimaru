document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

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
        toggle.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('category-icon')) {
                this.classList.toggle('is-open');
                const subList = this.querySelector('.sp-menu__sub-list');
                if (subList) {
                    subList.classList.toggle('is-open');
                }
            }
        });
    });

    // --- ウイスキー一覧ページ固有のロジック ---
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

    // 商品データ (ウイスキーに特化)
    let products = [
        {
            id: 1,
            name: 'シングルモルト 熟成12年',
            image: 'https://placehold.co/300x200/8B4513/FFFFFF?text=SingleMalt',
            volume: '700ml',
            price: 8000,
            tags: ['芳醇', '高級', 'ストレート'],
            category: 'ウイスキー',
            releaseDate: '2021-03-01',
            rankingScore: 200
        },
        {
            id: 2,
            name: 'ブレンデッドウイスキー',
            image: 'https://placehold.co/300x200/D2B48C/000000?text=BlendedWhisky',
            volume: '700ml',
            price: 3500,
            tags: ['定番', '初心者向け', 'ハイボール'],
            category: 'ウイスキー',
            releaseDate: '2022-09-10',
            rankingScore: 180
        },
        {
            id: 3,
            name: 'バーボンウイスキー',
            image: 'https://placehold.co/300x200/A0522D/FFFFFF?text=Bourbon',
            volume: '750ml',
            price: 4500,
            tags: ['甘口', 'ロック', 'アメリカン'],
            category: 'ウイスキー',
            releaseDate: '2023-01-20',
            rankingScore: 170
        },
        {
            id: 4,
            name: 'アイリッシュウイスキー',
            image: 'https://placehold.co/300x200/6B8E23/FFFFFF?text=IrishWhisky',
            volume: '700ml',
            price: 4000,
            tags: ['スムース', '初心者向け', 'アイリッシュ'],
            category: 'ウイスキー',
            releaseDate: '2023-05-01',
            rankingScore: 160
        },
        {
            id: 5,
            name: 'スコッチウイスキー',
            image: 'https://placehold.co/300x200/708090/FFFFFF?text=ScotchWhisky',
            volume: '700ml',
            price: 5000,
            tags: ['スモーキー', '辛口', 'スコットランド'],
            category: 'ウイスキー',
            releaseDate: '2022-07-15',
            rankingScore: 190
        },
        {
            id: 6,
            name: 'ジャパニーズウイスキー',
            image: 'https://placehold.co/300x200/CD5C5C/FFFFFF?text=JapaneseWhisky',
            volume: '700ml',
            price: 10000,
            tags: ['希少', '高級', '限定品'],
            category: 'ウイスキー',
            releaseDate: '2024-01-01',
            rankingScore: 220
        }
    ];

    // 初期フィルター設定: 「ウイスキー」カテゴリのみを選択
    let currentFilters = {
        categories: ['ウイスキー'],
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
            // どのカテゴリも選択されていない場合は、デフォルトで「ウイスキー」を表示
            filteredProducts = filteredProducts.filter(product => product.category === 'ウイスキー');
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
            // どのカテゴリも選択されていない場合、デフォルトで「ウイスキー」を選択
            currentFilters.categories = ['ウイスキー'];
            // フィルターパネルの「ウイスキー」チェックボックスもチェックする
            document.querySelector('#filter-overlay input[name="category"][value="ウイスキー"]').checked = true;
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
    // ページロード時に「ウイスキー」カテゴリのチェックボックスを自動でチェック
    const whiskyCategoryCheckbox = document.querySelector('#filter-overlay input[name="category"][value="ウイスキー"]');
    if (whiskyCategoryCheckbox) {
        whiskyCategoryCheckbox.checked = true;
    }
    applyFiltersAndSort();
});
