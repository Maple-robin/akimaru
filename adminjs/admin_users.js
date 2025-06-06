document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.getElementById('user-management-table-body');

    // Function to calculate age from birthday
    function calculateAge(birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Sample data for users (will be replaced by database data)
    const users = [
        {
            id: 1,
            name: 'サンプル太郎',
            email: 'taro.sample@example.com',
            birthday: '1990-01-01' // YYYY-MM-DD format
        },
        {
            id: 2,
            name: '山田花子',
            email: 'hanako.yamada@example.com',
            birthday: '1985-05-15'
        },
        {
            id: 3,
            name: '田中一郎',
            email: 'ichiro.tanaka@example.com',
            birthday: '1998-11-20'
        },
        {
            id: 4,
            name: '佐藤美咲',
            email: 'misaki.sato@example.com',
            birthday: '2000-03-10'
        },
        {
            id: 5,
            name: '鈴木健太',
            email: 'kenta.suzuki@example.com',
            birthday: '1975-08-25'
        }
    ];

    // Function to render users into the table
    function renderUsers() {
        userTableBody.innerHTML = ''; // Clear existing rows
        users.forEach(user => {
            const age = calculateAge(user.birthday);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.birthday}</td>
                <td>${age}歳</td>
                <td><button class="btn btn-sm btn-delete" data-id="${user.id}">削除</button></td>
            `;
            userTableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.dataset.id;
                // IMPORTANT: Replace window.confirm with a custom modal UI for better user experience and iframe compatibility.
                if (window.confirm(`ユーザーID: ${userId} を本当に削除しますか？`)) {
                    // In a real application, you would send a request to the server to delete the user
                    console.log(`Deleting user with ID: ${userId}`);
                    // Remove the row from the DOM
                    this.closest('tr').remove();
                    // You might want to update the 'users' array here as well
                    // IMPORTANT: Replace alert with a custom message box UI.
                    alert(`ユーザーID: ${userId} を削除しました。`);
                }
            });
        });
    }

    renderUsers(); // Initial rendering of users
});
