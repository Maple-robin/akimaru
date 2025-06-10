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

    // 商品データ
    let products = [
        {
            id: 1,
            name: '【新発売】ベリーベリー カシス',
            image: 'https://placehold.co/300x200/F08080/000000?text=AleBeer',
            volume: '200ml/720ml',
            price: 1750,
            tags: ['新発売', '甘口', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-06-01',
            rankingScore: 150,
            isFavorite: true
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
            isFavorite: false 
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
            isFavorite: true 
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
            isFavorite: false
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
            isFavorite: true
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
            isFavorite: true
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
            image: '../img/berry.png',
            volume: '700ml',
            price: 4000,
            tags: ['本格派', '熟成'],
            category: 'ウイスキー',
            releaseDate: '2020-07-01',
            rankingScore: 140,
            isFavorite: false
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
    let currentDisplayMode = 'list'; // デフォルトをリスト表示に変更

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

    // 商品をレンダリングする関数
    function renderProducts(productsToRender, displayMode) {
        productList.innerHTML = '';
        productList.className = ''; // クラスをリセット
        
        // PCでは常にグリッド、スマホでは選択されたモードに
        if (window.innerWidth > 767) { // PCのブレークポイントを768pxから767pxに変更
            productList.classList.add('product-grid');
            productList.classList.remove('product-list');
        } else {
            productList.classList.add(`product-${displayMode}`);
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // スマホのリスト表示時にのみ 'product-list-item' クラスを追加
            if (displayMode === 'list' && window.innerWidth <= 767) { // 767px以下でリスト表示の場合
                productCard.classList.add('product-list-item');
            }

            // ハートアイコンのクラスを動的に設定
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
                this.classList.toggle('far');
                this.classList.toggle('fas');
                this.classList.toggle('is-favorite');
                
                const productId = parseInt(this.dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product) {
                    product.isFavorite = !product.isFavorite;
                }
            });
        });
    }

    // フィルターとソートを適用する関数
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
        } else if (currentSortOrder === 'highest_price') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (currentSortOrder === 'lowest_price') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (currentSortOrder === 'ranking') {
            filteredProducts.sort((a, b) => b.rankingScore - a.rankingScore);
        }

        updatePageTitle();

        // 表示モードを決定
        const modeToRender = (window.innerWidth > 767) ? 'grid' : currentDisplayMode; // PCではグリッド固定、スマホでは現在の選択

        renderProducts(filteredProducts, modeToRender);
    }

    // ページタイトルを更新する関数
    function updatePageTitle() {
        let enTitle = "PRODUCTS LIST";
        let jaTitle = "( 商品一覧 )";

        // 最も優先度の高いタイトル設定: ランキング順かつフィルターなしの場合
        if (currentSortOrder === 'ranking' && currentFilters.tags.length === 0 && 
            (currentFilters.categories.length === 0 || (currentFilters.categories.length === 1 && currentFilters.categories.includes('すべて')))) {
            enTitle = "RANKING";
            jaTitle = "( ランキング一覧 )";
        }
        // 次にタグフィルターが適用されている場合
        else if (currentFilters.tags.length === 1) {
            const selectedTag = currentFilters.tags[0];
            switch (selectedTag) {
                case '初心者向け':
                    enTitle = "FOR BEGINNERS";
                    jaTitle = "( 初めての方へおすすめの一杯 )";
                    break;
                case '甘口':
                    enTitle = "SWEET SELECTION";
                    jaTitle = "( 甘口一覧 )";
                    break;
                case '辛口':
                    enTitle = "DRY SELECTION";
                    jaTitle = "( 辛口一覧 )";
                    break;
                case '度数低め':
                    enTitle = "LOW ALCOHOL";
                    jaTitle = "( 度数低め一覧 )";
                    break;
                case '度数高め':
                    enTitle = "HIGH ALCOHOL";
                    jaTitle = "( 度数高め一覧 )";
                    break;
                case '新発売':
                    enTitle = "NEW ARRIVALS";
                    jaTitle = "( 新発売商品 )";
                    break;
                default:
                    enTitle = `${selectedTag.toUpperCase()} LIST`;
                    jaTitle = `( ${selectedTag}一覧 )`;
                    break;
            }
        }
        // 次にカテゴリフィルターが適用されている場合 (「すべて」以外)
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
        // その他の場合 (複数選択、またはデフォルトの「すべて」でランキング以外のソート)
        else {
            enTitle = "PRODUCTS LIST";
            jaTitle = "( 商品一覧 )";
        }

        pageTitleEn.textContent = enTitle;
        pageTitleJa.textContent = jaTitle;
    }

    // フィルターボタンクリック時の処理
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

    // ソートボタンクリック時の処理
    sortButton.addEventListener('click', () => {
        // ソートパネルを開くときに、現在のソート状態をラジオボタンに反映
        document.querySelector(`#sort-overlay input[name="sort_order"][value="${currentSortOrder}"]`).checked = true;
        sortOverlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
    });

    // フィルターパネルの閉じるボタン
    filterCloseButton.addEventListener('click', () => {
        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    });

    // ソートパネルの閉じるボタン
    sortCloseButton.addEventListener('click', () => {
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    });

    // フィルター適用ボタン
    applyFilterButton.addEventListener('click', () => {
        currentFilters.categories = [];
        currentFilters.tags = [];

        document.querySelectorAll('#filter-overlay input[name="category"]:checked').forEach(checkbox => {
            currentFilters.categories.push(checkbox.value);
        });
        document.querySelectorAll('#filter-overlay input[name="tag"]:checked').forEach(checkbox => {
            currentFilters.tags.push(checkbox.value);
        });

        if (currentFilters.categories.length === 0 || (currentFilters.categories.length > 0 && currentFilters.categories.includes('すべて'))) {
            currentFilters.categories = ['すべて'];
            document.querySelectorAll('#filter-overlay input[name="category"]').forEach(checkbox => {
                if (checkbox.value !== 'すべて') {
                    checkbox.checked = false;
                } else {
                    checkbox.checked = true;
                }
            });
        }
        
        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort();
    });

    // ソート適用ボタン
    applySortButton.addEventListener('click', () => {
        currentSortOrder = document.querySelector('#sort-overlay input[name="sort_order"]:checked').value;
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort();
    });

    // 表示モードボタン（グリッド）
    displayGridButton.addEventListener('click', () => {
        displayGridButton.classList.add('active');
        displayListButton.classList.remove('active');
        currentDisplayMode = 'grid'; // 表示モードを更新
        applyFiltersAndSort();
    });

    // 表示モードボタン（リスト）
    displayListButton.addEventListener('click', () => {
        displayListButton.classList.add('active');
        displayGridButton.classList.remove('active');
        currentDisplayMode = 'list'; // 表示モードを更新
        applyFiltersAndSort();
    });

    // 初期表示モードを決定
    // PCでは常にグリッドがデフォルトになるため、ボタンのアクティブ状態は初期化時に調整
    if (window.innerWidth > 767) { // PCの場合
        displayGridButton.classList.add('active');
        displayListButton.classList.remove('active');
        currentDisplayMode = 'grid'; // PCなので常にグリッド
    } else { // スマホの場合
        displayListButton.classList.add('active'); // スマホの初期はリストに設定
        displayGridButton.classList.remove('active');
        currentDisplayMode = 'list'; // スマホなのでリスト表示
    }

    // URLパラメータに基づく初期フィルター/ソートのUI同期は変更なし
    if (queryParams.category) {
        const categoryCheckbox = document.querySelector(`#filter-overlay input[name="category"][value="${queryParams.category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            const allCategoryCheckbox = document.querySelector('#filter-overlay input[name="category"][value="すべて"]');
            if (allCategoryCheckbox) allCategoryCheckbox.checked = false;
        }
    } else if (queryParams.tag) {
        const tagCheckbox = document.querySelector(`#filter-overlay input[name="tag"][value="${queryParams.tag}"]`);
        if (tagCheckbox) {
            tagCheckbox.checked = true;
        }
    } else {
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
        const defaultSortRadio = document.querySelector(`#sort-overlay input[name="sort_order"][value="ranking"]`);
        if (defaultSortRadio) {
            defaultSortRadio.checked = true;
        }
    }

    // ウィンドウのリサイズ時に適用されるロジックを追加し、表示モードを調整
    window.addEventListener('resize', () => {
        applyFiltersAndSort();
        // リサイズ時にPC/スマホの切り替えでボタンのアクティブ状態も調整
        if (window.innerWidth > 767) {
            displayGridButton.classList.add('active');
            displayListButton.classList.remove('active');
            currentDisplayMode = 'grid'; // PCになったらグリッドに強制
        } else {
            // スマホの場合、現在のcurrentDisplayModeを維持 (ボタンクリックで切り替わった状態)
            if (currentDisplayMode === 'grid') {
                displayGridButton.classList.add('active');
                displayListButton.classList.remove('active');
            } else {
                displayListButton.classList.add('active');
                displayGridButton.classList.remove('active');
            }
        }
    });

    applyFiltersAndSort(); // 初期表示
});