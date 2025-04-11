import { Key } from "react";

interface ListItemProps{
icon?:string
title?:string    
key?:Key
children?:React.ReactNode
onClick?:()=>void
}

const ListItem = ({icon,title,key,children,onClick}:ListItemProps) => {
  return (
    <li key={key} onClick={onClick}>
        {
            !!icon && 
            (
                <img src={icon} alt={title+"_icon"} />
            )
        }
        {
            !!title &&
            (
                <span>
                    {title}
                </span>
            )
        }
        {children}
    </li>
  )
}

export default ListItem
