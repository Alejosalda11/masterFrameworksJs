'use strict'

var validator = require('validator');

var Article = require('../models/article');



var controller = {

    datosCurso: (req, res) => {
        var hola = req.body.hola;
    
        return res.status(200).send({
            curso: 'master en frameworks js',
            autor: 'alejandro saldarriaga',
            url: 'alejosalda11.web',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion de mi controlador de articulos'

        });
    },

    save: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;


        // Validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);



        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            })
        }

        if(validate_title && validate_content){
              

            //crear el objeto a guardar
            var article = new Article();

            //asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //guardar el articulo
            article.save((err,articleStored) => {
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                //devolver una respuesta
                return res.status(200).send({
                status: 'succes',
                article
            });

            })

            

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

         
        
    },

    getArticles: (req, res) => {
        

        var query = Article.find({});

        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }




        //FIND
        query.sort('-_id').exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                });

            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                });

            }

            return res.status(200).send({
                status: 'succes',
                articles
            });
        });

        
    },

    getArticle: (req, res) => {

        //recoger el id de la url
        var articleId = req.params.id;

        //comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            }); 
        }

        //buscar el articulo
        Article.findById(articleId, (err, article) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al deolver los datos'
                });

            }

            if(!article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

             //devolver em json

             return res.status(404).send({
            status: 'succes',
            article
            });


        });

       
    },

    delete: (req, res) => {
        //recoger el id de la URL
        var articleId = req.params.id;
        //find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al borrar'
                });
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'no se ha borrado el articulo, puede que no exista'
                });
            }
            return res.status(200).send({
                status: 'succes',
                article: articleRemoved
            })
        });
        
    },

    update: (req, res) => {

        //recoger el id del articulo
        var artcileId = req.params.id;


        //recoger datos que llegan por put
        var params = req.body;

        //validar datos
        try{

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){

            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }

        if(validate_title && validate_content){
            //find and update  
            Article.findOneAndUpdate({_id: articleId}, params, {new:true},(err, articleUpdate) => {

                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });  
               
                }if(!articleUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'no existe el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'succes',
                    article: articleUpdate
                });



            });

        }else{

            return res.status(200).send({
                status: 'error',
                message: 'la validacion no es correcta'
            });
        }

        

        
    },
    upload: (req, res) => {
        //configurar el modulo de connect multiparty(hecho)


        //conseguir fichero de la peticion
        var file_name = 'imagen no subida...';
        
        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        //conseguir nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('/');

        //comprobar la extension (solo imagenes)

        //si todo es valido

        //buscar el archivos asignarle nombre imagen actualizar
        return res.status(404).send({
            fichero: req.files
        });
    }
    

}; // end controller

module.exports = controller;