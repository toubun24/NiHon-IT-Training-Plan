import React from 'react' // , { Component }
import { useParams } from 'react-router-dom' // useParams

const DetailData = [ // const data not state // []
    { id: "01", content: 'content1' }, // {},
    { id: "02", content: 'content2' },
    { id: "03", content: 'content3' }
]

export default function Detail() { // function
    const { id, title } = useParams() // React Hooks // 返回对象，对其解构
    const findDetailData = DetailData.find((detailobj) => { // find
        return detailobj.id === id
    })
    return( // return not render
        <div>
            <li>ID:{id}</li>
            <li>TITLE:{title}</li>
            <li>CONTENT:{findDetailData.content}</li>
        </div>
    )
}