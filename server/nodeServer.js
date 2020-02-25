const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const SELECT_ALL_CUSTOMERS_QUERY = 'select * from customers';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'inventoryDB',
});

connection.connect(err => {
	if (err) {
		console.log('Error in connection');
		return err;
	} else {
		console.log('Connect to database');
	}
});
app.use(cors());

app.get('/', (req, res) => {
	res.send('goto /customers to search employee records');
});

app.use('/customers', (req, res) => {
	connection.query(SELECT_ALL_CUSTOMERS_QUERY, (err, result) => {
		if (err) {
			console.log('error');
			return res.send(err);
		} else {
			console.log(result);
			return res.json({ data: result });
		}
	});
});

app.listen(8080, () => {
	console.log('Example app listening on port 8080');
});
