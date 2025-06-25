document.addEventListener('DOMContentLoaded', function () {

    // --- 1. 商品データの拡充（プレビュー用ダミーデータ） ---
    // 実際には、商品一覧ページから渡されたIDに基づいて、サーバーから商品データを取得します。
    // ここでは、URLのクエリパラメータから商品IDを取得し、それに合わせてダミーデータを表示します。
    const dummyProducts = {        '1': {
            id: '1',
            name: '純米大吟醸 麗し乃雫',
            category: '日本酒',
            company: '三重酒造株式会社',
            catchcopy: '伊勢の豊かな水と厳選米が織りなす、<br>芳醇な香りと透明感のある味わい。',
            price: '5,800',
            tags: ['華やか', 'ギフト', '純米大吟醸'],
            mainImage: '../img/gingerale.png',
            thumbnails: [
                '../img/gingerale.png',
                '../img/osake.png',
                '../img/sake.png',
                '../img/gingerale.png'
            ],
            description: `三重県伊勢志摩地方の豊かな自然で育まれた上質な米と、清らかな伏流水から生まれた純米大吟醸です。口に含むと広がる華やかな香りと、きめ細やかな口当たりが特徴。料理との相性も抜群で、食中酒としてもお楽しみいただけます。大切な方への贈り物にも最適です。
            <br><br>内容量：720ml<br>アルコール度数：15度<br>特定名称：純米大吟醸`,
            drinkMethod: `「純米大吟醸 麗し乃雫」を最大限に楽しむためには、冷酒でお召し上がりいただくのがおすすめです。特に、ワイングラスを使用することで、華やかな吟醸香がより一層引き立ちます。
            <br><br>食事とのペアリングでは、白身魚の刺身や軽めの和食と相性抜群です。また、チーズやナッツなどの洋風のおつまみともよく合います。特別な日の乾杯酒としても最適です。
            <br><br>冷蔵庫でしっかり冷やした後、グラスに注ぎ、ゆっくりと香りを楽しみながら味わってください。温度が少し上がると、米の旨味がさらに引き立つので、温度変化も楽しめます。`
        },        '2': {
            id: '2',
            name: '果実酒 桃源郷の誘い',
            category: '梅酒',
            company: '伊勢フルーツワイナリー',
            catchcopy: '甘くフルーティーな香りが特徴。<br>デザート感覚で楽しめる一杯。',
            price: '3,200',
            tags: ['果実酒', '甘口', '女子会'],
            mainImage: '../img/osake.png',
            thumbnails: [
                '../img/osake.png',
                '../img/sake.png',
                '../img/gingerale.png'
            ],
            description: `国産の新鮮な桃を贅沢に使用した、芳醇な香りとまろやかな甘みが特徴の果実酒です。食前酒やデザートワインとして、またロックやソーダ割りでも美味しくお楽しみいただけます。<br><br>内容量：500ml<br>アルコール度数：8度`,
            drinkMethod: `冷やしてストレートで、またはロックで。ソーダで割ると、より一層爽やかな味わいが楽しめます。カクテルのベースとしてもおすすめです。`
        },        '3': {
            id: '3',
            name: 'スパークリングワイン 煌',
            category: 'ワイン',
            company: '志摩ワイナリー株式会社',
            catchcopy: '繊細な泡立ちとフルーティーな香り。<br>パーティーシーンを華やかに彩る一本。',
            price: '4,500',
            tags: ['ワイン', 'スパークリング', 'パーティー'],
            mainImage: '../img/sake.png',
            thumbnails: [
                '../img/sake.png',
                '../img/gingerale.png',
                '../img/osake.png'
            ],
            description: `シャルドネ種を主体に醸造された、きめ細やかな泡立ちが特徴の辛口スパークリングワインです。フレッシュな果実味と、かすかに感じられるトーストの香りが絶妙なハーモニーを奏でます。`,
            drinkMethod: `よく冷やしてお召し上がりください。食前酒としてはもちろん、魚介類や軽めのチーズとの相性も抜群です。`
        },        '4': {
            id: '4',
            name: 'サントリー ほろよい',
            category: '缶チューハイ',
            company: 'サントリー株式会社',
            catchcopy: 'やさしい甘さとアルコール3%。<br>シーンを選ばず楽しめる、軽やかな味わい。',
            price: '200',
            tags: ['低アルコール', 'お手軽', '家飲み'],
            mainImage: '../img/chuhai.png',
            thumbnails: [
                '../img/chuhai.png',
                '../img/gingerale.png',
                '../img/osake.png'
            ],
            description: `アルコール度数3%で、お酒があまり得意でない方にも飲みやすいフレーバーです。様々なフレーバーがあり、気軽に選んで楽しめます。`,
            drinkMethod: `冷やしてそのままお召し上がりください。氷を加えても美味しいです。`
        }
    };

    // --- 各HTML要素の参照を取得（初回取得） ---
    const productSelect = document.getElementById('product-select');
    const previewContentArea = document.getElementById('preview-content-area'); // プレビューコンテンツ全体を囲むdiv

    let pairedSwiperInstance = null; // Swiperインスタンスを保持する変数

    // --- 各機能の初期化関数群 ---
    // DOMが動的に生成されるたびにこれらの関数を呼び出す
    function initProductGallery() {
        const mainImg = document.querySelector('#preview-content-area .product-gallery__main img');
        const thumbsContainer = document.querySelector('#preview-content-area .product-gallery__thumbnails');

        // イベントリスナーは親要素に一度設定すれば、子要素が動的に変わっても機能する（イベント委譲）
        // ただし、renderProductPreviewでinnerHTMLを更新するため、毎回再設定が必要
        // そこで、innerHTML更新後に改めてイベントリスナーを設定し直す
        if (thumbsContainer && mainImg) {
            // イベントリスナーの重複を防ぐために、元の要素をクローンして置き換え
            const newThumbsContainer = thumbsContainer.cloneNode(true);
            thumbsContainer.parentNode.replaceChild(newThumbsContainer, thumbsContainer);

            newThumbsContainer.addEventListener('click', function(event) {
                const clickedThumb = event.target.closest('img');
                if (clickedThumb && newThumbsContainer.contains(clickedThumb)) {
                    mainImg.src = clickedThumb.src;
                    mainImg.alt = clickedThumb.alt;
                    Array.from(newThumbsContainer.children).forEach(t => t.classList.remove('is-active'));
                    clickedThumb.classList.add('is-active');
                }
            });
        }
    }

    function initAccordions() {
        const accordionItems = document.querySelectorAll('#preview-content-area .product-accordion-item');
        accordionItems.forEach(item => {
            const title = item.querySelector('.product-accordion-item__title');
            const content = item.querySelector('.product-accordion-item__content');

            // イベントリスナーの重複を防ぐため、元の要素をクローンして置き換え
            const newTitle = title.cloneNode(true);
            title.parentNode.replaceChild(newTitle, title);

            // 初期状態で閉じる
            item.classList.add('is-closed');
            content.style.height = '0px'; // CSSのpaddingを残したため、初期高さを0pxに
            content.style.overflow = 'hidden';
            content.style.transition = 'height 0.3s ease-out'; // paddingアニメーションはCSSで残したpadding-top, padding-bottomがあるのでJSからは削除

            newTitle.addEventListener('click', () => {
                item.classList.toggle('is-closed');
                if (item.classList.contains('is-closed')) {
                    content.style.height = '0px';
                } else {
                    // contentのpaddingを考慮してscrollHeightを正確に取得するため、一度heightをautoにしてからscrollHeightを取得
                    // しかし、CSSにpaddingが定義されているため、それを考慮したscrollHeightを取得するために
                    // 一度heightを'auto'に設定し、その直後にscrollHeightを取得するのが確実。
                    // その後、元のheightがtransitionによって0からscrollHeightになるように設定。
                    content.style.height = 'auto'; // 一時的にautoにして実寸を計算
                    const scrollHeight = content.scrollHeight; // contentのパディング込みの高さ
                    content.style.height = '0px'; // 再び0に戻してアニメーション開始
                    // requestAnimationFrameでDOMの状態が更新されてからheightを設定することで、transitionが効く
                    requestAnimationFrame(() => {
                        content.style.height = scrollHeight + 'px';
                    });
                }
            });
        });
    }

    function initQuantityControls() {
        const quantityMinusBtn = document.querySelector('#preview-content-area .product-quantity-controls .quantity-minus');
        const quantityPlusBtn = document.querySelector('#preview-content-area .product-quantity-controls .quantity-plus');
        const quantityInput = document.querySelector('#preview-content-area .product-quantity-controls .quantity-input');

        if (quantityMinusBtn && quantityPlusBtn && quantityInput) {
            // イベントリスナーの重複を防ぐため、クローンと置換
            const oldMinusBtn = quantityMinusBtn.cloneNode(true);
            const oldPlusBtn = quantityPlusBtn.cloneNode(true);
            const oldInput = quantityInput.cloneNode(true);

            quantityMinusBtn.parentNode.replaceChild(oldMinusBtn, quantityMinusBtn);
            quantityPlusBtn.parentNode.replaceChild(oldPlusBtn, quantityPlusBtn);
            quantityInput.parentNode.replaceChild(oldInput, quantityInput);

            oldMinusBtn.addEventListener('click', function () {
                let quantity = parseInt(oldInput.value);
                if (quantity > 1) {
                    oldInput.value = quantity - 1;
                }
            });
            oldPlusBtn.addEventListener('click', function () {
                let quantity = parseInt(oldInput.value);
                oldInput.value = quantity + 1;
            });
            oldInput.addEventListener('change', function () {
                let quantity = parseInt(this.value);
                if (isNaN(quantity) || quantity < 1) {
                    this.value = 1;
                }
            });
        }
    }

    function initFavoriteButton() {
        const favoriteBtn = document.querySelector('#preview-content-area .btn-favorite');
        if (favoriteBtn) {
            // イベントリスナーの重複を防ぐため、クローンと置換
            const oldFavoriteBtn = favoriteBtn.cloneNode(true);
            favoriteBtn.parentNode.replaceChild(oldFavoriteBtn, favoriteBtn);

            oldFavoriteBtn.addEventListener('click', function () {
                this.classList.toggle('is-favorited');
                const icon = this.querySelector('i');
                const favoriteTextSpan = this.querySelector('.favorite-text');
                if (this.classList.contains('is-favorited')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    if (favoriteTextSpan) {
                        favoriteTextSpan.textContent = 'お気に入り済み';
                    }
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    if (favoriteTextSpan) {
                        favoriteTextSpan.textContent = 'お気に入りに追加';
                    }
                }
            });
        }
    }

    function initSwiper() {
        // 既存のSwiperインスタンスがあれば破棄
        if (pairedSwiperInstance) {
            pairedSwiperInstance.destroy(true, true); // 既存インスタンスを完全に破棄
            pairedSwiperInstance = null;
        }

        const currentPairedSwiperElement = document.querySelector('#preview-content-area .paired-snacks-swiper');
        if (currentPairedSwiperElement) {
            pairedSwiperInstance = new Swiper(currentPairedSwiperElement, {
                slidesPerView: 1.2, // スマホ表示に合わせた枚数
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // PC向けのブレークポイントはプレビューがスマホ固定なので不要
                // breakpoints: {
                //     768: {
                //         slidesPerView: 3,
                //         spaceBetween: 30,
                //         centeredSlides: true,
                //     }
                // }
            });
        }
    }


    // --- プレビュー表示を更新するメイン関数 ---
    function renderProductPreview(product) {
        if (!product) {
            // 商品データがない場合、プレースホルダーを表示
            previewContentArea.innerHTML = `
                <div class="preview-placeholder-message">
                    <p><i class="fas fa-info-circle"></i> 上のプルダウンから商品を選択してください。</p>
                </div>
            `;
            // Swiperインスタンスが存在すれば破棄
            if (pairedSwiperInstance) {
                pairedSwiperInstance.destroy(true, true);
                pairedSwiperInstance = null;
            }
            return; // ここで処理を終了
        }

        // 商品データがある場合、プレビューコンテンツのHTMLを動的に生成して挿入
        previewContentArea.innerHTML = `
            <div class="product-detail-section__inner preview-mock-inner">
                <div class="product-detail-content">
                    <div class="product-gallery">
                        <div class="product-gallery__main">
                            <img id="preview-main-image" src="${product.mainImage}" alt="${product.name}">
                        </div>
                        <div class="product-gallery__thumbnails" id="preview-thumbnails">
                            </div>
                    </div>                    <div class="product-info">
                        <h2 class="product-info__name" id="preview-product-name">${product.name}</h2>
                        <p class="product-info__type" id="preview-product-category">${product.category}</p>
                        <p class="product-info__company">${product.company}</p>
                        <p class="product-info__catchcopy" id="preview-product-catchcopy">${product.catchcopy}</p>
                        <p class="product-info__price" id="preview-product-price">¥ ${product.price}<span>(税込)</span></p>
                        <p class="product-info__tax-note">※送料別途</p>

                        <div class="product-info__buttons">
                            <div class="product-quantity-add-to-cart">
                                <div class="product-quantity-controls">
                                    <button class="quantity-minus" data-id="product-detail-qty">-</button>
                                    <input type="number" class="quantity-input" value="1" min="1" data-id="product-detail-qty" readonly>
                                    <button class="quantity-plus" data-id="product-detail-qty">+</button>
                                </div>
                                <button id="add-to-cart-btn" class="btn-to-ec-site">
                                    カートに入れる
                                </button>
                            </div>
                            <div class="product-info__favorite">
                                <button class="btn-favorite">
                                    <i class="far fa-heart"></i> <span class="favorite-text">お気に入りに追加</span>
                                </button>
                            </div>
                        </div>

                        <ul class="product-info__tags" id="preview-product-tags">
                            </ul>
                    </div>
                </div>

                <div class="product-accordion-item is-closed">
                    <h3 class="product-accordion-item__title product-description__title">商品の特徴<span class="accordion-icon"></span></h3>
                    <div class="product-accordion-item__content">
                        <p>${product.description}</p>
                    </div>
                </div>

                <div class="product-accordion-item is-closed">
                    <h3 class="product-accordion-item__title product-description__title">おすすめの飲み方<span class="accordion-icon"></span></h3>
                    <div class="product-accordion-item__content">
                        <p>${product.drinkMethod}</p>
                    </div>
                </div>

                <div class="paired-snacks">
                    <h3 class="paired-snacks__title">相性のいいおつまみ</h3>
                    <div class="swiper paired-snacks-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="product-item">
                                    <a href="#">
                                        <div class="product-item__img-wrap">
                                            <img src="../img/otsumami1.jpg" alt="伊勢海老せんべい">
                                        </div>
                                        <h3 class="product-item__name">伊勢海老せんべい</h3>
                                        <p class="product-item__price">¥ 1,200<span>(税込)</span></p>
                                        <p class="product-item__tag">#海老 #香ばしい #お土産</p>
                                    </a>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="product-item">
                                    <a href="#">
                                        <div class="product-item__img-wrap">
                                            <img src="../img/otsumami2.jpg" alt="松阪牛しぐれ煮">
                                        </div>
                                        <h3 class="product-item__name">松阪牛しぐれ煮</h3>
                                        <p class="product-item__price">¥ 1,800<span>(税込)</span></p>
                                        <p class="product-item__tag">#牛肉 #濃厚 #ご飯のお供</p>
                                    </a>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="product-item">
                                    <a href="#">
                                        <div class="product-item__img-wrap">
                                            <img src="../img/otsumami3.jpg" alt="あおさ海苔の佃煮">
                                        </div>
                                        <h3 class="product-item__name">あおさ海苔の佃煮</h3>
                                        <p class="product-item__price">¥ 800<span>(税込)</span></p>
                                        <p class="product-item__tag">#海苔 #磯の香り #和食</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        `;

        // ★★★ HTML挿入後に必要な要素を再取得し、関連機能を再初期化する ★★★
        // タグの生成
        const currentPreviewProductTags = document.querySelector('#preview-content-area #preview-product-tags');
        if (currentPreviewProductTags) {
            currentPreviewProductTags.innerHTML = '';
            product.tags.forEach(tag => {
                const li = document.createElement('li');
                li.textContent = `#${tag}`;
                currentPreviewProductTags.appendChild(li);
            });
        }

        // サムネイルの生成
        const currentPreviewThumbnailsContainer = document.querySelector('#preview-content-area #preview-thumbnails');
        if (currentPreviewThumbnailsContainer) {
            currentPreviewThumbnailsContainer.innerHTML = '';
            product.thumbnails.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `${product.name} サムネイル${index + 1}`;
                if (index === 0) {
                    img.classList.add('is-active');
                }
                currentPreviewThumbnailsContainer.appendChild(img);
            });
        }
        
        // 各機能を再初期化
        initProductGallery(); // 画像切り替えのイベントリスナー（必要であれば）
        initAccordions(); // アコーディオンの再初期化
        initQuantityControls(); // 数量コントロールの再初期化
        initFavoriteButton(); // お気に入りボタンの再初期化
        initSwiper(); // Swiperの再初期化
    }

    // --- 2. プルダウンの初期化とオプションの動的生成 ---
    if (productSelect) {
        // オプションをクリア (念のため)
        productSelect.innerHTML = '<option value="">-- 商品を選択してください --</option>';

        for (const id in dummyProducts) {
            const product = dummyProducts[id];
            const option = document.createElement('option');
            option.value = id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        }

        // URLのクエリパラメータから商品IDを取得
        const urlParams = new URLSearchParams(window.location.search);
        let initialProductId = urlParams.get('id');

        // 初回表示する商品を選択
        if (initialProductId && dummyProducts[initialProductId]) {
            productSelect.value = initialProductId;
            renderProductPreview(dummyProducts[initialProductId]);
        } else {
            // IDがない、または無効な場合は、プルダウンを「商品を選択してください」にし、プレースホルダーを表示
            productSelect.value = ''; // プルダウンの選択をリセット
            renderProductPreview(null); // プレースホルダーを表示
        }

        // --- 3. プルダウン変更時のイベントリスナー ---
        productSelect.addEventListener('change', function () {
            const selectedProductId = this.value;
            const selectedProduct = dummyProducts[selectedProductId]; // 選択が空文字列の場合はundefinedになる
            renderProductPreview(selectedProduct);

            // URLを更新（ブラウザの履歴には追加しない）
            if (selectedProductId) {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('id', selectedProductId);
                window.history.replaceState({}, '', newUrl.toString());
            } else {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('id');
                window.history.replaceState({}, '', newUrl.toString());
            }
        });
    }

});