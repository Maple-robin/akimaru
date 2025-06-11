// checkout.js

document.addEventListener('DOMContentLoaded', function() {

    // --- ダミーデータ ---
    // 実際のアプリケーションでは、カートページから商品データを引き継ぐことになります
    const dummyProducts = [
        {
            id: 'product-1',
            name: '【販売再開】イセ ポメロモ ヒート',
            volume: '200ml',
            price: 1750,
            quantity: 2,
            imageUrl: '../img/gingerale.png' // 仮の画像パス
        },
        {
            id: 'product-2',
            name: 'クラフトビール詰め合わせ',
            volume: '6本入り',
            price: 3500,
            quantity: 1,
            imageUrl: 'https://placehold.co/60x60/EEF5FF/333333?text=BeerSet' // プレースホルダー画像
        }
    ];

    const TAX_RATE = 0.10; // 10% の税率として仮定

    // --- 要素の取得 ---
    const orderSummaryProductsContainer = document.getElementById('order-summary-products');
    const summarySubtotalElement = document.getElementById('summary-subtotal');
    const summaryShippingElement = document.getElementById('summary-shipping');
    const summaryTaxElement = document.getElementById('summary-tax');
    const summaryTotalElement = document.getElementById('summary-total');
    const shippingMethodRadios = document.querySelectorAll('input[name="shipping-method"]');
    const billingSameAsShippingCheckbox = document.getElementById('billing-same-as-shipping');
    const billingAddressFields = document.querySelector('.billing-address-fields');
    const applyDiscountButton = document.getElementById('apply-discount');
    const discountInput = document.getElementById('discount-input');
    const placeOrderButton = document.getElementById('place-order-button');
    const emailInput = document.getElementById('email');
    const countrySelect = document.getElementById('country');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const prefectureSelect = document.getElementById('prefecture');
    const zipCodeInput = document.getElementById('zip-code');
    const phoneInput = document.getElementById('phone');


    // --- 関数定義 ---

    /**
     * 注文概要に商品リストをレンダリングする
     */
    function renderOrderSummary() {
        if (!orderSummaryProductsContainer) return;

        orderSummaryProductsContainer.innerHTML = ''; // 既存の内容をクリア

        dummyProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('order-product-item');

            productItem.innerHTML = `
                <div class="order-product-item__image">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <span class="order-product-item__quantity-badge">${product.quantity}</span>
                </div>
                <div class="order-product-item__details">
                    <p class="order-product-item__name">${product.name}</p>
                    <p class="order-product-item__volume">${product.volume}</p>
                </div>
                <div class="order-product-item__price">¥ ${(product.price * product.quantity).toLocaleString()}</div>
            `;
            orderSummaryProductsContainer.appendChild(productItem);
        });
    }

    /**
     * 価格の合計を計算し、表示を更新する
     */
    function updatePriceSummary() {
        let subtotal = dummyProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        let shippingCost = 0;
        let tax = 0;
        let total = 0;

        // 選択されている配送方法の送料を取得
        const selectedShippingMethod = document.querySelector('input[name="shipping-method"]:checked');
        if (selectedShippingMethod) {
            shippingCost = parseFloat(selectedShippingMethod.dataset.price || 0);
        }

        // 税金を計算（小計 + 送料に対して）
        tax = (subtotal + shippingCost) * TAX_RATE;
        total = subtotal + shippingCost + tax;

        // モバイル版のサマリー要素を更新
        const summaryTotalMobile = document.getElementById('summary-total-mobile');
        const summarySubtotalMobileContent = document.getElementById('summary-subtotal-mobile-content');
        const summaryShippingMobileContent = document.getElementById('summary-shipping-mobile-content');
        const summaryTotalMobileContentFinal = document.getElementById('summary-total-mobile-content-final');
        const summaryTaxInfoMobile = document.getElementById('summary-tax-info');

        if (summaryTotalMobile) summaryTotalMobile.textContent = `¥ ${Math.round(total).toLocaleString()}`;
        if (summarySubtotalMobileContent) summarySubtotalMobileContent.textContent = `¥ ${subtotal.toLocaleString()}`;
        if (summaryShippingMobileContent) summaryShippingMobileContent.textContent = `¥ ${shippingCost.toLocaleString()}`;
        if (summaryTotalMobileContentFinal) summaryTotalMobileContentFinal.textContent = `¥ ${Math.round(total).toLocaleString()} JPY`;
        if (summaryTaxInfoMobile) summaryTaxInfoMobile.textContent = `¥ ${Math.round(tax).toLocaleString()} の税金を含む`;

        // PC版のサマリー要素を更新
        const summarySubtotalPc = document.getElementById('summary-subtotal-pc');
        const summaryShippingPc = document.getElementById('summary-shipping-pc');
        const summaryTotalPc = document.getElementById('summary-total-pc');
        const summaryTaxInfoPc = document.getElementById('summary-tax-info-pc');

        if (summarySubtotalPc) summarySubtotalPc.textContent = `¥ ${subtotal.toLocaleString()}`;
        if (summaryShippingPc) summaryShippingPc.textContent = `¥ ${shippingCost.toLocaleString()}`;
        if (summaryTotalPc) summaryTotalPc.textContent = `¥ ${Math.round(total).toLocaleString()} JPY`;
        if (summaryTaxInfoPc) summaryTaxInfoPc.textContent = `¥ ${Math.round(tax).toLocaleString()} の税金を含む`;
    }


    /**
     * 請求先住所フィールドの表示/非表示を切り替える
     */
    function toggleBillingAddressFields() {
        if (billingSameAsShippingCheckbox && billingAddressFields) {
            if (billingSameAsShippingCheckbox.checked) {
                billingAddressFields.classList.add('hidden');
                // 非表示時は必須属性を解除
                billingAddressFields.querySelectorAll('input, select').forEach(field => {
                    field.removeAttribute('required');
                });
            } else {
                billingAddressFields.classList.remove('hidden');
                // 表示時は必須属性を設定
                billingAddressFields.querySelectorAll('input:not([placeholder*="任意"]), select').forEach(field => {
                    field.setAttribute('required', 'required');
                });
            }
        }
    }

    /**
     * フォームのバリデーションを行う (簡易版)
     * @returns {boolean} バリデーションが成功したかどうか
     */
    function validateForm() {
        let isValid = true;
        const requiredFields = [
            emailInput, countrySelect, firstNameInput, lastNameInput,
            addressInput, cityInput, prefectureSelect, zipCodeInput, phoneInput
        ];

        requiredFields.forEach(field => {
            if (field && !field.value.trim()) {
                field.style.borderColor = 'red'; // エラー表示
                isValid = false;
            } else if (field) {
                field.style.borderColor = '#ddd'; // 通常の状態に戻す
            }
        });

        // 請求先住所が異なる場合にのみ、そのフィールドもバリデート
        if (billingSameAsShippingCheckbox && !billingSameAsShippingCheckbox.checked) {
            const billingRequiredFields = billingAddressFields.querySelectorAll('input[required], select[required]');
            billingRequiredFields.forEach(field => {
                if (field && !field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else if (field) {
                    field.style.borderColor = '#ddd';
                }
            });
        }

        if (!isValid) {
            // エラーメッセージをユーザーに表示する代替手段を検討してください
            // 例: カスタムモーダル、フォーム内のエラーメッセージ
            console.error('必要な情報が入力されていません。');
            // カスタムモーダル表示の例:
            // showCustomModal('入力エラー', 'すべての必須項目を入力してください。');
        }
        return isValid;
    }

    /**
     * モバイル版注文概要の展開/折りたたみ機能
     */
    function setupMobileOrderSummaryToggle() {
        const toggleButton = document.querySelector('.order-summary-toggle');
        const summaryContent = document.querySelector('.order-summary-content');

        if (toggleButton && summaryContent) {
            toggleButton.addEventListener('click', function() {
                summaryContent.classList.toggle('hidden');
                toggleButton.classList.toggle('expanded');
            });
        }
    }


    // --- イベントリスナー設定 ---

    // 注文概要の初期レンダリングと価格計算
    renderOrderSummary();
    updatePriceSummary();
    setupMobileOrderSummaryToggle(); // モバイル注文概要のトグル設定

    // 配送方法の変更を監視して価格を更新
    shippingMethodRadios.forEach(radio => {
        radio.addEventListener('change', updatePriceSummary);
    });

    // 請求先住所チェックボックスの変更を監視
    if (billingSameAsShippingCheckbox) {
        billingSameAsShippingCheckbox.addEventListener('change', toggleBillingAddressFields);
        toggleBillingAddressFields(); // ページロード時にも一度実行
    }

    // 割引コード適用ボタンのクリックイベント
    // モバイル用とPC用の両方に対応
    const discountInputMobile = document.getElementById('discount-input');
    const applyDiscountButtonMobile = document.getElementById('apply-discount');
    const discountInputPc = document.getElementById('discount-input-pc');
    const applyDiscountButtonPc = document.getElementById('apply-discount-pc');

    function applyDiscountHandler(inputElement) {
        const code = inputElement ? inputElement.value.trim() : '';
        if (code) {
            console.log(`割引コード "${code}" を適用しようとしました。`);
            // ここに実際の割引ロジック（サーバーサイド連携など）を追加します
            // 例: 割引が適用されたら updatePriceSummary(); を呼び出す
            // ダミーで割引を適用する例 (実際のアプリではAPIから割引額を取得)
            // if (code === 'SAVE10') {
            //     dummyProducts[0].price = dummyProducts[0].price * 0.9; // 例として10%割引
            //     renderOrderSummary();
            //     updatePriceSummary();
            // } else {
            //    showCustomModal('エラー', '無効なクーポンコードです。');
            // }
        } else {
            console.log('割引コードを入力してください。');
            // showCustomModal('お知らせ', '割引コードを入力してください。');
        }
    }

    if (applyDiscountButtonMobile) {
        applyDiscountButtonMobile.addEventListener('click', () => applyDiscountHandler(discountInputMobile));
    }
    if (applyDiscountButtonPc) {
        applyDiscountButtonPc.addEventListener('click', () => applyDiscountHandler(discountInputPc));
    }

    // 今すぐ支払うボタンのクリックイベント
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function(event) {
            event.preventDefault(); // デフォルトのフォーム送信を防止

            if (validateForm()) {
                console.log('フォームは有効です。注文処理に進みます。');
                // ここに実際の決済処理ロジック（サーバーサイド連携など）を追加します
                // 例: fetch('/api/process-payment', { method: 'POST', body: JSON.stringify(formData) })
                // window.location.href = 'confirmation.html'; // 決済成功後のページ遷移
                window.location.href = 'thanks.html';
            } else {
                console.log('入力情報に誤りがあります。');
            }
        });
    }

    // 都道府県のプルダウンメニューに日本の都道府県を追加する（例）
    function populatePrefectures(selectElementId) {
        const selectElement = document.getElementById(selectElementId);
        if (!selectElement) return;

        const prefectures = [
            "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
            "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
            "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
            "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
            "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
            "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
            "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
        ];

        // 既存の「都道府県」オプションを残しつつ、それ以外のオプションを追加
        const defaultOption = selectElement.querySelector('option[value=""]');
        if (defaultOption) {
            // defaultOptionを移動させず、ループで追加
        } else {
            const defaultPrefOption = document.createElement('option');
            defaultPrefOption.value = "";
            defaultPrefOption.textContent = "都道府県";
            selectElement.appendChild(defaultPrefOption);
        }

        prefectures.forEach(pref => {
            const option = document.createElement('option');
            option.value = pref;
            option.textContent = pref;
            selectElement.appendChild(option);
        });
    }

    populatePrefectures('prefecture');
    populatePrefectures('billing-prefecture');

    // PC版の注文概要にも商品をレンダリング
    const orderSummaryProductsPcContainer = document.getElementById('order-summary-products-pc');
    if (orderSummaryProductsPcContainer) {
        dummyProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('order-product-item');
            productItem.innerHTML = `
                <div class="order-product-item__image">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <span class="order-product-item__quantity-badge">${product.quantity}</span>
                </div>
                <div class="order-product-item__details">
                    <p class="order-product-item__name">${product.name}</p>
                    <p class="order-product-item__volume">${product.volume}</p>
                </div>
                <div class="order-product-item__price">¥ ${(product.price * product.quantity).toLocaleString()}</div>
            `;
            orderSummaryProductsPcContainer.appendChild(productItem);
        });
    }

    // ヘルプアイコンのツールチップ（簡易版）
    document.querySelectorAll('.help-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            // ここにカスタムモーダルやツールチップを表示するロジックを追加
            // alert('この電話番号は、注文に関するご連絡やShop Payでのアカウント作成に使用されます。');
            console.log('ヘルプアイコンがクリックされました。');
            // カスタムモーダル表示の例:
            // showCustomModal('携帯電話について', 'この電話番号は、注文に関するご連絡やShop Payでのアカウント作成に使用されます。');
        });
    });

    // 「Shopアカウントを使用して次回の購入のために情報を保存する」チェックボックスの機能
    const saveInfoShopAccountCheckbox = document.getElementById('save-info-shop-account');
    const phoneSaveGroup = document.querySelector('.phone-save-group');

    if (saveInfoShopAccountCheckbox && phoneSaveGroup) {
        saveInfoShopAccountCheckbox.addEventListener('change', function() {
            if (this.checked) {
                phoneSaveGroup.classList.remove('hidden');
                phoneSaveGroup.querySelector('input').setAttribute('required', 'required');
            } else {
                phoneSaveGroup.classList.add('hidden');
                phoneSaveGroup.querySelector('input').removeAttribute('required');
            }
        });
        // 初期状態を設定
        if (saveInfoShopAccountCheckbox.checked) {
            phoneSaveGroup.classList.remove('hidden');
            phoneSaveGroup.querySelector('input').setAttribute('required', 'required');
        }
    }

    // 支払い方法のラジオボタン切り替え
    const paymentOptions = document.querySelectorAll('input[name="payment-option"]');
    const creditCardFormDetails = document.querySelector('.card-form-details');
    const paypalOptionHeader = document.querySelector('.payment-option-paypal');
    const creditCardHeader = document.querySelector('.payment-option-header'); // 新しく追加したラジオボタン部分

    paymentOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardFormDetails.style.display = 'block';
                creditCardHeader.style.backgroundColor = '#fff';
                paypalOptionHeader.style.backgroundColor = '#f8f8f8';
            } else {
                creditCardFormDetails.style.display = 'none';
                creditCardHeader.style.backgroundColor = '#f8f8f8';
                paypalOptionHeader.style.backgroundColor = '#fff';
            }
        });
    });

    // 初期ロード時の支払い方法表示設定
    const initialCheckedPaymentOption = document.querySelector('input[name="payment-option"]:checked');
    if (initialCheckedPaymentOption) {
        if (initialCheckedPaymentOption.value === 'credit-card') {
            if (creditCardFormDetails) creditCardFormDetails.style.display = 'block';
            if (creditCardHeader) creditCardHeader.style.backgroundColor = '#fff';
            if (paypalOptionHeader) paypalOptionHeader.style.backgroundColor = '#f8f8f8';
        } else {
            if (creditCardFormDetails) creditCardFormDetails.style.display = 'none';
            if (creditCardHeader) creditCardHeader.style.backgroundColor = '#f8f8f8';
            if (paypalOptionHeader) paypalOptionHeader.style.backgroundColor = '#fff';
        }
    } else {
        // デフォルトでクレジットカードフォームを表示
        if (creditCardFormDetails) creditCardFormDetails.style.display = 'block';
        if (creditCardHeader) creditCardHeader.style.backgroundColor = '#fff';
        if (paypalOptionHeader) paypalOptionHeader.style.backgroundColor = '#f8f8f8';
        // クレジットカードラジオボタンをチェックする
        const creditCardRadio = document.getElementById('credit-card-radio');
        if (creditCardRadio) creditCardRadio.checked = true;
    }

    // 郵便番号から住所自動入力（zipcloud API利用）
    function fetchAddressByZip(zip, callback) {
        const cleanZip = zip.replace(/-/g, '');
        if (!/^\d{7}$/.test(cleanZip)) {
            callback(null);
            return;
        }
        fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanZip}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.results && data.results[0]) {
                    const result = data.results[0];
                    // 都道府県、市区町村、町域を分割して返す
                    callback({
                        prefecture: result.address1 || '',
                        city: result.address2 || '',
                        address: result.address3 || ''
                    });
                } else {
                    callback(null);
                }
            })
            .catch(() => callback(null));
    }

    // 郵便番号・住所欄が存在する場合のみイベントを設定
    if (zipCodeInput && prefectureSelect && cityInput && addressInput) {
        zipCodeInput.addEventListener('blur', function() {
            const zip = zipCodeInput.value.trim();
            if (zip.length >= 7) {
                fetchAddressByZip(zip, function(addressObj) {
                    if (addressObj) {
                        // 都道府県
                        if (prefectureSelect) {
                            // セレクトボックスの場合
                            for (let i = 0; i < prefectureSelect.options.length; i++) {
                                if (prefectureSelect.options[i].value === addressObj.prefecture) {
                                    prefectureSelect.selectedIndex = i;
                                    break;
                                }
                            }
                        }
                        // 市区町村
                        if (cityInput) cityInput.value = addressObj.city;
                        // 町域・番地など
                        if (addressInput) addressInput.value = addressObj.address;
                    }
                });
            }
        });
    }

    // 請求先住所用（該当inputがある場合のみ）
    const billingZipInput = document.getElementById('billing-zip-code');
    const billingPrefectureSelect = document.getElementById('billing-prefecture');
    const billingCityInput = document.getElementById('billing-city');
    const billingAddressInput = document.getElementById('billing-address');
    if (billingZipInput && billingPrefectureSelect && billingCityInput && billingAddressInput) {
        billingZipInput.addEventListener('blur', function() {
            const zip = billingZipInput.value.trim();
            if (zip.length >= 7) {
                fetchAddressByZip(zip, function(addressObj) { // ←ここを修正
                    if (addressObj) {
                        for (let i = 0; i < billingPrefectureSelect.options.length; i++) {
                            if (billingPrefectureSelect.options[i].value === addressObj.prefecture) {
                                billingPrefectureSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                    if (billingCityInput) billingCityInput.value = addressObj.city;
                    if (billingAddressInput) billingAddressInput.value = addressObj.address;
                });
            }
        });
    }
});
