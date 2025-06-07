import { useReducer } from "react";
import { BookLibrariesProps } from "./useHandleBook";
import useAxios from "./useAxios";
import { ExemplaryTableQueryProps } from "../objects/table.object";


  interface OnlineReserveStateProps {
      libraryData:BookLibrariesProps | null,
      exemplaryQuantity:number | null
  }

  const initialOnlineReserveState:OnlineReserveStateProps = {

    libraryData: null,
    exemplaryQuantity:0

  }

  type ActionOnlineReserveType = 
  {
    type:"libraryData",
    value:BookLibrariesProps | null
  } 
  |
  {
    type:"exemplary",
    value:number | null
  }
    

  const handleOnlineReserveState = (state:OnlineReserveStateProps,action:ActionOnlineReserveType)=>{

    switch (action.type) {
       case "libraryData":  
          return {...state,libraryData:action.value}
        case "exemplary":
          return {...state,exemplaryQuantity:action.value}
      default:
        return state
    }

  }


const useHandleOnlineReserve = ()=>{

    
      const [onlineReserveState,setOnlineReserveState] = useReducer(handleOnlineReserveState,initialOnlineReserveState);
      const {onAxiosQuery} = useAxios();

    const onGetLibraryData = (library_data:object,id:string)=>{
        const current_libraryData = library_data as BookLibrariesProps
         onAxiosQuery("get",{
            url:"http://localhost:3300/exemplary/get?id_biblioteca="+current_libraryData.fk_id_biblioteca+"&id_livro="+id,
            type:{
            get:{}
            },
            onResolver:{
                then(result) {
                    const current_exemplaryListData = result.data as Pick<ExemplaryTableQueryProps,'situacao'>[];
                    const current_exemplaryQuantity = current_exemplaryListData.length
                    setOnlineReserveState({
                    type:"exemplary",
                    value:current_exemplaryQuantity
                    })

                },
                catch(error) {
                    console.log(error)

                },
            }
         })
        
        
         setOnlineReserveState({
            type:"libraryData",
            value:current_libraryData
         })
    }

    const onOnlineReserve = (book:{
        id:string,
        exemplary_quantity:number
    })=>{

        

    }

    return {
        onlineReserveState,
        onGetLibraryData,
        onOnlineReserve
    }

}

export default useHandleOnlineReserve