const request = require("supertest");
const app = require("../app");

const URL_GENRES = "/api/v1/genres";

const genre = {
    name: "Terror",
};

let genreId;

test(`POST -> ${URL_GENRES} should return status code 201`, async () => {
    const res = await request(app).post("/api/v1/genres").send(genre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("name", genre.name);
});

test(`GET -> ${URL_GENRES} should return status code 200 and res.body.length = 1`, async () => {
    const res = await request(app).get("/api/v1/genres");

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test(`GET ONE -> '${URL_GENRES}/:id' should return status code 200`, async () => {
    const res = await request(app).get(`/api/v1/genres/${genreId}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("name", genre.name);
});

test(`PUT -> '${URL_GENRES}/:id' should return status code 200 `, async () => {
    const genreUpdate = {
        name: "Suspenso",
    };

    const res = await request(app)
        .put(`/api/v1/genres/${genreId}`)
        .send(genreUpdate);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("name", genreUpdate.name);
});

test(`DELETE -> '${URL_GENRES}/:id' should return status code 204`, async () => {
    const res = await request(app).delete(`/api/v1/genres/${genreId}`);
    expect(res.status).toBe(204);
});
