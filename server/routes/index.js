(function() {
	
	'use strict';
	
	var express = require('express');
	var router = express.Router();
	var mongojs = require('mongojs');
	var db = mongojs('dogmate', ['todos']);
	
	/* Firebase DB Setup */
	var firebase = require("firebase");
	require('events').EventEmitter.prototype._maxListeners = 100;

	  // Set the configuration for your app
	// TODO: Replace with your project's config object
	var config = {
		apiKey: "AIzaSyDdHnF9X9YsCTsNt8d445bgtUh1fc7hkZc",
		authDomain: "dogemate-2351f.firebaseapp.com",
		databaseURL: "https://dogemate-2351f.firebaseio.com/",
		storageBucket: "dogemate-2351f.appspot.com"
	};
	firebase.initializeApp(config);

	// Get a reference to the database service
	var database = firebase.database();

	/* GET home page */
	router.get('/', function(req, res) {
		res.render('index', {title: 'DogMate'});
	});

	/* GET vista de paseos */
	router.get('/paseos', function(req, res) {
		res.render('internal/paseos', { title: 'Paseos'});
	});

	/* GET vista de comentarios */
	router.get('/comentarios', function(req, res) {
		res.render('internal/comentarios', { title: 'Comentarios'});
	});

	/* GET vista de estadisticas */
	router.get('/estadisticas', function(req, res) {
		res.render('internal/estadisticas', { title: 'Estadísticas'});
	});

	/* GET vista de perfil */
	router.get('/perfil', function(req, res) {
		res.render('internal/profile', { title: 'Perfil'});
	});

	/* GET vista de Edición de datos de usuario */
	router.get('/editar_perfil', function(req, res) {
		res.render('internal/edit_profile', { title: 'Edición de datos de usuario'});
	});

	router.get('/api/todos', function(req, res) {
		db.todos.find(function(err, data) {
			res.json(data);
		});	
	});
	
	router.post('/api/todos', function(req, res) {
		db.todos.insert(req.body, function(err, data) {
			res.json(data);
		});
	});

	router.put('/api/todos', function(req, res) {
		db.todos.update({
			_id: mongojs.ObjectId(req.body._id)
		}, {
			isCompleted: req.body.isCompleted,
			todo: req.body.todo
		}, {}, function(err, data){
			res.json(data);
		});
	});

	router.delete('/api/todos/:_id', function(req, res) {
		db.todos.remove({
			_id: mongojs.ObjectId(req.params._id)
		}, '', function(err, data) {
			res.json(data);
		});
	});
	module.exports = router;
}());
