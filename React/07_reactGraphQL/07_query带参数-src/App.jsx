import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
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
    state = { // state
        id: "659bb8e27056b78b046e9efe" // id // 659bb8e87056b78b046e9f00
    }
    /* getDBById */
    query = gql`
        query getDBById($id:String!){
            getDBById(id:$id) {
                name,
                id,
                price,
                poster
            }
        }`
    render() {
        return (
            <div style={{ margin: '0 auto', width: '200px' }}>
            {/* div style */}
                <input type="text" onChange={(event) => { this.setState({ id: event.target.value }) }} style={{ width: '220px' }} />
                {/* input: onChange={(event) => { this.setState({ id: event.target.value }) }} */}
                <Query query={this.query} variables={{ id: this.state.id }}>
                {/* variables={{id:this.state.id}} */}
                {/* 单写一行，否则报错'children is not a function' */}
                    {
                        ({ loading, data }) => {
                            return loading ? <div>NOW{'>>>'}Loading</div> :
                                <div> {/* <div style={{ margin: "0 auto", width: "200px" }}> */}
                                    {
                                        // data.getDB.map(item => {
                                        data.getDBById.map(item => {
                                            console.log(item) // log
                                            return <div key={item.id}>
                                                <div>NAME:{item.name}</div>
                                                <div>POSTER:{item.poster}</div>
                                                <div>PRICE:{item.price}</div>
                                                <div>ID:{item.id}</div>
                                                <div>---------------------------</div>
                                            </div>
                                        })
                                    }
                                </div>
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default App