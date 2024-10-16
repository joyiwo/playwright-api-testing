const { test, expect } = require("@playwright/test")
const { request } = require("http")
const Ajv = require('ajv')
const ajv = new Ajv()

const schema = require("../json-schema/add-object.schema.json");

test('API GET Request', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users/2')
    expect(response.status()).toBe(200)

    const responseJson = await response.json();
    console.log(await response.json())

    const valid = ajv.validate(schema.getUserSchema, responseJson);  // Panggil skema GET dari file
    expect(valid).toBe(true);  // Assertion untuk validasi
    if (!valid) console.log(ajv.errors);  // Log error jika schema tidak sesuai

});

test('API POST Request', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "Restu",
            "job": "Sprinter"
        }
    })

    expect(response.status()).toBe(201)

    const responseJson = await response.json();
    console.log(responseJson);

    // Validasi response menggunakan JSON Schema untuk POST
    const valid = ajv.validate(schema.createUserSchema, responseJson);  // Akses skema POST dari file schema

    // Log kesalahan dari Ajv jika validasi gagal
    if (!valid) {
        console.log("Validation errors:", ajv.errors);
    }

    expect(valid).toBe(true);  // Assertion untuk validasi

})

test('API PUT Request', async ({ request }) => {

    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Restu",
            "job": "Sprinter"
        }
    })

    expect(response.status()).toBe(200)

    const responseJson = await response.json();
    console.log(responseJson);

    // Validasi response menggunakan JSON Schema untuk PUT
    const valid = ajv.validate(schema.updateUserSchema, responseJson);  // Akses skema PUT dari file schema

    // Log kesalahan dari Ajv jika validasi gagal
    if (!valid) {
        console.log("Validation errors:", ajv.errors);
    }

    expect(valid).toBe(true);  // Assertion untuk validasi

})

test('API DELETE Request', async ({ request }) => {

    const response = await request.delete('https://reqres.in/api/users/2')

    expect(response.status()).toBe(204)

    

});