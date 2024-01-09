import React, { Component } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Delete from "./delete"

class query extends Component {
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
                    ({ loading, data, refetch }) => {
                        this.props.callback(refetch)
                        return loading ? <div>NOW{'>>>'}Loading</div> :
                            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                                {
                                    data.getDB.map(item => {
                                        return <div key={item.id} style={{ padding: '10px', lineHeight: '2' }}>
                                            <div>NAME:{item.name}</div>
                                            <div>POSTER:{item.poster}</div>
                                            <div>PRICE:{item.price}</div>
                                            <div>ID:{item.id}</div>
                                            <Delete id={item.id} cb={() => {
                                                refetch()
                                            }
                                            } />
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
export default query