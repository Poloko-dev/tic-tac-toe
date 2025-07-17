import React from 'react'

export default function Square({value, onClick}) {
  return (
   <button className='square' onClick={onClick} 
    style={{ color: 'black' }}>
    {value}
   </button>
  )
}
