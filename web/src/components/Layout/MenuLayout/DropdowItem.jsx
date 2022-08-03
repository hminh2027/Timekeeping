import React from 'react'

const DropdowItem = ({title,onclick,...props}) => {
  return (
    <div onClick={onclick} className="hover:cursor-pointer flex flex-row items-center  py-3 px-4 hover:bg-gray-300 hover:rounded-lg">
       {props.icon}
       <p className="ml-2 text-lg justify-center text-center font-extrabold text-black">{title}</p>
    </div>
  )
}

export default DropdowItem