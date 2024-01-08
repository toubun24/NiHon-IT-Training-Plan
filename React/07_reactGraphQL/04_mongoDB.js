// CMD: mongod -dbpath=G:\NiHon-IT-Training-Plan\React\07_reactGraphQL\DB

const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose') // 连接数据库
// mongoose.connect("mongodb://localhost:27017/maizuo", { useNewUrlParser: true, useUnifiedTopology: true }) // useNewUrlParser: 在url里识别验证用户所需的db // useUnifiedTopology: 解决弃用警告，使用新的服务器发现和监视引擎
// [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
// [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
mongoose.connect("mongodb://localhost:27017/maizuo")
const FilmModel = mongoose.model('film', mongoose.Schema({ // 定义模型(model)
    name: String,
    price: Number,
    poster: String
}))
const app = express()
// 定义Schema ，Schema为数据库对象的集合。可以理解为表结构的定义 // model是由Schema生成的模型，可以对数据库的操作
const Schema = buildSchema(`
    type Film{
        id:ID,
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
        getDB:[Film],
        getDBById(id:String!):[Film]
    }
    type Mutation{
        createFilm(input:FilmInput):Film,
        updateFilm(id:String!,input:FilmInput):Film,
        deleteFilm(id:String!):Int
    }
`)
const root = {
    getDB: () => {
        return FilmModel.find() // find: 根据条件查询，返回的是数组
    },
    getDBById: ({ id }) => {
        return FilmModel.find({ _id: id })
    },
    createFilm: ({ input }) => {
        return FilmModel.create({ ...input }) // 增加(create)
    },
    updateFilm: ({ id, input }) => {
        return FilmModel.updateOne({ _id: id }, { ...input })
            .then(res => FilmModel.find({ _id: id })).then(res => res[0])
    },
    deleteFilm: ({ id }) => {
        return FilmModel.deleteOne({ _id: id }).then(res => 1)
    }
}
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // 设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Headers", "*") // 允许的header类型
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS") // 跨域允许的请求方式
    if (req.method.toLowerCase() == 'options')
        res.send(200) // 让options尝试请求快速结束
    else
        next()
})
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true
}))
app.use(express.static('public'))
app.listen(4001)

/* 增加 input
mutation{
	createFilm(input: {
		name : "111",
		poster : "http://111",
		price: 10
  }) {
		id,
    name,
    price,
    poster
  }
}
*/

/* 增加 output
{
  "data": {
    "createFilm": {
      "id": "659bb07273ce5b5b3a7d275b",
      "name": "111",
      "price": 10,
      "poster": "http://111"
    }
  }
}
*/

/* 查询 input
query{
  getDB{
    id,
    name,
    price,
    poster
	}
}
*/

/* 查询 output
{
  "data": {
    "getDB": [
      {
        "id": "659bb07273ce5b5b3a7d275b",
        "name": "111",
        "price": 10,
        "poster": "http://111"
      }
    ]
  }
}
*/

/* 修改 input
mutation{
  updateFilm(id: "659bb07273ce5b5b3a7d275b" , input: {
    name : "111-修改",
		price: 20,
		poster: "http://111-修改"
  }){
		id,
    name,
    price,
    poster
  }
}
*/

/* 修改 output
{
  "data": {
    "updateFilm": {
      "id": "659bb07273ce5b5b3a7d275b",
      "name": "111-修改",
      "price": 20,
      "poster": "http://111-修改"
    }
  }
}
*/

/* 删除 input
mutation{
  deleteFilm(id: "659bb06f73ce5b5b3a7d2759")
}
*/

/* 删除 output
{
  "data": {
    "deleteFilm": 1
  }
}
*/

/* 查询 input
query{
  getDB{
    id,
    name,
    price,
    poster
	}
}
*/

/* 查询 output
{
  "data": {
    "getDB": []
  }
}
*/