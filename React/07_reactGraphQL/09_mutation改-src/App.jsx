import React, { Component } from 'react'
import { ApolloProvider, Mutation } from 'react-apollo'
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
    /*
    state = {
        name: "",
        poster: "",
        price: null
    }
    createFilm = gql`
        mutation createFilm($input: FilmInput){
            createFilm(input:$input) {
                id,
                name,
                price,
                poster
            }
        }`
    */
    /* updateFilm */
    updateFilm = gql`
        mutation updateFilm($id:String!,$input: FilmInput){
            updateFilm(id:$id,input:$input) {
                id,
                name,
                price,
                poster
            }
        }`
    render() {
        return (
            <div style={{ margin: '0 auto', width: '200px' }}>
                {/* <input type="text" onChange={(event) => { this.setState({ name: event.target.value }) }} style={{ width: '220px' }} placeholder='name' /> */}
                {/* <input type="text" onChange={(event) => { this.setState({ poster: event.target.value }) }} style={{ width: '220px' }} placeholder='poster' /> */}
                {/* <input type="text" onChange={(event) => { this.setState({ price: event.target.value }) }} style={{ width: '220px' }} placeholder='price' /> */}
                {/* <Mutation mutation={this.createFilm}> */}
                <Mutation mutation={this.updateFilm}>
                    {
                        // (createFilm, { data }) => {
                        (updateFilm, { data }) => {
                            console.log(data)
                            return <div>
                                <button onClick={() => {
                                    // createFilm({
                                    updateFilm({
                                        variables: {
                                            id: "659cd8510bbf66447434cfc5",
                                            input: {
                                                name: "444-修改",
                                                poster: "http://444-修改",
                                                price: 44
                                            }
                                        }
                                    })
                                // }}>ADD-FILM</button>
                                }}>UPDATE-FILM</button>
                            </div>
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default App