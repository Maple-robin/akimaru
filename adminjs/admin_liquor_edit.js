// admin_liquor_edit.js
// お酒管理編集ページ固有のJavaScript

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('liquorEditForm');
    const productNameInput = document.getElementById('productName');
    const productImageInput = document.getElementById('productImage'); // input type="file"
    const previewThumb = document.getElementById('previewThumb');
    const productTypeSelect = document.getElementById('productType');
    const productCategorySelect = document.getElementById('productCategory');
    const productDescriptionTextarea = document.getElementById('productDescription');
    const productLinkInput = document.getElementById('productLink');
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');

    /**
     * メッセージボックスを表示する関数
     * @param {string} message - 表示するメッセージ
     * @param {boolean} isError - エラーメッセージかどうか (現在は使用していませんが、拡張性のため)
     */
    function showMessageBox(message, isError = false) {
        messageText.textContent = message;
        messageBox.classList.remove('hidden');
        // 必要であれば、isErrorに基づいてスタイルを変更するロジックを追加
    }

    /**
     * フォーム送信時の処理
     */
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防止

        // ここでフォームデータのバリデーションを行うことができます
        if (!productNameInput.value.trim()) {
            showMessageBox('商品名を入力してください。');
            return;
        }
        if (!productTypeSelect.value) {
            showMessageBox('種類を選択してください。');
            return;
        }
        if (!productCategorySelect.value) {
            showMessageBox('カテゴリを選択してください。');
            return;
        }

        // フォームデータを取得 (実際のアプリケーションではこれをサーバーに送信します)
        const liquorData = {
            productName: productNameInput.value,
            // 画像ファイルは直接送信せず、別途処理が必要です
            // ここではファイル名のみを保持する例
            productImageName: productImageInput.files[0] ? productImageInput.files[0].name : '',
            productType: productTypeSelect.value,
            productCategory: productCategorySelect.value,
            productDescription: productDescriptionTextarea.value,
            productLink: productLinkInput.value
        };

        console.log('保存するデータ:', liquorData);

        // 実際のアプリケーションでは、ここでAPI呼び出しなどを行います
        // 画像ファイルをサーバーにアップロードする場合は、FormDataを使用します。
        // 例:
        // const formData = new FormData(form); // フォーム全体をFormDataとして取得
        // fetch('/api/liquors/edit', { method: 'POST', body: formData })
        //     .then(response => response.json())
        //     .then(data => {
        //         showMessageBox('お酒の情報を保存しました！');
        //         // 成功後のリダイレクトなど
        //     })
        //     .catch(error => {
        //         console.error('保存エラー:', error);
        //         showMessageBox('保存中にエラーが発生しました。', true);
        //     });

        // デモとして成功メッセージを表示
        showMessageBox('お酒の情報を保存しました！');

        // フォームをリセットしたい場合は以下を使用
        // form.reset();
        // previewThumb.src = "https://placehold.co/100x100/E0E0E0/333333?text=No+Image";
    });

    /**
     * 画像ファイル入力時にプレビューを更新する処理
     */
    productImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // 選択されたファイルを取得
        if (file) {
            const reader = new FileReader(); // FileReaderオブジェクトを作成

            reader.onload = (e) => {
                // ファイルの読み込みが完了したら、プレビューのsrcを設定
                previewThumb.src = e.target.result;
            };

            reader.readAsDataURL(file); // ファイルをData URLとして読み込む
        } else {
            // ファイルが選択されていない場合、デフォルトのプレースホルダー画像に戻す
            previewThumb.src = "https://placehold.co/100x100/E0E0E0/333333?text=No+Image";
        }
    });

    /**
     * 初期データ読み込みのシミュレーション
     * 実際のアプリケーションでは、URLパラメータなどからIDを取得し、
     * そのIDに対応するお酒データをサーバーから取得してフォームに設定します。
     * ファイル入力はセキュリティ上の理由からJavaScriptで値を設定できないため、
     * プレビュー画像のみURLで設定します。
     */
    function loadLiquorData() {
        // デモデータ
        const demoData = {
            productName: '山崎シングルモルト',
            // ファイル入力ではURLを直接設定できないため、プレビュー用としてのみ使用
            productImageUrlForPreview: 'https://placehold.co/100x100/A0522D/FFFFFF?text=Whisky',
            productType: 'ウイスキー',
            productCategory: '甘口',
            productDescription: '日本を代表するシングルモルトウイスキー。華やかで芳醇な香りと、甘くなめらかな口当たりが特徴です。',
            productLink: 'https://www.suntory.co.jp/whisky/yamazaki/'
        };

        // フォームにデータを設定
        productNameInput.value = demoData.productName;
        // productImageInput.value = demoData.productImage; // ファイル入力には直接値を設定できない
        previewThumb.src = demoData.productImageUrlForPreview; // プレビューのみ更新
        productTypeSelect.value = demoData.productType;
        productCategorySelect.value = demoData.productCategory;
        productDescriptionTextarea.value = demoData.productDescription;
        productLinkInput.value = demoData.productLink;
    }

    // ページロード時にデモデータを読み込む
    loadLiquorData();
});
