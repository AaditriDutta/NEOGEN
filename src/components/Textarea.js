import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

export default function Textarea(props) {
    const {darkTheme} = useContext(UserContext);
    const classes= `rounded-xl px-4 py-2 outline-none ${
        darkTheme
          ? "bg-gray-700"
          : "bg-gray-100"
      }`
  // return <textarea {...props} className={`${classes} ${props.className}`} />
  return <textarea rows={props.rows ? props.rows : "4"} {...props} className={`${classes} ${props.className}`} />
}
