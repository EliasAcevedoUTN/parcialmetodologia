const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.movie;
const Genres = db.genre;
const Actors = db.actor;


const moviesController = {
    'list': (req, res) => {
        db.movie.findAll()
            .then(movies => {
                console.log('-----LISTO LAS PELICULAS');
                movies.forEach(element => {
                    console.log(element.title);
                });

                res.json(movies)
            })
    },
    'detail': (req, res) => {
        db.movie.findByPk(req.params.id)
            .then(movie => {
                console.log('---LISTO EL DETALLE');
                console.log(movie.title);
                res.json(movie);
            });
    },
    'new': (req, res) => {
        db.movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    },

    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        console.log('-----------------ENTRE A LA FUNCION ADDdd --------');
        console.log('------------------ --------');

        // Hago los 2 llamados indpendientes
        let promGenres = Genres.findAll();
   // Para este caso no necesito hacer la llamada a Actores     
   //     let promActors = Actors.findAll();

//Promise.all espera a que todo se cumpla (o bien al primer rechazo).
 //       Promise.all([promGenres, promActors])
        Promise.all([promGenres])
            .then(([allGenres]) => {

            return res.render('moviesAdd', { allGenres})
        })
            .catch(error => res.send(error))
    },

    create: function (req, res) {
        console.log(req.body);
        console.log('------ENTRE A CREATE');
        console.log('Pelicula :' + req.body.title);
        console.log('Código de Género :' + req.body.genre_id);

        db.movie.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
            .then(() => {
                return res.status(200).send('Movie create succesfully');
            })
            .catch(error => res.send(error))
    },
    edit: function (req, res) {
        console.log('------ENTRE AL EDITAR -----');
        let movieId = req.params.id;
        console.log('----BUSCO LA PELI POT ID');
        let promMovies = db.movie.findByPk(movieId, { include: ['genre', 'actors'] });
        console.log('----BUSCO TODOS LOS GENEROS');
        let promGenres = db.genre.findAll();
        console.log('----BUSCO TODOS LOS ACTORES');
        let promActors = db.actor.findAll();

        Promise
            .all([promMovies, promGenres, promActors])
            .then(([Movie, allGenres, allActors]) => {
                console.log('-----TITULO :' + Movie.title);
                console.log('-----GENERO :' +  Movie.genre.name);
                console.log('-----GENERO id :' +  Movie.genre.id);
                return res.json(Movie)
            })
            .catch(error => res.send(error))
    },
    update: function (req, res) {
        let movieId = req.params.id;

        db.movie.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: { id: movieId }
            })
            .then(() => {
                return res.status(200).send('Película updated succesfully.')
            })
            .catch(error => res.send(error))
    },
    delete: function (req, res) {
        let movieId = req.params.id;

        db.movie.findByPk(movieId)
            .then(Movie => {
                return res.json(Movie)
            })
            .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies
            .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.status(200).send('Película delete succesfully.')
            })
            .catch(error => res.send(error))
    }
}

module.exports = moviesController;