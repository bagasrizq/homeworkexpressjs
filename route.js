var express = require('express');
var router = express.Router();
var pool = require('./query.js');
const { restart } = require('nodemon');


router.get('/:table', function (req, res) {
    const table = req.params.table
    if (table == "film") {
        pool.query('SELECT * FROM film ORDER BY film_id ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows);
        });
    } else if (table == "category") {
        pool.query('SELECT * FROM category ORDER BY category_id ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows);
        });
    }
    else {
        res.status(404).json({ message: "data not found" })
    }
});

router.get('/:table/:id', function(req, res) {
    const table = req.params.table
    const tableId = req.params.id

    if (table === 'film') {
        pool.query("SELECT * FROM film WHERE film_id = $1", [tableId], (error,results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.row);
        }); 
    } else if (table === film_category) {
        const querylist = `
        SELECT film FROM film INNER JOIN film_category ON film.film _id = film_category.film_id
        INNER JOIN category ON film_category.category_id = category.category_id
        WHERE category.category_id = $1
        `
        pool.query(querylist, [tableId], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        });
    } 
    else {
        res.status(404).json({ message: "data not found" });
    }
});

// dynamic route
// router.get('/:table', function (req, res) {
//     res.send('hello bagas '+ req.params.id +req.params.table);
// });

// // basic route  
// router.post('/post', function (req, res) {
//     res.send('hello bagasnala');
// });

// router.get ('/get', function (req, res) {
//     res.send('hello bagasnala1');
// });

module.exports = router;    