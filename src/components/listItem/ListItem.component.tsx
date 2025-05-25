
interface ListItemProps{
icon?:string
title?:string    
keyList?:string | number
children?:React.ReactNode
style?:React.CSSProperties
onClick?:()=>void
}

const ListItem = ({icon,title,keyList,children,style,onClick}:ListItemProps) => {
  return (
    <li style={style} key={keyList} onClick={onClick}>
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
