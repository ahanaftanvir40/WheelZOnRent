import React from 'react'
import { CheckOutCard } from '../components'

function CheckOut({amount}) {
  return (
    <div>
        <h1>CheckOut</h1>
        <CheckOutCard amount = {amount} />
    </div>
  )
}

export default CheckOut