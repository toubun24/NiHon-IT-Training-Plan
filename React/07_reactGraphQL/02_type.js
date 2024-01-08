const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const app = express()
/* 在下面的''中使用//注释会报错 */
const Schema = buildSchema(`
    type Allinfo{
        name: String,
        age: Int,
        location: String
    }
    type Film{
        id: Int,
        name: String,
        price: Int,
        poster: String
    }
    type Query{
        hello: String,
        getName: String,
        getAge: Int,
        getAllInfo: Allinfo,
        getAllName: [String],
        getAllAge: [Int],
        getDB: [Film],
        getFilmDetails(id:Int!): Film
    }
`)
const fakeDB = [
    { id: 1, name: '111', poster: 'http://111', price: 100 },
    { id: 2, name: '222', poster: 'http://222', price: 200 },
    { id: 3, name: '333', poster: 'http://333', price: 300 }
]
const root = {
    hello: () => {
        const result = 'hello-graphQL'
        return result
    },
    getName: () => {
        return 'xiaoming'
    },
    getAge: () => {
        return 100
    },
    getAllAge: () => {
        return [18, 19, 20]
    },
    getAllName: () => {
        return ['aa', 'bb', 'cc']
    },
    getAllInfo: () => {
        return {
            name: 'xiaoming',
            age: 20,
            location: 'shanghai'
        }
    },
    getDB: () => {
        return fakeDB
    },
    getFilmDetails: ({ id }) => {
        return fakeDB.filter(item => item.id === id)[0]
    }
}
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true
}))
app.listen(4001)

/* input
query {
  hello,
  getAge,
  getName,
  getAllName,
  getAllAge,
  getAllInfo{
    name,
    age,
    location
  },
	getDB {
    id,
    name,
    price,
    poster
  },
	getFilmDetails(id:1){
    name,
		poster
  }
}
*/

/* output
{
  "data": {
    "hello": "hello-graphQL",
    "getAge": 100,
    "getName": "xiaoming",
    "getAllName": [
      "aa",
      "bb",
      "cc"
    ],
    "getAllAge": [
      18,
      19,
      20
    ],
    "getAllInfo": {
      "name": "xiaoming",
      "age": 20,
      "location": "shanghai"
    },
    "getDB": [
      {
        "id": 1,
        "name": "111",
        "price": 100,
        "poster": "http://111"
      },
      {
        "id": 2,
        "name": "222",
        "price": 200,
        "poster": "http://222"
      },
      {
        "id": 3,
        "name": "333",
        "price": 300,
        "poster": "http://333"
      }
    ],
    "getFilmDetails": {
      "name": "111",
      "poster": "http://111"
    }
  }
}
*/