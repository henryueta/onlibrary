import "./OrderContent.component.css";
import { useEffect, useReducer } from "react"
import { LoanTableQueryProps, ReserveTableQueryProps } from "../../../objects/table.object"
import useAxios from "../../../hooks/useAxios"
import TableHome from "../../table/home/TableHome.component"
import HeaderTitle from "../../header_title/HeaderTitle.component"

interface OrderStateProps {

  loanList:LoanTableQueryProps[] | null,
  reserveList:ReserveTableQueryProps[] | null

}

const initialOrderState:OrderStateProps = {

    loanList:null,
    reserveList:null

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
  type:"order",
  value:{
    loanList:LoanTableQueryProps[],
    reserveList:ReserveTableQueryProps[]
  }
}

const onHandleOrderState = (state:OrderStateProps,action:OrderActionType)=>{
    switch (action.type) {
      case "loan":
        return {...state,loanList:action.value}
      case "reserve":
        return {...state,reserveList:action.value}
      case "order":
        return {...state,...{
          loanList:action.value.loanList,
          reserveList:action.value.reserveList
        }}
      default:
        return state
    }
}

const OrderContent = ({id}:{id:string}) => {

    const [orderState,setOrderState] = useReducer(onHandleOrderState,initialOrderState);
    const {onAxiosQuery} = useAxios();
    
    useEffect(()=>{
      !!id
      &&
      (()=>
       { onAxiosQuery("get",{
          url:"http://localhost:5900/reserve/get/user?id="+id,
          type:{
            get:{}
          },
          onResolver:{
            then(result) {
               const reserve_data = result.data as ReserveTableQueryProps[]
               
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
          url:"http://localhost:5900/loan/get/user?id="+id,
          type:{
            get:{}
          },
          onResolver:{
            then(result) {
                const loan_data = result.data as LoanTableQueryProps[]
                setOrderState({
                  type:"loan",
                  value:loan_data
                })
            },
            catch(error) {
                console.log(error)
            },
          }
        })}
      )()

    },[id])

    useEffect(()=>{

      console.log(orderState)

    },[orderState])

  return (
    <section className="orderContentDataSection">
      <section className="headerSection">
          <HeaderTitle
          title="Pedidos"
          />
      </section>
      <section className="loanContentDataSection">
        <HeaderTitle
        title="Empréstimos"
        />
        <div className="dataContentContainer">
          {
            !!orderState.loanList?.length && id
            &&
            <TableHome
            table={orderState.loanList}
            filter={['fk_id_biblioteca','fk_id_usuario','id','0','Username','Bibliotecario']}
            />
          }
        </div>
      </section>
      <section className="reserveContentDataSection">
          <HeaderTitle
          title="Reservas"
          />
          <div className="dataContentContainer">
           {
            !!orderState.reserveList?.length && id
            &&
            <TableHome
            table={orderState.reserveList}
            filter={['fk_id_biblioteca','fk_id_usuario','id','0','Username','tipo']}
            />
          }
          </div>
      </section>
    </section>
  )
}

export default OrderContent
