import React, { Component } from 'react'
import { ApolloProvider, Mutation } from 'react-apollo' // Query => Mutation
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql'
})

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <Child />
                </div>
            </ApolloProvider>
        )
    }
}

class Child extends Component {
    // state = { id: "659bb8e27056b78b046e9efe" }
    state = { // test
        name: "",
        poster: "",
        price: null
    }
    /*
    query = gql`
        query getDBById($id:String!){
            getDBById(id:$id) {
                name,
                id,
                price,
                poster
            }
        }`
    */
    /* createFilm增 */
    createFilm = gql`
        mutation createFilm($input: FilmInput){
            createFilm(input:$input) {
                id,
                name,
                price,
                poster
            }
        }`
    render() {
        return (
            <div style={{ margin: '0 auto', width: '200px' }}>
                <input type="text" onChange={(event) => { this.setState({ name: event.target.value }) }} style={{ width: '220px' }} placeholder='name' />
                <input type="text" onChange={(event) => { this.setState({ poster: event.target.value }) }} style={{ width: '220px' }} placeholder='poster' />
                <input type="text" onChange={(event) => { this.setState({ price: event.target.value }) }} style={{ width: '220px' }} placeholder='price' />
                {/* <Query ... /> */}
                <Mutation mutation={this.createFilm}>
                    {
                        (createFilm, { data }) => {
                            console.log(data) // 意义不明x
                            // console.log("444",40)
                            // console.log(this.state.name,this.state.poster,this.state.price)
                            return <div>
                                <button onClick={() => {
                                    createFilm({
                                        variables: {
                                            input: {
                                                name: this.state.name, // "444"
                                                poster: this.state.poster, // "http://444"
                                                price: Number(this.state.price) // 40 // Number
                                            }
                                        }
                                    })
                                }}>ADD-FILM</button>
                            </div>
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default App