import { useState } from "react"

type ItemIdentityProps = Record<'title'|'icon',string>

interface ItemContentProps{
    hasIcon:boolean,
    hasRedirectTo:boolean,
    redirectTo?:string,
    children?:React.ReactElement
}

type ItemDetailsProps = Partial<ItemIdentityProps> & ItemContentProps

type DetailsProps = ItemIdentityProps & Record<'list',ItemDetailsProps[]> & ItemContentProps

const Details = ({hasIcon,hasRedirectTo,redirectTo,title,icon,list}:DetailsProps) => {
    const [summary,setSummary] = useState<React.ReactElement>(<summary>
        
        {
            hasIcon &&(
                <img src={icon} alt={title+"_icon"} />
            )
        }
        {title}
    </summary>);
  return (
    <details>
        {summary}
        <ul>
         {
            list.map((item,index)=>
                <li key={index}>
                    {item.hasIcon &&
                    (
                    <img src={item.icon} alt={item.title+"_icon"}/>
                    )
                    }
                    {
                        hasRedirectTo 
                        ? <a href={item.redirectTo}>
                        {
                            item?.title
                            &&
                            (
                            <span>
                                {item.title}
                            </span>
                            )
                        }
                        </a>
                        : item?.title
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
