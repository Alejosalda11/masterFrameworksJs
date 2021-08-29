'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/articles'});

 
// Rutas de prueba
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

//Rutas utiles

router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.get('/article/:id', ArticleController.getArticle);
router.delete('/article/:id', ArticleController.delete);
router.put('/article/:id', ArticleController.update);
router.post('/upload-img/:id', md_upload, ArticleController.upload);

module.exports = router;
