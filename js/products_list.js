document.addEventListener('DOMContentLoaded', function() {
    // --- ハンバーガーメニューとSPメニューの制御 ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const spMenu = document.querySelector('.sp-menu');

    if (hamburgerMenu && spMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('is-active');
            spMenu.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll', spMenu.classList.contains('is-active'));
        });
    }

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

    // --- ランキングページ固有のロジック ---
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
    
    const pageTitleEn = document.querySelector('.page-title .en');
    const pageTitleJa = document.querySelector('.page-title .ja');

    let products = [
        {
            id: 1,
            name: 'オリジナルエールビール',
            image: 'https://placehold.co/300x200/F08080/000000?text=AleBeer',
            volume: '350ml',
            price: 550,
            tags: ['定番', '辛口', '度数高め'],
            category: 'ビール',
            releaseDate: '2022-01-01',
            rankingScore: 120
        },
        {
            id: 2,
            name: 'フルーツIPA',
            image: 'https://placehold.co/300x200/87CEFA/000000?text=FruitIPA',
            volume: '350ml',
            price: 600,
            tags: ['限定', '甘口', '初心者向け'],
            category: 'ビール',
            releaseDate: '2024-04-10',
            rankingScore: 110
        },
        {
            id: 3,
            name: 'ダークラガー',
            image: 'https://placehold.co/300x200/8B4513/FFFFFF?text=DarkLager',
            volume: '350ml',
            price: 580,
            tags: ['濃厚', '辛口'],
            category: 'ビール',
            releaseDate: '2023-11-20',
            rankingScore: 105
        },
        {
            id: 4,
            name: 'ホワイトビール',
            image: 'https://placehold.co/300x200/F5DEB3/000000?text=WhiteBeer',
            volume: '330ml',
            price: 520,
            tags: ['爽やか', '初心者向け'],
            category: 'ビール',
            releaseDate: '2023-05-15',
            rankingScore: 98
        },
        {
            id: 5,
            name: 'ペールエール',
            image: 'https://placehold.co/300x200/FFDAB9/000000?text=PaleAle',
            volume: '350ml',
            price: 570,
            tags: ['ホップ', '苦味'],
            category: 'ビール',
            releaseDate: '2022-09-01',
            rankingScore: 92
        },
        {
            id: 6,
            name: 'スタウト',
            image: 'https://placehold.co/300x200/36454F/FFFFFF?text=Stout',
            volume: '330ml',
            price: 620,
            tags: ['ロースト', '濃厚'],
            category: 'ビール',
            releaseDate: '2023-02-28',
            rankingScore: 85
        },
        // ハイボール
        {
            id: 7,
            name: 'オリジナルハイボール',
            image: 'https://placehold.co/300x200/A0522D/FFFFFF?text=Highball',
            volume: '500ml',
            price: 450,
            tags: ['定番', '爽快'],
            category: 'ハイボール',
            releaseDate: '2022-03-01',
            rankingScore: 80
        },
        // カクテル
        {
            id: 8,
            name: 'モヒート',
            image: 'https://placehold.co/300x200/6A5ACD/FFFFFF?text=Cocktail',
            volume: '300ml',
            price: 700,
            tags: ['限定', '甘口', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-05-01',
            rankingScore: 95
        },
        // ワイン
        {
            id: 9,
            name: '赤ワイン ボルドー',
            image: 'https://placehold.co/300x200/8B0000/FFFFFF?text=Wine',
            volume: '750ml',
            price: 2500,
            tags: ['濃厚', '辛口'],
            category: 'ワイン',
            releaseDate: '2021-10-01',
            rankingScore: 130
        },
        // 日本酒
        {
            id: 10,
            name: '純米大吟醸 〇〇',
            image: 'https://placehold.co/300x200/F0F8FF/000000?text=Sake',
            volume: '720ml',
            price: 3000,
            tags: ['華やか', 'ギフト'],
            category: '日本酒',
            releaseDate: '2023-09-01',
            rankingScore: 115
        },
        // ウイスキー
        {
            id: 11,
            name: 'シングルモルト 〇〇',
            image: 'https://placehold.co/300x200/D2B48C/000000?text=Whisky',
            volume: '700ml',
            price: 4000,
            tags: ['本格派', '熟成'],
            category: 'ウイスキー',
            releaseDate: '2020-07-01',
            rankingScore: 140
        }
    ];

    // URLパラメータを解析する関数
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const parts = param.split('=');
            if (parts.length === 2) {
                params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
            }
        });
        return params;
    }

    let currentFilters = {
        categories: ['すべて'], // デフォルトは「すべて」
        tags: []
    };
    let currentSortOrder = 'ranking'; // デフォルトの並び順

    // URLパラメータを読み込み、初期フィルター/ソートを設定
    const queryParams = getQueryParams();

    if (queryParams.category) {
        currentFilters.categories = [queryParams.category];
        currentFilters.tags = []; // カテゴリが指定されたらタグはリセット
    } else if (queryParams.tag) {
        currentFilters.tags = [queryParams.tag];
        currentFilters.categories = ['すべて']; // タグが指定されたらカテゴリは「すべて」
    }

    if (queryParams.sort) {
        currentSortOrder = queryParams.sort;
    }

    function renderProducts(productsToRender, displayMode) {
        productList.innerHTML = '';
        productList.className = displayMode === 'grid' ? 'product-grid' : 'product-list';

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

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

    function applyFiltersAndSort() {
        let filteredProducts = [...products];

        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes('すべて')) {
            filteredProducts = filteredProducts.filter(product =>
                currentFilters.categories.includes(product.category)
            );
        } else if (currentFilters.categories.includes('すべて')) {
            // 「すべて」が選択されている場合は、全てのカテゴリを表示
        } 

        if (currentFilters.tags.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.tags.some(tag => currentFilters.tags.includes(tag))
            );
        }

        if (currentSortOrder === 'newest') {
            filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (currentSortOrder === 'oldest') {
            filteredProducts.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        } else if (currentSortOrder === 'ranking') {
            filteredProducts.sort((a, b) => b.rankingScore - a.rankingScore);
        }

        updatePageTitle();

        const currentDisplayMode = displayGridButton.classList.contains('active') ? 'grid' : 'list';
        renderProducts(filteredProducts, currentDisplayMode);
    }

    function updatePageTitle() {
        let enTitle = "PRODUCTS LIST";
        let jaTitle = "( 商品一覧 )";

        // 1. タグが単一で選択されている場合、タグのタイトルを優先
        if (currentFilters.tags.length === 1) {
            const selectedTag = currentFilters.tags[0];
            switch (selectedTag) {
                case '初心者向け':
                    enTitle = "FOR BEGINNERS";
                    jaTitle = "( 初めての方へおすすめの一杯 )";
                    break;
                case '甘口':
                    enTitle = "SWEET SELECTION";
                    jaTitle = "( 甘口ビール一覧 )";
                    break;
                case '辛口':
                    enTitle = "DRY SELECTION";
                    jaTitle = "( 辛口ビール一覧 )";
                    break;
                case '度数低め':
                    enTitle = "LOW ALCOHOL";
                    jaTitle = "( 度数低めビール一覧 )";
                    break;
                case '度数高め':
                    enTitle = "HIGH ALCOHOL";
                    jaTitle = "( 度数高めビール一覧 )";
                    break;
                default:
                    enTitle = `${selectedTag.toUpperCase()} LIST`;
                    jaTitle = `( ${selectedTag}一覧 )`;
                    break;
            }
        }
        // 2. カテゴリが単一で選択されている場合 (かつ「すべて」ではない場合)
        else if (currentFilters.categories.length === 1 && currentFilters.categories[0] !== 'すべて') {
            const selectedCategory = currentFilters.categories[0];
            switch (selectedCategory) {
                case 'ビール':
                    enTitle = "BEER LIST";
                    jaTitle = "( ビール一覧 )";
                    break;
                case 'ハイボール':
                    enTitle = "HIGHBALL LIST";
                    jaTitle = "( ハイボール一覧 )";
                    break;
                case 'カクテル':
                    enTitle = "COCKTAIL LIST";
                    jaTitle = "( カクテル一覧 )";
                    break;
                case 'ワイン':
                    enTitle = "WINE LIST";
                    jaTitle = "( ワイン一覧 )";
                    break;
                case '日本酒':
                    enTitle = "SAKE LIST";
                    jaTitle = "( 日本酒一覧 )";
                    break;
                case 'ウイスキー':
                    enTitle = "WHISKY LIST";
                    jaTitle = "( ウイスキー一覧 )";
                    break;
                default:
                    enTitle = "PRODUCTS LIST";
                    jaTitle = "( 商品一覧 )";
                    break;
            }
        }
        // 3. ランキング順が選択されており、かつ特定のカテゴリやタグが単一で選択されていない場合
        // (カテゴリが「すべて」であるか、何も選択されていない場合)
        else if (currentSortOrder === 'ranking' && currentFilters.tags.length === 0 && 
                 (currentFilters.categories.length === 0 || currentFilters.categories.includes('すべて'))) {
            enTitle = "RANKING";
            jaTitle = "( ランキング一覧 )";
        }
        // 4. その他の場合 (複数選択、またはデフォルトの「すべて」でランキング以外のソート)
        else {
            enTitle = "PRODUCTS LIST";
            jaTitle = "( 商品一覧 )";
        }

        pageTitleEn.textContent = enTitle;
        pageTitleJa.textContent = jaTitle;
    }

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

    // カテゴリチェックボックスの変更イベントリスナー
    document.querySelectorAll('#filter-overlay input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allCheckbox = document.querySelector('#filter-overlay input[name="category"][value="すべて"]');
            
            if (this.value === 'すべて') {
                if (this.checked) {
                    document.querySelectorAll('#filter-overlay input[name="category"]').forEach(otherCheckbox => {
                        if (otherCheckbox.value !== 'すべて') {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            } else {
                if (this.checked && allCheckbox && allCheckbox.checked) {
                    allCheckbox.checked = false;
                }
                const checkedCategories = Array.from(document.querySelectorAll('#filter-overlay input[name="category"]:checked'))
                                             .map(cb => cb.value)
                                             .filter(value => value !== 'すべて');
                if (checkedCategories.length === 0 && allCheckbox) {
                    allCheckbox.checked = true;
                }
            }
        });
    });

    sortButton.addEventListener('click', () => {
        // ソートパネルを開くときに、現在のソート状態をラジオボタンに反映
        document.querySelector(`#sort-overlay input[name="sort_order"][value="${currentSortOrder}"]`).checked = true;
        sortOverlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
    });

    filterCloseButton.addEventListener('click', () => {
        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    });

    sortCloseButton.addEventListener('click', () => {
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    });

    applyFilterButton.addEventListener('click', () => {
        currentFilters.categories = [];
        currentFilters.tags = [];

        document.querySelectorAll('#filter-overlay input[name="category"]:checked').forEach(checkbox => {
            currentFilters.categories.push(checkbox.value);
        });
        document.querySelectorAll('#filter-overlay input[name="tag"]:checked').forEach(checkbox => {
            currentFilters.tags.push(checkbox.value);
        });

        // 適用ボタンを押した時点での最終的な「すべて」の処理
        // 何も選択されていないか、「すべて」のみが選択されている場合、フィルタは「すべて」
        if (currentFilters.categories.length === 0 || currentFilters.categories.includes('すべて')) {
            currentFilters.categories = ['すべて'];
            // 「すべて」が選択されたら他のカテゴリのチェックを外す（UI側も同期）
            document.querySelectorAll('#filter-overlay input[name="category"]').forEach(checkbox => {
                if (checkbox.value !== 'すべて') {
                    checkbox.checked = false;
                }
            });
            const allCategoryCheckbox = document.querySelector('#filter-overlay input[name="category"][value="すべて"]');
            if (allCategoryCheckbox) allCategoryCheckbox.checked = true;

        } else if (currentFilters.categories.length > 1 && currentFilters.categories.includes('すべて')) {
            // 「すべて」と他のカテゴリが同時に選択された場合、「すべて」のみにする
            currentFilters.categories = ['すべて'];
            document.querySelectorAll('#filter-overlay input[name="category"]').forEach(checkbox => {
                if (checkbox.value !== 'すべて') {
                    checkbox.checked = false;
                }
            });
        }
        
        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort();
    });

    applySortButton.addEventListener('click', () => {
        currentSortOrder = document.querySelector('#sort-overlay input[name="sort_order"]:checked').value;
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort();
    });

    displayGridButton.addEventListener('click', () => {
        displayGridButton.classList.add('active');
        displayListButton.classList.remove('active');
        applyFiltersAndSort();
    });

    displayListButton.addEventListener('click', () => {
        displayListButton.classList.add('active');
        displayGridButton.classList.remove('active');
        applyFiltersAndSort();
    });

    displayListButton.classList.add('active');
    displayGridButton.classList.remove('active');

    // 初期レンダリング
    // URLパラメータに基づいて初期フィルター/ソートを設定した後にUIを同期
    if (queryParams.category) {
        const categoryCheckbox = document.querySelector(`#filter-overlay input[name="category"][value="${queryParams.category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            const allCategoryCheckbox = document.querySelector('#filter-overlay input[name="category"][value="すべて"]');
            if (allCategoryCheckbox) allCategoryCheckbox.checked = false; // 特定カテゴリ選択時は「すべて」をオフ
        }
    } else if (queryParams.tag) {
        const tagCheckbox = document.querySelector(`#filter-overlay input[name="tag"][value="${queryParams.tag}"]`);
        if (tagCheckbox) {
            tagCheckbox.checked = true;
        }
    } else {
        // パラメータがない場合はデフォルトで「すべて」をチェック
        const allCategoryCheckbox = document.querySelector('#filter-overlay input[name="category"][value="すべて"]');
        if (allCategoryCheckbox) {
            allCategoryCheckbox.checked = true;
        }
    }

    if (queryParams.sort) {
        const sortRadio = document.querySelector(`#sort-overlay input[name="sort_order"][value="${queryParams.sort}"]`);
        if (sortRadio) {
            sortRadio.checked = true;
        }
    } else {
        // ソートパラメータがない場合はデフォルトの「ランキング」をチェック
        const defaultSortRadio = document.querySelector(`#sort-overlay input[name="sort_order"][value="ranking"]`);
        if (defaultSortRadio) {
            defaultSortRadio.checked = true;
        }
    }

    applyFiltersAndSort();
});
