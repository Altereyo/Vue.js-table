let express = require('express');
let fs = require('fs');
let server = express();
let serverPort = 3000;

server.use(express.json());

// GET small table
server.get('/small-table', (req, res) => {
    fs.readFile('./server/db/small-table.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    });
});

// GET big table
server.get('/big-table', (req, res) => {
    fs.readFile('./server/db/big-table.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    });
});

// POST small table (функционал полный, чтобы в db/small-table.json записывались данные и их можно было потом удалить)
server.post('/small-table', (req, res) => {
    fs.readFile('./server/db/small-table.json', 'utf-8', (err, data) => {
        if (!err) {
            let arr = JSON.parse(data);
            let item = req.body;
            arr.push(item);
            fs.writeFile('./server/db/small-table.json', JSON.stringify(arr, null, ' '), err => {
                if (!err) {
                    res.json();
                }
                else {
                    res.sendStatus(500);
                }
            });
        }
    });
});

// POST big table (функционал упрощён, чтобы db/big-table.json не нужно было разворачивать из минифицированного файла, 
// удалять лишние данные и снова минифицировать)
server.post('/big-table', (req, res) => {
    fs.readFile('./server/db/big-table.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
})

server.listen(serverPort, () => {
    console.log('Server runs at ' + serverPort);
})