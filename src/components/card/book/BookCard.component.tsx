import { useNavigate } from "react-router-dom"

type BookCardProps = Record<'image'|'title'|'id',string>

const BookCard = ({image,title,id}:BookCardProps) => {

  const onNavigate = useNavigate();

  return (
    <div onClick={()=>{onNavigate("/book/"+id)}} className="bookCardContainer">
        <img src={image} alt={`${title}´s image`} />
        <p>{title}</p>
    </div>
  )
}

export default BookCard
