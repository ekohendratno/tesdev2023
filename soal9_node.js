const express = require('express');
const app = express();

app.use((req, res, next) => {
    // Menambahkan header User-id dan Scope pada setiap request
    res.set('User-id', 'ifabula');
    res.set('Scope', 'user');
    next();
});
app.use((req, res, next) => {
    // Memvalidasi header User-id dan Scope
    const userId = req.get('User-id');
    const scope = req.get('Scope');
    if (userId === 'ifabula' && scope === 'user') {
        next();
    } else {
        res.status(401).send({ responseCode: 401, responseMessage: 'UNAUTHORIZED' });
    }
});

// API dengan method GET
app.get('/api/data', (req, res) => {
    const data = [
        {
            name: 'EKO HENDRATNO',
            age: 34,
            city: 'Lampung'
        },
        {
            name: 'NISA AGUSTIN',
            age: 27,
            city: 'Jakarta'
        }
    ];
    res.send(data);
});

// API dengan method POST
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'admin123') {
        res.send('Login berhasil!');
    } else {
        res.status(401).send('Username atau password salah!');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});