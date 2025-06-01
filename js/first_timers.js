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
        toggle.addEventListener('click', function() {
            this.classList.toggle('is-open');
            const subList = this.querySelector('.sp-menu__sub-list');
            if (subList) {
                subList.classList.toggle('is-open');
            }
        });
    });

    // --- 商品リスト表示ロジック (ranking.jsから移植) ---
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

    // Sample product data (ranking.jsと共通)
    let products = [
        {
            id: 1,
            name: 'ベリーベリーカシス',
            image: 'https://placehold.co/300x200/FFD700/000000?text=BerryCassis',
            volume: '200ml/720ml',
            price: 1750,
            tags: ['新発売', '甘口', '初心者向け'],
            category: 'カクテル',
            releaseDate: '2024-05-01',
            rankingScore: 100
        },
        {
            id: 2,
            name: 'イセボメ ロモヒート',
            image: 'https://placehold.co/300x200/ADD8E6/000000?text=Romohito',
            volume: '200ml/720ml',
            price: 1750,
            tags: ['販売再開', '辛口', '度数高め'],
            category: 'ハイボール',
            releaseDate: '2023-12-15',
            rankingScore: 90
        },
        {
            id: 3,
            name: 'イセカルダモンコーラ',
            image: 'https://placehold.co/300x200/90EE90/000000?text=CardamonCola',
            volume: '200ml/720ml',
            price: 1750,
            tags: ['おすすめ', '初心者向け', '度数低め'],
            category: 'ウイスキー',
            releaseDate: '2024-01-20',
            rankingScore: 95
        },
        {
            id: 4,
            name: 'フレッシュレモンソーダ',
            image: 'https://placehold.co/300x200/FFFF99/000000?text=LemonSoda',
            volume: '330ml',
            price: 1200,
            tags: ['新発売', '甘口'],
            category: 'カクテル',
            releaseDate: '2024-06-01',
            rankingScore: 80
        },
        {
            id: 5,
            name: '濃厚抹茶ラテ',
            image: 'https://placehold.co/300x200/C8E6C9/000000?text=MatchaLatte',
            volume: '500ml',
            price: 1500,
            tags: ['人気', '甘口'],
            category: 'ビール',
            releaseDate: '2023-09-10',
            rankingScore: 88
        },
        {
            id: 6,
            name: '季節の酵素ドリンク',
            image: 'https://placehold.co/300x200/FFB6C1/000000?text=EnzymeDrink',
            volume: '720ml',
            price: 2800,
            tags: ['健康', '初心者向け'],
            category: 'ワイン',
            releaseDate: '2023-07-05',
            rankingScore: 75
        },
        {
            id: 7,
            name: '純米大吟醸 華',
            image: 'https://placehold.co/300x200/F0F8FF/000000?text=Sake',
            volume: '720ml',
            price: 3500,
            tags: ['限定', '辛口'],
            category: '日本酒',
            releaseDate: '2024-03-10',
            rankingScore: 110
        },
        {
            id: 8,
            name: 'スモーキーシングルモルト',
            image: 'https://placehold.co/300x200/D3D3D3/000000?text=Whisky',
            volume: '700ml',
            price: 6000,
            tags: ['高級', '度数高め'],
            category: 'ウイスキー',
            releaseDate: '2023-11-01',
            rankingScore: 105
        }
    ];

    let currentFilters = {
        categories: [],
        tags: []
    };
    let currentSortOrder = 'ranking'; // Default sort order

    // Function to render product cards
    function renderProducts(productsToRender, displayMode) {
        productList.innerHTML = ''; // Clear existing products
        productList.className = displayMode === 'grid' ? 'product-grid' : 'product-list'; // Change class for list view

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Add 'list-item' class for list view
            if (displayMode === 'list') {
                productCard.classList.add('product-list-item');
            }

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}の画像" class="product-card__image">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__volume">${product.volume}</p>
                <p class="product-card__price">¥ ${product.price.toLocaleString()} <span>~ 【税込】</span></p>
                <span class="product-card__tag">${product.tags[0] || ''}</span>
            `;
            productList.appendChild(productCard);
        });
    }

    // Function to apply filters and sort
    function applyFiltersAndSort() {
        let filteredProducts = [...products]; // Start with all products

        // Apply category filters
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes('すべて')) {
            filteredProducts = filteredProducts.filter(product =>
                currentFilters.categories.includes(product.category)
            );
        }

        // Apply tag filters
        if (currentFilters.tags.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.tags.some(tag => currentFilters.tags.includes(tag))
            );
        }

        // Apply sorting
        if (currentSortOrder === 'newest') {
            filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (currentSortOrder === 'oldest') {
            filteredProducts.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        } else if (currentSortOrder === 'ranking') {
            filteredProducts.sort((a, b) => b.rankingScore - a.rankingScore);
        }

        // Determine current display mode
        const currentDisplayMode = displayGridButton.classList.contains('active') ? 'grid' : 'list';
        renderProducts(filteredProducts, currentDisplayMode);
    }

    // Event listeners for filter/sort buttons and overlays
    filterButton.addEventListener('click', () => {
        filterOverlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
    });

    sortButton.addEventListener('click', () => {
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

    // Event listener for applying filters
    applyFilterButton.addEventListener('click', () => {
        currentFilters.categories = [];
        currentFilters.tags = [];

        document.querySelectorAll('#filter-overlay input[name="category"]:checked').forEach(checkbox => {
            currentFilters.categories.push(checkbox.value);
        });
        document.querySelectorAll('#filter-overlay input[name="tag"]:checked').forEach(checkbox => {
            currentFilters.tags.push(checkbox.value);
        });

        filterOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort();
    });

    // Event listener for applying sort
    applySortButton.addEventListener('click', () => {
        currentSortOrder = document.querySelector('#sort-overlay input[name="sort_order"]:checked').value;
        sortOverlay.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        applyFiltersAndSort();
    });

    // Event listeners for display mode buttons
    displayGridButton.addEventListener('click', () => {
        displayGridButton.classList.add('active');
        displayListButton.classList.remove('active');
        productList.classList.remove('product-list');
        productList.classList.add('product-grid');
        applyFiltersAndSort(); // Re-render with new display mode
    });

    displayListButton.addEventListener('click', () => {
        displayListButton.classList.add('active');
        displayGridButton.classList.remove('active');
        productList.classList.remove('product-grid');
        productList.classList.add('product-list');
        applyFiltersAndSort(); // Re-render with new display mode
    });

    // Initial rendering of products
    applyFiltersAndSort();
});
