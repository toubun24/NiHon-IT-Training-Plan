// npm install express express-graphql graphql mongoose
// node 01_helloWorld.js

const express = require('express') // File is a CommonJS module; it may be converted to an ES module
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql') // v0.10.0 之后，需要使用{graphqlHTTP}
const app = express()
/* 描述轮廓 */
const Schema = buildSchema(`
  type Query{
    hello: String,
    getName: String,
    getAge: Int
  }
`)
const root = { // 处理器
  hello: () => {
    const result = 'hello-graphQL' // 也可以直接return
    return result
  },
  getName: () => {
    return 'xiaoming'
  },
  getAge: () => {
    return 100
  }
}
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true // 开启调试工具GraphiQL
}))
app.listen(4001)

/* input
query {
  hello,
  getAge,
  getName
}
*/

/* output
{
  "data": {
    "hello": "hello-graphQL",
    "getAge": 100,
    "getName": "xiaoming"
  }
}
*/