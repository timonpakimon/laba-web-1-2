document.addEventListener('DOMContentLoaded', () => {
    const usersTableBody = document.getElementById('users-table-body');

    // Функція для виведення користувачів у таблицю
    function renderUsers(users) {
        if (!usersTableBody) return;

        // Очищаємо таблицю перед додаванням нових даних
        usersTableBody.innerHTML = '';

        // Проходимось по кожному користувачеві і додаємо його до таблиці
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.pass}</td>
                <td>
                    <button class="btn btn-primary edit-btn" data-id="${user.id}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        // Додаємо обробник події для кнопок редагування та видалення
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.getAttribute('data-id');
                console.log(`Edit button clicked for user ID: ${userId}`);
                editUser(userId);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.getAttribute('data-id');
                console.log(`Delete button clicked for user ID: ${userId}`);
                deleteUser(userId);
            });
        });
    }

    // Функція для додавання нового користувача
    function addUser(name, login, pass) {
        const user = {
            name: name,
            email: login,
            pass: pass
        };

        // Відправка AJAX-запиту за допомогою fetch
        fetch('http://localhost:3001/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('User saved successfully', data);
            // Оновлюємо список користувачів після додавання нового користувача
            fetchUsers();
        })
        .catch(error => {
            console.error('Error saving user:', error);
        });
    }

    // Функція для видалення користувача
    function deleteUser(userId) {
        fetch(`http://localhost:3001/delete-user/${userId}`, { // Змінено на /delete-user/:userId
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('User deleted successfully', data);
            fetchUsers();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    }
    

    // Функція для редагування користувача
    function editUser(userId) {
        // Реалізуйте логіку редагування користувача
        console.log(`Edit user function called for user ID: ${userId}`);
    }

    // Функція для отримання списку користувачів з сервера
    function fetchUsers() {
        fetch('http://localhost:3001/users')
            .then(response => response.json())
            .then(data => {
                renderUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    // При кліку на кнопку "Login" додаємо нового користувача
    const submit = document.querySelector('#submit');
    if (submit) {
        submit.addEventListener('click', () => {
            const nameUser = document.querySelector('#name').value;
            const loginUser = document.querySelector('#login').value;
            const passUser = document.querySelector('#pass').value;
            addUser(nameUser, loginUser, passUser);
        });
    }

    // Отримуємо список користувачів після завантаження сторінки
    fetchUsers();
});
