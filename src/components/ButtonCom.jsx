import React from 'react'

const ButtonCom = ({label,onClick}) => {
    return (
        <button type="submit" onClick={onClick} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 w-20 rounded-md mb-4">{label}</button>
    )
}

export default ButtonCom