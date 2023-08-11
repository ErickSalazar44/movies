const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

require("../models");

const URL_MOVIES = "/api/v1/movies";

const movies = {
    name: "Avengers",
    image: "https://avengers_end_game.jpg",
    synopsis: "lorem ipsum texto de prueba",
    releaseYear: 2018,
};

let moviesId;

test(`POST -> 'URL_MOVIES' should return status code 201`, async () => {
    const res = await request(app).post(URL_MOVIES).send(movies);
    moviesId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("name", movies.name);
});

test(`GET -> 'URL_MOVIES' should return status code 200 and res.body.length = 1`, async () => {
    const res = await request(app).get(URL_MOVIES);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test(`GET ONE -> 'URL_MOVIES/:id' should return status code 200`, async () => {
    const res = await request(app).get(`${URL_MOVIES}/${moviesId}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("releaseYear", movies.releaseYear);
});

test(`PUT -> 'URL_MOVIES/:id' should return status code 200 `, async () => {
    const directorsUpdate = {
        name: "interestelar",
        image: "https://interestelar.jpg",
        releaseYear: 2014,
    };

    const res = await request(app)
        .put(`${URL_MOVIES}/${moviesId}`)
        .send(directorsUpdate);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("releaseYear", directorsUpdate.releaseYear);
});

test("POST -> 'URL_MOVIES/:id/genres' should return status code 200 and res.body.length === 1", async () => {
    const genre = {
        name: "Terror",
    };

    const createGenre = await Genre.create(genre);

    const res = await request(app)
        .post(`${URL_MOVIES}/${moviesId}/genres`)
        .send([createGenre.id]);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    await createGenre.destroy();
});

test("POST -> 'URL_MOVIES/:id/actors", async () => {
    const actor = {
        firstName: "Prueba",
        lastName: "Prueba",
        nationality: "Perú",
        image: "https://actores.jpg",
        birthday: "2000-05-01",
    };

    const createActor = await Actor.create(actor);

    const res = await request(app)
        .post(`${URL_MOVIES}/${moviesId}/actors`)
        .send([createActor.id]);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    await createActor.destroy();
});

test("POST -> 'URL_MOVIES/:id/directors", async () => {
    const director = {
        firstName: "Prueba",
        lastName: "Prueba",
        nationality: "Perú",
        image: "https://directores.jpg",
        birthday: "2000-05-01",
    };

    const createDirector = await Director.create(director);

    const res = await request(app)
        .post(`${URL_MOVIES}/${moviesId}/directors`)
        .send([createDirector.id]);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);

    await createDirector.destroy();
});

test(`DELETE -> 'URL_MOVIES/:id' should return status code 204`, async () => {
    const res = await request(app).delete(`${URL_MOVIES}/${moviesId}`);
    expect(res.status).toBe(204);
});
