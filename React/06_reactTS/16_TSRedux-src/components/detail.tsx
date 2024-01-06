// components/detail.tsx

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom' // useParams
import store from '../redux/store'

const Detail: React.FC<{}> = () => {
    useEffect(() => {
        store.dispatch({
            type: 'hide'
        })
            return () => {store.dispatch({
                type: 'show'
            })}
    },[])
    const {id} = useParams()
    return (
        <div>
            <h2>Detail</h2>
            <h3>当前电影ID为:{id}</h3>
        </div>
    )
}
export default Detail