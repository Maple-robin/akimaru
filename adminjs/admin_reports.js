document.addEventListener('DOMContentLoaded', function() {
    const reportTableBody = document.getElementById('report-management-table-body');

    // Sample data for reports (will be replaced by database data)
    const reports = [
        {
            id: 1,
            reporterUsername: '通報太郎',
            postTitle: '今日の晩酌🍶',
            postContent: '新しく手に入れた日本酒「〇〇」を開栓！フルーティーで飲みやすかったです。肴はアジのたたきで完璧でした！',
            category: '不適切な内容',
            reportContent: 'この投稿には差別的な表現が含まれています。'
        },
        {
            id: 2,
            reporterUsername: '通報花子',
            postTitle: 'おすすめクラフトビール🍺',
            postContent: '最近ハマっているのは「△△ブルワリー」のIPA。ホップの香りが最高で、苦味もちょうど良いんです。',
            category: 'スパム',
            reportContent: 'このユーザーは繰り返し同じ内容の投稿をしています。'
        },
        {
            id: 3,
            reporterUsername: '通報一郎',
            postTitle: '初心者向けカクテル🍹',
            postContent: '自宅で簡単に作れるカクテル「ジントニック」をご紹介。シンプルだけど奥深い味わいです！',
            category: '著作権侵害',
            reportContent: '使用されている画像は他サイトからの無断転載です。'
        },
        {
            id: 4,
            reporterUsername: '通報美咲',
            postTitle: '週末はウイスキーで🥃',
            postContent: '普段飲まない方も、ストレートで一口試してみてほしい「響」。香りが格別です。',
            category: 'その他',
            reportContent: '個人的な誹謗中傷が含まれています。'
        },
        {
            id: 5,
            reporterUsername: '通報健太',
            postTitle: '夏にぴったりのハイボール',
            postContent: 'レモンとミントをたっぷり入れたハイボールが最高。暑い日にゴクゴクいけますね！',
            category: '不適切な内容',
            reportContent: '暴力的表現があります。'
        }
    ];

    // Function to render reports into the table
    function renderReports() {
        reportTableBody.innerHTML = ''; // Clear existing rows
        reports.forEach(report => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.reporterUsername}</td>
                <td class="post-content-cell" title="${report.postTitle}">${report.postTitle}</td>
                <td class="post-content-cell" title="${report.postContent}">${report.postContent}</td>
                <td>${report.category}</td>
                <td class="report-content-cell" title="${report.reportContent}">${report.reportContent}</td>
                <td><button class="delete-button" data-id="${report.id}">削除</button></td>
            `;
            reportTableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const reportId = this.dataset.id;
                // IMPORTANT: Replace window.confirm with a custom modal UI for better user experience and iframe compatibility.
                if (window.confirm(`通報ID: ${reportId} を本当に削除しますか？`)) {
                    // In a real application, you would send a request to the server to delete the report
                    console.log(`Deleting report with ID: ${reportId}`);
                    // Remove the row from the DOM
                    this.closest('tr').remove();
                    // You might want to update the 'reports' array here as well
                    // IMPORTANT: Replace alert with a custom message box UI.
                    alert(`通報ID: ${reportId} を削除しました。`);
                }
            });
        });
    }

    renderReports(); // Initial rendering of reports
});
