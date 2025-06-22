import { useEffect,useReducer } from "react"
import { BookTableQueryProps } from "../objects/table.object"
import useAxios from "./useAxios"
import useImageResizer from "./useImageResizer"


export interface BookLibrariesProps {
    cep:string
    endereco:string
    fk_id_biblioteca:string
    fk_id_livro:string
    nome:string
    quantidade:number
    quantidade_disponivel:number
    reserva_online:boolean
    telefone:string
}

interface BookStateProps {
    cape:string,
    data:BookTableQueryProps | null,
    libraries:BookLibrariesProps[] | null
}

const initialBookState:BookStateProps = {
    cape:"",
    data:null,
    libraries:null
}

type BookActionType = 
{
    type:"cape",
    value:string
}
|
{
    type:"data",
    value:BookTableQueryProps
}
|
{
    type:"libraries",
    value:BookLibrariesProps[]
}

const handleBookState = (state:BookStateProps,action:BookActionType)=>{
    switch (action.type) {
        case "cape":
            return {...state,cape:action.value}
        case "data":
            return {...state,data:action.value}
        case "libraries":
            return {...state,libraries:action.value}
        default:
            return state
    }
}

const useHandleBook = (id:string,imageResize:{
  width:number,
  height:number
})=>{

const [bookState,setBookState] = useReducer(handleBookState,initialBookState);

  const {getImage,currentImage} = useImageResizer();

  useEffect(()=>{
    !!bookState.data
    &&
    getImage({
      url:bookState.data.imagem,
      mimetype:"image/webp",
      name:"bookImage.webp",
      resize:{
        format:"WEBP",
        height:550,
        width:344,
        quality:80
      }
    })

  },[bookState.data])

const {onAxiosQuery} = useAxios()

 useEffect(()=>{

    onAxiosQuery("get",{
      url:"http://localhost:4200/book/get?id="+id,
      type:{
        get:{
          
        }
      },
      onResolver:{
        then(result) {
          const book_data = result.data as BookTableQueryProps;
          setBookState({
            type:"data",
            value:book_data
          })
        },
        catch(error) {
          console.log(error)
        },
      }
    })



    onAxiosQuery("get",{
      url:"http://localhost:4200/book/libraries?id="+id,
      type:{
        get:{

        }
      },
      onResolver:{
        then(result) {
          const bookLibraries_data = result.data as BookLibrariesProps[]
          setBookState({
            type:"libraries",
            value:bookLibraries_data
          })
        },
        catch(error) {
          console.log(error)
        },
      }
    })

  },[id])

  useEffect(()=>{
   
      !!bookState.data
      &&
    //   setBookCape(bookData?.capa)
      setBookState({
        type:"cape",
        value:bookState.data.imagem
      })
      
    },[bookState.data])

    
    useEffect(()=>{
      !!currentImage
      &&
      (()=>{
        setBookState({
        type:"cape",
        value:currentImage
      })
     
      })()
    },[currentImage])



return {
    bookState
}

}

export default useHandleBook