import { useEffect, useState } from "react"
import FileResizer from "react-image-file-resizer"

export interface ResizeProps {
    width:number,
    height:number,
    format:"JPEG"|"PNG"|"WEBP",
    quality:number
}

interface ImageResizerProps {
    url:string,
    name:string
    mimetype:string
    resize:ResizeProps
}

const useImageResizer = (image?:ImageResizerProps)=>{

    const [currentImage,setCurrentImage] = useState<string | null >(null);

  useEffect(()=>{
     
  },[currentImage])

const urlConvert = async (url:string,fileName:string,mimeType:string)=>{
        const res = await fetch(url)
        const buffer = await res.blob()
        return !!buffer && new File([buffer],fileName,{
          type:mimeType
        })
      }

const getImage = async(image:ImageResizerProps)=>{


       const result = await urlConvert(
        image.url,
        image.name,
        image.mimetype
      )
           FileResizer.imageFileResizer(
      result,
      image.resize.width,
      image.resize.height,
      image.resize.format,
      image.resize.quality,
      0,
      (uri)=>{
        const convertedImage = uri as string;
        setCurrentImage(convertedImage)
      },
      "base64"
        ) 
      }

      useEffect(()=>{

        (async()=>{
          !!image
          &&
            await getImage(image)
        })()

      },[])

      return {
        getImage,
        currentImage
     }

     }

     



export default useImageResizer