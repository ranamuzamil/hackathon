import React from 'react'

const Card = (props) => {

  return (
    <div className={`w-72 h-36 rounded-xl text-center text-gray-100 p-2 font-serif  ${props.classByProps}`}>
        {props.text}
        <hr/>
        {props.contented}


    </div>
  )
}

export default Card
