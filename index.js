// Bag 1 : Inisialisasi

var express = require('express');
var app = express();
// untuk routing
var route = require('./route.js');
// untuk menghubungkan database ke project
var pool = require('./query.js');


// Bag 2 : Import dari masing2 file
// main endpoint '/route' dilanjutkan di endpoint berikutnya pada file route (basic or dynamic route)
app.use('/route', route);




app.listen(3000);