import React, { Component } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

class Create extends Component {
    myname = React.createRef()
    myposter = React.createRef()
    myprice = React.createRef()
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
        return <div style={{ textAlign: 'center' }}>
            <p>
                NAME: <input type="text" ref={this.myname} />
            </p>
            <p style={{ textIndent: '1em' }}>
                POSTER: <input type="text" ref={this.myposter} />
            </p>
            <p>
                PRICE: <input type="text" ref={this.myprice} />
            </p>
            <Mutation mutation={this.createFilm}>
                {
                    (createFilm, { data }) => {
                        console.log(data)
                        return <div>
                            <button onClick={() => {
                                createFilm({
                                    variables: {
                                        input: {
                                            name: this.myname.current.value,
                                            poster: this.myposter.current.value,
                                            price: Number(this.myprice.current.value)
                                        }
                                    }
                                }).then(res => {
                                    this.props.cb()
                                    this.myname.current.value = ''
                                    this.myposter.current.value = ''
                                    this.myprice.current.value = ''
                                })
                            }} >ADD</button>
                        </div>
                    }}
            </Mutation>
        </div>
    }
}
export default Create