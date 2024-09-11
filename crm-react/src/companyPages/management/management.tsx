import React from 'react'
import { decodeToken } from '@/utils/jwtHelper'
export default function management() {
  
  console.log(decodeToken())
  return (
    <div className='pt-10'>management</div>
  )
}
