import React from 'react'

const Button = ({text,icon,func}) => {

  return (
    <button onClick={func} className='bg-white flex items-center justify-center gap-1 p-1 px-2 border border-gray-400 text-gray-600 font-medium text-sm rounded-md'>{text && text} {icon && icon} </button>
  )
}

export default Button
