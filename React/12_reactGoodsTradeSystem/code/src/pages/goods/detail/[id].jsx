import React from 'react'
import { useParams } from 'umi'; // useParams

export default function Goods() {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  return (
    <div>Goods{params.id}</div>
  )
}
