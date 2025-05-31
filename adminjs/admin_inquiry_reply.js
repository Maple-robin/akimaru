document.addEventListener('DOMContentLoaded', function() {
    const inquiryTitleElem = document.getElementById('inquiry-title');
    const inquiryContentElem = document.getElementById('inquiry-content');
    const replyContentTextarea = document.getElementById('reply-content');
    const statusRepliedRadio = document.getElementById('status-replied');
    const statusPendingRadio = document.getElementById('status-pending');
    const submitReplyButton = document.getElementById('submit-reply-button');

    // Sample data for inquiries (in a real application, this would come from a database,
    // and the specific inquiry ID would likely be passed via URL parameters).
    const inquiries = [
        {
            id: 1,
            username: 'サンプル太郎',
            email: 'taro.sample@example.com',
            title: '商品に関するお問い合わせ',
            content: '〇〇ビールの在庫状況について教えてください。',
            status: 'pending' // 'pending' or 'replied'
        },
        {
            id: 2,
            username: '山田花子',
            email: 'hanako.yamada@example.com',
            title: 'アカウント登録について',
            content: 'パスワードを忘れてしまい、ログインできません。再設定方法を教えてください。',
            status: 'replied'
        },
        {
            id: 3,
            username: '田中一郎',
            email: 'ichiro.tanaka@example.com',
            title: 'サイトの不具合報告',
            content: '商品ページで画像が表示されない不具合があります。',
            status: 'pending'
        },
        {
            id: 4,
            username: '佐藤美咲',
            email: 'misaki.sato@example.com',
            title: 'コラボ企画の提案',
            content: '御社の商品とコラボレーション企画を提案したいのですが、担当者の方をご紹介いただけますでしょうか？',
            status: 'pending'
        },
        {
            id: 5,
            username: '鈴木健太',
            email: 'kenta.suzuki@example.com',
            title: '退会手続きについて',
            content: '退会したいのですが、手続き方法が分かりません。',
            status: 'replied'
        }
    ];

    // Simulate getting inquiry ID from URL (for demonstration, we'll use ID 1)
    // In a real application: const urlParams = new URLSearchParams(window.location.search);
    // const inquiryId = parseInt(urlParams.get('id'));
    const currentInquiryId = 1; // For demonstration, assume we are viewing inquiry with ID 1

    // Find the inquiry based on ID
    const currentInquiry = inquiries.find(inq => inq.id === currentInquiryId);

    if (currentInquiry) {
        // Populate inquiry details
        inquiryTitleElem.textContent = currentInquiry.title;
        inquiryContentElem.textContent = currentInquiry.content;

        // Set initial status of radio buttons
        if (currentInquiry.status === 'replied') {
            statusRepliedRadio.checked = true;
        } else {
            statusPendingRadio.checked = true;
        }
    } else {
        // Handle case where inquiry is not found
        inquiryTitleElem.textContent = 'お問い合わせが見つかりません。';
        inquiryContentElem.textContent = '指定されたお問い合わせIDのデータが見つかりませんでした。';
        replyContentTextarea.disabled = true;
        submitReplyButton.disabled = true;
        statusRepliedRadio.disabled = true;
        statusPendingRadio.disabled = true;
    }

    // Event listener for submitting the reply
    submitReplyButton.addEventListener('click', function() {
        const replyContent = replyContentTextarea.value;
        const newStatus = document.querySelector('input[name="status"]:checked').value;

        if (!currentInquiry) {
            alert('処理するお問い合わせが見つかりません。'); // Replace with custom message box
            return;
        }

        if (replyContent.trim() === '') {
            alert('返信内容を入力してください。'); // Replace with custom message box
            return;
        }

        // Simulate sending data to a server
        console.log('--- 返信を送信 ---');
        console.log(`お問い合わせID: ${currentInquiry.id}`);
        console.log(`返信内容: ${replyContent}`);
        console.log(`新しいステータス: ${newStatus}`);
        console.log('------------------');

        // In a real application, you would send an AJAX request (e.g., fetch API) here
        // to update the inquiry in the database.
        // After successful update, you might redirect or show a success message.

        alert('返信が送信され、ステータスが更新されました！'); // Replace with custom message box
        // Optionally, update the status in the local 'inquiries' array or redirect
        currentInquiry.status = newStatus;
    });
});
