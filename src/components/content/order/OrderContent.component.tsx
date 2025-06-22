import "./OrderContent.component.css";
import TableHome from "../../table/home/TableHome.component"
import HeaderTitle from "../../header_title/HeaderTitle.component"
import useHandleOrder from "../../../hooks/useHandleOrder";
import useHandlePath from "../../../hooks/useHandlePath";

const OrderContent = ({id}:{id:string}) => {
  const {orderState} = useHandleOrder(id);
  const {currentPathContext} = useHandlePath();

  return (
    <section className={"orderContentDataSection "+currentPathContext.transitionClass}>
      <section className="headerSection">
          <HeaderTitle
          title="Pedidos"
          />
      </section>
      <section className="loanContentDataSection">
        <HeaderTitle
        title="Empréstimos"
        hasHrLine
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
          hasHrLine
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
      <section className="amerceContentContainer">
          <HeaderTitle
          title="Multas"
          hasHrLine
          />
          <div className="dataContentContainer">
            {
              !!orderState.amerceList?.length && id
              ? <TableHome
              table={orderState.amerceList}
              filter={['id','fk_id_usuario','fk_id_biblioteca','0','Username']}
              />
              : <p>Nenhuma multa encontrada</p>
            }
          </div>
            
      </section>
    </section>
  )
}

export default OrderContent
