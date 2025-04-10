import { useState } from "react"

type ItemIdentityProps = Record<'title'|'icon',string>

interface ItemContentProps{
    onClickProp?:()=>void
    hasIcon:boolean,
    hasRedirectTo:boolean,
    redirectTo?:string,
    children?:React.ReactElement
}

type ItemDetailsProps = Partial<ItemIdentityProps> & ItemContentProps

type DetailsProps = ItemIdentityProps & Record<'list',ItemDetailsProps[]> & ItemContentProps

const Details = ({onClickProp,hasIcon,hasRedirectTo,redirectTo,title,icon,list}:DetailsProps) => {
  return (
    <details >
        <summary onClick={onClickProp}>  
            {
                hasIcon &&(
                    <img src={icon} alt={title+"_icon"} />
                )
            }
            {title}
        </summary>
        <ul>
         {
            list.map((item,index)=>
                <li key={index}>
                    {item.hasIcon 
                        &&(
                            <img src={item.icon} alt={item.title+"_icon"}/>
                        )
                    }
                    {
                        item?.title
                        &&
                        (
                        <span>
                            {item.title}
                        </span>
                        )
                    }
                    {item.children}
                </li>
            )
         }
        </ul>
    </details>
  )
}

export default Details
