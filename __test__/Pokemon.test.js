const request = require('supertest')

const app = require('../bin/www')

it("getPokemons should return a list of 20 pokemons",async ()=>{
    const response = await request(app).get('/pokemons').set('Accept','application/json').set('Content-type','application/json')
    expect(response).toBeDefined()
    expect(response).not.toBeNull()
    expect(response.header['content-type']).toMatch(/json/)
    expect(response.status).toBe(200)
    expect(response.body.length).toEqual(20)
})

it("searchPokemons should bring an array with the pokemons according to the parameter set by the user",async ()=>{
    const parameters = [
        "pika",
        "ditto",
        "bulbasaur",
        "charizard",
        "+",
        ""
    ]
    for(let index in parameters){
        const response = await request(app).get(`/pokemon/${parameters[index]}`).set('Accept','application/json').set('Content-type','application/json')
        expect(response).toBeDefined()
        expect(response).not.toBeNull()
        expect(response.header['content-type']).toMatch(/json/)
        if(index == 4){
            expect(response.body.length).toEqual(0)
            expect(response.status).toBe(200)
        }else{
            if(index == 5){
                expect(response.status).toBe(404)
                expect(response.body.message).toBeDefined()
                expect(response.body.message).not.toBeNull()
                expect(response.body.message).toBe('Pagina no encontrada')
            }else{
                expect(response.status).toBe(200)
                expect(response.body.length).toBeGreaterThanOrEqual(1)
            }
        }
    }    
})