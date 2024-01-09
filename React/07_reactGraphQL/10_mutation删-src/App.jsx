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
    /*
    updateFilm = gql`
        mutation updateFilm($id:String!,$input: FilmInput){
            updateFilm(id:$id,input:$input) {
                id,
                name,
                price,
                poster
            }
        }`
    */
    deleteFilm = gql`
        mutation deleteFilm($id:String!){
            deleteFilm(id:$id)
        }`
    render() {
        return (
            <div style={{ margin: '0 auto', width: '200px' }}>
                {/* <Mutation mutation={this.updateFilm}> */}
                <Mutation mutation={this.deleteFilm}>
                    {
                        // (updateFilm, { data }) => {
                        (deleteFilm, { data }) => {
                            console.log(data)
                            return <div>
                                <button onClick={() => {
                                    // updateFilm({
                                    deleteFilm({
                                        variables: {
                                            id: "659cddbc0bbf66447434cfcf" // ,
                                            /*
                                            input: {
                                                name: "444-修改",
                                                poster: "http://444-修改",
                                                price: 44
                                            }
                                            */
                                        }
                                    })
                                    // }}>UPDATE-FILM</button>
                                }}>DELETE-FILM</button>
                            </div>
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default App