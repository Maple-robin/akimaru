// cart.js

document.addEventListener('DOMContentLoaded', function() {
    // カートアイテムの更新と合計金額の計算を行う関数
    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;

        cartItems.forEach(item => {
            const priceElement = item.querySelector('.cart-item__price');
            const quantityInput = item.querySelector('.quantity-input');

            // 価格から「¥」を取り除き、数値に変換
            const priceText = priceElement.textContent.replace('¥', '').trim();
            const price = parseFloat(priceText.replace(/,/g, '')); // カンマを削除して数値に変換

            const quantity = parseInt(quantityInput.value);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });

        // 合計金額を更新
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            // 画像に合わせて「JPY」表記に更新
            totalPriceElement.innerHTML = `¥ ${total.toLocaleString()}<span> JPY</span>`;
        }
    }

    // 数量変更ボタンのイベントリスナー設定
    document.querySelectorAll('.quantity-minus').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling; // 次の要素（input）を取得
            let quantity = parseInt(input.value);
            if (quantity > 1) {
                input.value = quantity - 1;
                updateCartSummary();
            }
        });
    });

    document.querySelectorAll('.quantity-plus').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling; // 前の要素（input）を取得
            let quantity = parseInt(input.value);
            input.value = quantity + 1;
            updateCartSummary();
        });
    });

    // 数量入力フィールドの変更イベントリスナー設定
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            // 負の数や非数値が入力された場合のバリデーション
            let quantity = parseInt(this.value);
            if (isNaN(quantity) || quantity < 1) {
                this.value = 1; // 最小値を1に設定
            }
            updateCartSummary();
        });
    });

    // 削除ボタンのイベントリスナー設定
    document.querySelectorAll('.cart-item__remove').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item'); // 親の.cart-item要素を取得
            if (cartItem) {
                // 削除確認のモーダルなどを表示することも可能ですが、今回は直接削除
                cartItem.remove();
                updateCartSummary(); // 削除後に合計金額を再計算
            }
        });
    });

    // ページロード時に初回合計金額を計算
    updateCartSummary();

    // 配送希望日カレンダーの初期設定
    const deliveryDateInput = document.getElementById('delivery-date');
    if (deliveryDateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;

        deliveryDateInput.setAttribute('min', minDate);
    }

    // 共通のハンバーガーメニューとSPメニューのJSがscript.jsにあるため、
    // cart.htmlでscript.jsを読み込むことで動作します。
    // ここではcart.js固有のロジックのみを記述します。
});
