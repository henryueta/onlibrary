import { useState } from "react"
import ListItem from "../listItem/ListItem.component"

type ItemIdentityProps = {
    title?:string,
    icon?:string
}

interface ItemContentProps{
    onClick?:()=>void
    children?:React.ReactNode
}

type ItemDetailsProps = Partial<ItemIdentityProps> & ItemContentProps

type DetailsProps = ItemIdentityProps & Record<'list',ItemDetailsProps[]> & ItemContentProps

const Details = ({onClick,title,icon,list}:DetailsProps) => {
  return (
    <details >
        <summary onClick={onClick}>  
            {
                !!icon &&(
                    <img src={icon} alt={title+"_icon"} />
                )
            }
            {title}
        </summary>
        <ul>
         {
            list.map((item,index)=>
                <ListItem icon={item.icon} title={item.title} key={index} onClick={item.onClick}> 
                     {item.children}
                </ListItem>
            )
         }
        </ul>
    </details>
  )
}

export default Details
