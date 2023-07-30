const express = require("express");
const routerGenre = require("./genre.router");
const routerActor = require("./actor.router");
const routerDirector = require("./director.router");
const routerMovie = require("./movie.router");
const router = express.Router();

// colocar las rutas aquí

// GENERO
router.use("/genres", routerGenre);
// ACTORES
router.use("/actors", routerActor);
// DIRECTORES
router.use("/directors", routerDirector);
// MOVIES
router.use("/movies", routerMovie);

module.exports = router;
