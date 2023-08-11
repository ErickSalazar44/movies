const request = require("supertest");
const app = require("../app");

const URL_DIRECTORS = "/api/v1/directors";

const directors = {
    firstName: "Anthony",
    lastName: "Russo",
    nationality: "Estados Unidos",
    image: "https://Anthony_Russo_by_Gage_Skidmore.jpg",
    birthday: "2000-05-01",
};

let directorsId;

test(`POST -> 'URL_DIRECTORS' should return status code 201`, async () => {
    const res = await request(app).post(URL_DIRECTORS).send(directors);
    directorsId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("firstName", directors.firstName);
});

test(`GET -> 'URL_DIRECTORS' should return status code 200 and res.body.length = 1`, async () => {
    const res = await request(app).get(URL_DIRECTORS);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test(`GET ONE -> 'URL_DIRECTORS/:id' should return status code 200`, async () => {
    const res = await request(app).get(`${URL_DIRECTORS}/${directorsId}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("lastName", directors.lastName);
});

test(`PUT -> 'URL_DIRECTORS/:id' should return status code 200 `, async () => {
    const directorsUpdate = {
        firstName: "Christopher",
        lastName: "Nolan",
        nationality: "Estados Unidos",
        image: "https://Christopher_Nolan.jpg",
        birthday: "1970-05-01",
    };

    const res = await request(app)
        .put(`${URL_DIRECTORS}/${directorsId}`)
        .send(directorsUpdate);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("firstName", directorsUpdate.firstName);
});

test(`DELETE -> 'URL_DIRECTORS/:id' should return status code 204`, async () => {
    const res = await request(app).delete(`${URL_DIRECTORS}/${directorsId}`);
    expect(res.status).toBe(204);
});
