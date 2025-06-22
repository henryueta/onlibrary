import { useEffect, useState } from "react";
import useImageResizer, { ResizeProps } from "../../../hooks/useImageResizer";
import useHandlePath from "../../../hooks/useHandlePath";


type BookCapeProps = Pick<ResizeProps,"height"|"width"> & Record<"url",string>

type BookCardProps =
 Record<'title'|'id',string> 
 & 
 Record<'image',BookCapeProps>


const BookCard = ({image,title,id}:BookCardProps) => {

  const {onTransition} = useHandlePath();
  const [imageView,setImageView] = useState<string>();
  const {currentImage} = useImageResizer({
    url:image.url,
    mimetype:"image/webp",
    name:"bookImage.webp",
    resize:{
      format:"WEBP",
      height:image.height,
      width:image.width,
      quality:80
    }
  })

  useEffect(()=>{
    !!currentImage
    && 
    setImageView(currentImage)
  },[currentImage])

  return (
    <div onClick={()=>{onTransition("/book/"+id)}} className="bookCardContainer">
        <img src={imageView} alt={`${title}´s image`} />
        <p>{title}</p>
    </div>
  )
}

export default BookCard
