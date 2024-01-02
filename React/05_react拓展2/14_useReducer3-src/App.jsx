// import React, { useState, useEffect, useContext } from 'react'
import React, { useEffect, useContext, useReducer } from 'react'
import axios from "axios"
import './App.css'

const context = React.createContext()
const initialState = { list: [], info: '' } // initialState

const reducer = (prevstate, actions) => { // reducer
    const newstate = { ...prevstate }
    switch (actions.type) {
        case 'change-list':
            newstate.list = actions.value
            return newstate
        case 'change-info':
            newstate.info = actions.value
            return newstate
        default:
            return prevstate
    }
}

export default function App() {
    // const [list, setlist] = useState([])
    // const [info, setinfo] = useState("")
    const [state, dispatch] = useReducer(reducer, initialState) // useReducer
    useEffect(() => {
        axios.get("/test.json").then((response) => {
            // setlist(response.data.data.films)
            dispatch({ type: 'change-list', value: response.data.data.films }) // dispatch
        })
    }, [])

    return (
        < context.Provider value={{ state, dispatch }}> {/* <context.Provider value={{ info: info, changeInfo: (value) => { setinfo(value) } }}> */}
            <div>
                {
                    // list.map(item =>
                    state.list.map(item=> // state.
                        <FilmItem key={item.filmId} {...item} ></FilmItem>
                    )
                }
                <Detail />
            </div>
        </context.Provider >
    )
}

function FilmItem(props) {
    const { name, poster, grade, synopsis } = props;
    // const value = useContext(context)
    const {dispatch} = useContext(context) // dispatch
    return <div className="filmitem" onClick={() => {
        // value.changeInfo(synopsis)
        dispatch({type: 'change-info',value:synopsis}) // dispatch
    }}>
        <img src={poster} alt={name} />
        <h4>{name}</h4>
        <div>观众评分：{grade}</div>
    </div>

}

function Detail() {
    // const value = useContext(context)
    const {state} = useContext(context)
    return <div className="filmdetail">
        {/* {value.info} */}
        {state.info}
    </div>
}