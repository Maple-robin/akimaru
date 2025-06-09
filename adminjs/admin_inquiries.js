document.addEventListener('DOMContentLoaded', function() {
    const inquiryTableBody = document.getElementById('inquiry-management-table-body');

    // Sample data for inquiries (will be replaced by database data)
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

    // Function to render inquiries into the table
    function renderInquiries() {
        inquiryTableBody.innerHTML = ''; // Clear existing rows
        inquiries.forEach(inquiry => {
            const row = document.createElement('tr');
            const statusClass = inquiry.status === 'pending' ? 'status-pending' : 'status-replied';
            const statusText = inquiry.status === 'pending' ? '保留中' : '返信済み';

            row.innerHTML = `
                <td>${inquiry.username}</td>
                <td>${inquiry.email}</td>
                <td>${inquiry.title}</td>
                <td class="inquiry-content-cell" title="${inquiry.content}">${inquiry.content}</td>
                <td class="${statusClass}">${statusText}</td>
                <td><button class="reply-button" data-id="${inquiry.id}">返信ページへ</button></td>
            `;
            inquiryTableBody.appendChild(row);
        });

        // Add event listeners for reply buttons
        document.querySelectorAll('.reply-button').forEach(button => {
            button.addEventListener('click', function() {
                const inquiryId = this.dataset.id;
                // In a real application, this would navigate to a reply page or open a reply modal
                console.log(`Inquiry ID: ${inquiryId} の返信ページへ移動します。`);
                // 返信ページへ遷移（例: admin_inquiry_reply.html?id=問い合わせID）
                window.location.href = `admin_inquiry_reply.html?id=${encodeURIComponent(inquiryId)}`;
            });
        });
    }

    renderInquiries(); // Initial rendering of inquiries
});
