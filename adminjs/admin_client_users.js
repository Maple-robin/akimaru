/*
 * admin_client_users.js
 * 企業ユーザー管理一覧ページのJavaScript
 * admin_users.jsをベースに作成
 * ----------------------------------------
 */

document.addEventListener('DOMContentLoaded', function() {
    const clientUserTableBody = document.getElementById('client-user-management-table-body');

    // サンプルデータ for client_user_info テーブル (データベースデータに置き換えられる想定)
    const clientUsers = [
        {
            id: 101,
            name: '株式会社ABC',
            email: 'info@abc-corp.com',
            // パスワードは表示しないためここでは含めない
        },
        {
            id: 102,
            name: '有限会社XYZ',
            email: 'contact@xyz-ltd.jp',
        },
        {
            id: 103,
            name: '合同会社フェニックス',
            email: 'support@phoenix-llc.co.jp',
        },
        {
            id: 104,
            name: '開発ラボ',
            email: 'dev@dev-lab.io',
        }
    ];

    // Function to render client users into the table
    function renderClientUsers() {
        clientUserTableBody.innerHTML = ''; // Clear existing rows
        clientUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-delete" data-id="${user.id}">削除</button>
                    </div>
                </td>
            `;
            clientUserTableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('#client-user-management-table-body .btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.dataset.id;
                // IMPORTANT: Replace window.confirm with a custom modal UI for better user experience and iframe compatibility.
                if (window.confirm(`企業ユーザーID: ${userId} を本当に削除しますか？`)) {
                    // In a real application, you would send a request to the server to delete the user
                    console.log(`Deleting client user with ID: ${userId}`);
                    // Remove the row from the DOM
                    this.closest('tr').remove();
                    // You might want to update the 'clientUsers' array here as well
                    // IMPORTANT: Replace alert with a custom message box UI.
                    alert(`企業ユーザーID: ${userId} を削除しました。`);
                }
            });
        });
    }

    renderClientUsers(); // Initial rendering of client users
});