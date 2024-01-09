// npm install react-apollo apollo-boost graphql-tag // @apollo/client

import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo' // '@apollo/client'
import { Query } from 'react-apollo' // '@apollo/client/react/components'
import ApolloClient from 'apollo-boost' // '@apollo/client'
import gql from 'graphql-tag' // '@apollo/client'
// import { ApolloClient, ApolloProvider, gql } from '@apollo/client'

/*
import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
import { ApolloClient, ApolloProvider, gql } from '@apollo/client'
*/

/*
import React, { Component } from 'react'
import { ApolloProvider } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
*/

//实例化新客户端并提供uri属性，该属性为 GraphQL 端点
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
    // noinspection GraphQLUnresolvedReference
    query = gql`
        query {
            getDB {
                name,
                id,
                price,
                poster
            }
        }`
    render() {
        return (
            <Query query={this.query}>
                {
                    ({ loading, data }) => {
                        return loading ? <div>NOW{'>>>'}Loading</div> : // >>> => {'>>>'}
                            <div style={{ margin: "0 auto", width: "200px" }}>
                                {
                                    data.getDB.map(item => {
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
        )
    }
}

export default App