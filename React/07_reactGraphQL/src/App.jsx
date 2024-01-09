import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import Create from './components/create'
import Query from './components/query'
import ApolloClient from "apollo-boost"

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql'
})
class App extends Component {
    callback = null
    render() {
        return (
            <ApolloProvider client={client}>
                <Create cb={() => {
                    this.callback()
                }} />
                <Query callback={(refetch) => this.callback = refetch} />
            </ApolloProvider>
        )
    }
}
export default App