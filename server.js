const express = require('express');

const knex = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
	knex
		.select('*')
		.from('accounts')
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the accounts' });
		});
});

server.get('/accounts/:id', (req, res) => {
	const idd = req.params.id;
	knex('accounts')
		.where('id', idd)
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the account' });
		});
});

server.post('/accounts', (req, res) => {
	const newAccount = req.body;
	knex('accounts')
		.insert(newAccount)
		.then((response) => {
			res.status(200).json({ message: 'Account added', account: newAccount });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error adding account' });
		});
});

server.put('/accounts/:id', (req, res) => {
	const idd = req.params.id;
	const newInfo = req.body;
	knex('accounts')
		.where('id', idd)
		.update(newInfo)
		.then((response) => {
			res.status(200).json({ message: 'Account was updated with the following info', info: newInfo });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating the account' });
		});
});

server.delete('/accounts/:id', (req, res) => {
	const idd = req.params.id;
	knex('accounts')
		.where('id', idd)
		.del()
		.then((response) => {
			res.status(200).json({ message: 'Account was deleted' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting the account' });
		});
});

module.exports = server;
