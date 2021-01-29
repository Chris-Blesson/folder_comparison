const express = require('express');
const app = express();
const multer = require("multer");
const logic = require('./logic');
var folder1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "folder1/");
    },
    filename: function (req, file, cb) {
        cb(null, (file.originalname));
    },
});

var folder2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "folder2/");
    },
    filename: function (req, file, cb) {
        cb(null, (file.originalname));
    },
});

const upload1 = multer({ storage: folder1 });
const upload2 = multer({ storage: folder2 });

app.set('view engine', 'hbs');

app.get('/healthcheck', (req, res) => {
    res.render('healthcheck');
})

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/fileupload', (req, res) => {
    res.render('index2')
})


app.post('/getFolder1', upload1.single("files"), (req, res) => {
    console.log(req);
    logic.compare('folder1', "folder2")
    res.render('index');
})
app.post('/getFolder2', upload2.single("files"), (req, res) => {
    console.log(req);
     logic.compare('folder1', "folder2")
    res.render('index');
})

app.listen(4000, () => {
    console.log('listening on port 4000');
})