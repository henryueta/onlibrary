import { useEffect, useReducer } from "react"
import useAxios from "./useAxios"
import { AmerceTableQueryProps, LoanTableQueryProps, ReserveTableQueryProps } from "../objects/table.object"

interface OrderStateProps {

  loanList:LoanTableQueryProps[] | null,
  reserveList:ReserveTableQueryProps[] | null
  amerceList:AmerceTableQueryProps[] | null
}

const initialOrderState:OrderStateProps = {

    loanList:null,
    reserveList:null,
    amerceList:null
}

type OrderActionType = 
{
  type:"loan"
  value:LoanTableQueryProps[]
}
|
{
  type:"reserve",
  value:ReserveTableQueryProps[]
}
|
{
  type:"amerce",
  value:AmerceTableQueryProps[]
}
|
{
  type:"order",
  value:{
    loanList:LoanTableQueryProps[],
    reserveList:ReserveTableQueryProps[],
    amerceList:AmerceTableQueryProps[]
  }
}

const onHandleOrderState = (state:OrderStateProps,action:OrderActionType)=>{
    switch (action.type) {
      case "loan":
        return {...state,loanList:action.value}
      case "reserve":
        return {...state,reserveList:action.value}
      case "amerce":
        return {...state,amerceList:action.value}
      case "order":
        return {...state,...{
          loanList:action.value.loanList,
          reserveList:action.value.reserveList,
          amerceList:action.value.amerceList
        }}
      default:
        return state
    }
}



const useHandleOrder = (id:string)=>{

    const [orderState,setOrderState] = useReducer(onHandleOrderState,initialOrderState);
    const {onAxiosQuery} = useAxios();

    useEffect(()=>{
          !!id
          &&
          (()=>
           { 
            onAxiosQuery("get",{
              url:"https://onlibrary-api.onrender.com/api/reserva/user/"+id,
              type:{
                get:{}
              },
              onResolver:{
                then(result) {
                   const reserve_data = result.data.data as ReserveTableQueryProps[]
                   
                   setOrderState({
                    type:"reserve",
                    value:reserve_data
                   })
                },
                catch(error) {
                    console.log(error)
                },
              }
            })
    
            onAxiosQuery("get",{
              url:"https://onlibrary-api.onrender.com/api/emprestimo/user/"+id,
              type:{
                get:{}
              },
              onResolver:{
                then(result) {
                    const loan_data = result.data.data as LoanTableQueryProps[]
                    setOrderState({
                      type:"loan",
                      value:loan_data
                    })
                },
                catch(error) {
                    console.log(error)
                },
              }
            })
    
            onAxiosQuery("get",{
              url:"https://onlibrary-api.onrender.com/api/multa/user/"+id,
              type:{
                get:{}
              },
              onResolver:{
                then(result) {
                  const amerce_data = result.data.data as AmerceTableQueryProps[]
                  setOrderState({
                    type:"amerce",
                    value:amerce_data
                  })
                },
                catch(error) {
                  console.log(error)
                },
              }
            })
          }
          )()
    
        },[id])

    return {
        orderState
    }

}

export default useHandleOrder