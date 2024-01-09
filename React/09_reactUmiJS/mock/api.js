// ./mock/api.js

export default {
    'GET /users': { name: 'xiaoming', age: 20 },
    'POST /users/login': (req, res) => {
        if (req.body.name === 'xiaoming' && req.body.password === '123') {
            res.send({ ok: 1 });
        } else {
            res.send({ ok: 0 });
        }
    },
};
