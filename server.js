const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

// Додавання тестових користувачів
let users = [
    { id: 1, name: 'John', email: 'john@example.com', pass: 'password123' },
    { id: 2, name: 'Jane', email: 'jane@example.com', pass: 'password123' },
    { id: 3, name: 'Alice', email: 'alice@example.com', pass: 'password123' }
];

app.use(bodyParser.json());
app.use(cors());

// Маршрут для отримання списку користувачів
app.get('/users', (req, res) => {
    res.json(users);
});

// Маршрут для отримання даних користувача за ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Маршрут для додавання нового користувача
app.post('/add-user', (req, res) => {
    const { name, login, pass } = req.body;
    for (let user of users) {
        if (user.email === login) {
            return res.status(400).json({ error: 'Username already exists!' });
        }
    }
    const newUser = { id: users.length + 1, name, email: login, pass };
    users.push(newUser);
    res.json({ message: 'User saved successfully', userId: newUser.id });
});

// Маршрут для редагування користувача
app.put('/edit-user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, login, pass } = req.body;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { id: userId, name, email: login, pass };
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Маршрут для видалення користувача
app.delete('/delete-user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
