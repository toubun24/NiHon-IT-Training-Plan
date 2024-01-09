import React, { Component } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

class Delete extends Component {
    deleteFilm = gql`
        mutation deleteFilm($id:String!){
            deleteFilm(id:$id)
        }`
    render() {
        return <div>
            <Mutation mutation={this.deleteFilm}>
                {
                    (deleteFilm, { data }) => {
                        return <div>
                            <button onClick={() => {
                                deleteFilm({
                                    variables: {
                                        id: this.props.id
                                    }
                                }).then((response) => this.props.cb())
                            }}>DELETE</button>
                        </div>
                    }}
            </Mutation>
        </div>
    }
}
export default Delete