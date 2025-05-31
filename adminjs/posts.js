document.addEventListener('DOMContentLoaded', function() {
    const postTableBody = document.getElementById('post-management-table-body');

    // Sample data for posts (will be replaced by database data)
    const posts = [
        {
            id: 1,
            username: 'サンプル太郎',
            title: '今日の晩酌🍶',
            content: '新しく手に入れた日本酒「〇〇」を開栓！フルーティーで飲みやすかったです。肴はアジのたたきで完璧でした！',
            goods: 15,
            bads: 2,
            reports: 0
        },
        {
            id: 2,
            username: 'ビール好き',
            title: 'おすすめクラフトビール🍺',
            content: '最近ハマっているのは「△△ブルワリー」のIPA。ホップの香りが最高で、苦味もちょうど良いんです。',
            goods: 8,
            bads: 0,
            reports: 1
        },
        {
            id: 3,
            username: 'カクテルマニア',
            title: '初心者向けカクテル🍹',
            content: '自宅で簡単に作れるカクテル「ジントニック」をご紹介。シンプルだけど奥深い味わいです！',
            goods: 20,
            bads: 1,
            reports: 0
        },
        {
            id: 4,
            username: 'ウイスキー愛好家',
            title: '週末はウイスキーで🥃',
            content: '普段飲まない方も、ストレートで一口試してみてほしい「響」。香りが格別です。',
            goods: 30,
            bads: 5,
            reports: 2
        },
        {
            id: 5,
            username: 'ハイボールマスター',
            title: '夏にぴったりのハイボール',
            content: 'レモンとミントをたっぷり入れたハイボールが最高。暑い日にゴクゴクいけますね！',
            goods: 25,
            bads: 3,
            reports: 0
        },
        {
            id: 6,
            username: '日本酒の探求者',
            title: '隠れた名酒を発見！',
            content: '先日訪れた酒蔵で、地元でしか手に入らない珍しい日本酒を見つけました。口当たりがまろやかで、どんな料理にも合いそうです。',
            goods: 12,
            bads: 1,
            reports: 0
        },
        {
            id: 7,
            username: 'ワイン初心者',
            title: '赤ワインの選び方',
            content: 'スーパーで手軽に買えるおすすめの赤ワインを教えてください！フルーティーなものが好きです。',
            goods: 7,
            bads: 0,
            reports: 0
        },
        {
            id: 8,
            username: '焼酎大好き',
            title: '芋焼酎の魅力',
            content: '最近、芋焼酎の奥深さに目覚めました。おすすめの銘柄や飲み方があれば教えてほしいです！',
            goods: 18,
            bads: 2,
            reports: 1
        }
    ];

    // Function to render posts into the table
    function renderPosts() {
        postTableBody.innerHTML = ''; // Clear existing rows
        posts.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.username}</td>
                <td>${post.title}</td>
                <td class="post-content-cell" title="${post.content}">${post.content}</td>
                <td>${post.goods}</td>
                <td>${post.bads}</td>
                <td>${post.reports}</td>
                <td><button class="delete-button" data-id="${post.id}">削除</button></td>
            `;
            postTableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const postId = this.dataset.id;
                // IMPORTANT: Replace window.confirm with a custom modal UI for better user experience and iframe compatibility.
                if (window.confirm(`投稿ID: ${postId} を本当に削除しますか？`)) {
                    // In a real application, you would send a request to the server to delete the post
                    console.log(`Deleting post with ID: ${postId}`);
                    // Remove the row from the DOM
                    this.closest('tr').remove();
                    // You might want to update the 'posts' array here as well
                    // IMPORTANT: Replace alert with a custom message box UI.
                    alert(`投稿ID: ${postId} を削除しました。`);
                }
            });
        });
    }

    renderPosts(); // Initial rendering of posts
});
