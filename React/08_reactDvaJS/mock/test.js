// ./mock/test.js

export default {
    'GET /users': { name: 'John', age: 20, location: 'beijing' },
    'POST /users/login': (request, response) => {
        if (request.body.username === 'xiaoming' && request.body.password === '123') {
            response.send({ ok: 1 })
        } else {
            response.send({ ok: 0 })
        }
    }
}