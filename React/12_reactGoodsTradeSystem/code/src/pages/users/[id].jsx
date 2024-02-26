import React from 'react'
import { useParams } from 'umi'

export default function User() {
    const params=useParams();
  return (
    <div>User{params.id}</div>
  )
}
