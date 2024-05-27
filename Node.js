const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let users = {};

app.post('/your-server-endpoint', (req, res) => {
    const { name, login, pass } = req.body;

    // Перевірка на унікальність login
    for (let key in users) {
        if (users[key].login === login) {
            return res.status(400).json({ error: 'Username already exists!' });
        }
    }

    const userId = 'User' + Object.keys(users).length;
    users[userId] = { name, login, pass };

    res.json({ message: 'User saved successfully', userId });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});