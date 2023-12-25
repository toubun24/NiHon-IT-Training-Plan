import React from 'react'
import { useSearchParams } from 'react-router-dom' // useSearchParams

const DetailData = [
    { id: "01", content: 'content1' },
    { id: "02", content: 'content2' },
    { id: "03", content: 'content3' }
]

export default function Detail() {
    /*
    const { id, title } = useParams()
    const findDetailData = DetailData.find((detailobj) => {
        return detailobj.id === id
    })
    */
    const [params] = useSearchParams() // Hooks
    const id = params.getAll('id')[0]
    const title = params.getAll('title')[0]
    const finddetaildata = DetailData.find((detailobj) => {
        return detailobj.id === id
    })
    return (
        <div>
            <li>ID:{id}</li>
            <li>TITLE:{title}</li>
            <li>CONTENT:{finddetaildata.content}</li>
        </div>
    )
}