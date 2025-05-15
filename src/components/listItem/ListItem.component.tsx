
interface ListItemProps{
icon?:string
title?:string    
keyList?:string | number
children?:React.ReactNode
onClick?:()=>void
}

const ListItem = ({icon,title,keyList,children,onClick}:ListItemProps) => {
  return (
    <li key={keyList} onClick={onClick}>
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
