
type BookCardProps = Record<'image'|'title',string>

const BookCard = ({image,title}:BookCardProps) => {
  return (
    <div className="bookCardContainer">
        <img src={image} alt={`${title}´s image`} />
        <p>{title}</p>
    </div>
  )
}

export default BookCard
