const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const Schema = buildSchema(`
    type Film{
        id:Int,
        name:String,
        price:Int,
        poster:String
    }
    input FilmInput{
        name:String,
        price:Int,
        poster:String
    }
    type Query{
        getDB:[Film]
    }
    type Mutation{
        createFilm(input:FilmInput):Film,
        updateFilm(id:Int!, input:FilmInput):Film,
        deleteFilm(id:Int!):Int
    }
`)
let fakeDB = [
    { id: 1, name: '111', poster: 'http://111', price: 100 },
    { id: 2, name: '222', poster: 'http://222', price: 200 },
    { id: 3, name: '333', poster: 'http://333', price: 300 }
]
const root = {
    getDB: () => {
        return fakeDB
    },
    createFilm: ({ input }) => {
        fakeDB.push({ ...input, id: fakeDB.length + 1 })
        return { ...input, id: fakeDB.length }
    },
    updateFilm: ({ id, input }) => {
        fakeDB = fakeDB.map(item => {
            if (item.id === id) {
                current = { ...item, ...input }
                return { ...item, ...input }
            }
            return item
        })
        return current
    },
    deleteFilm: ({ id }) => {
        fakeDB = fakeDB.filter(item => item.id !== id) // filter
        return 1
    }
}
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true
}))
app.listen(4001)

/* 添加 input
mutation{
	createFilm(input: {
    name: "xiaoming",
    poster: "aaa",
		price:4000
  }){
    id,
    name,
    poster,
    price
  }
}
*/

/* 添加 output
{
  "data": {
    "createFilm": {
      "id": 4,
      "name": "xiaoming",
      "poster": "aaa",
      "price": 4000
    }
  }
}
*/

/* 添加后查询 input
query{
	getDB {
    id,
    name,
    price,
    poster
	}
}
*/

/* 添加后查询 output
{
  "data": {
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
      },
      {
        "id": 4,
        "name": "xiaoming",
        "price": 4000,
        "poster": "aaa"
      }
    ]
  }
}
*/

/* 修改 input
mutation{
	updateFilm(id: 1, input: {
    name: "111-修改",
		price: 100,
		poster: "http://111-修改"
  }){
		id,
    name,
    poster,
    price
  }
}
*/

/* 修改 output
{
  "data": {
    "updateFilm": {
      "id": 1,
      "name": "111-修改",
      "poster": "http://111-修改",
      "price": 100
    }
  }
}
*/

/* 修改后查询 input
query{
	getDB {
    id,
    name,
    price,
    poster
	}
}
*/

/* 修改后查询 output
{
  "data": {
    "getDB": [
      {
        "id": 1,
        "name": "111-修改",
        "price": 100,
        "poster": "http://111-修改"
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
      },
      {
        "id": 4,
        "name": "xiaoming",
        "price": 4000,
        "poster": "aaa"
      }
    ]
  }
}
*/

/* 删除 input
mutation{
	deleteFilm(id: 1)
}
*/

/* 删除 output
{
  "data": {
    "deleteFilm": 1
  }
}
*/

/* 删除后查询 input
query{
	getDB {
    id,
    name,
    price,
    poster
	}
}
*/

/* 删除后查询 output
{
  "data": {
    "getDB": [
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
      },
      {
        "id": 4,
        "name": "xiaoming",
        "price": 4000,
        "poster": "aaa"
      }
    ]
  }
}
*/