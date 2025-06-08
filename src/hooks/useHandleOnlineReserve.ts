import { useEffect, useReducer, useState } from "react";
import { BookLibrariesProps } from "./useHandleBook";
import useAxios, { QueryStateProps } from "./useAxios";
import { ExemplaryTableQueryProps, tableRoutes } from "../objects/table.object";
import useHandleAuth from "./usehandleAuth";


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
      const {onAxiosQuery,queryState} = useAxios();
      const {authContext} = useHandleAuth();
      
      const [reserveQueryState,setReserveQueryState] = useState<QueryStateProps>(queryState);

      useEffect(()=>{

        setReserveQueryState(queryState)

      },[queryState])

      useEffect(()=>{

        console.log(reserveQueryState)

      },[reserveQueryState])

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

    const onOnlineReserve = (library_id:string,book:{
        id:string,
        exemplary_quantity:number
    })=>{

        onAxiosQuery("post",{
          url:tableRoutes['reserve'].put,
          type:{
            post:{
              data:{
                fk_id_biblioteca:library_id,
                fk_id_usuario:authContext.userId,
                fk_id_bibliotecario:null,
                fk_id_livro:book.id,
                tipo:"online",
                quantidade_total:book.exemplary_quantity
              }
            }
          },
          onResolver:{
            then(result) {
              console.log(result)
            },
            catch(error) {
              console.log(error)
            },
          }

        })

    }

    return {
        onlineReserveState,
        onGetLibraryData,
        onOnlineReserve,
        reserveQueryState
    }

}

export default useHandleOnlineReserve