import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

export default function Input(props) {
  const {darkTheme} = useContext(UserContext);
  return (
    <input {...props} className={`py-2 px-4 rounded-xl outline-none ${darkTheme ? "bg-gray-700" : "bg-gray-100"} ${props.className}`} />
  )
}
