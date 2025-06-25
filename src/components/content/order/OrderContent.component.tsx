import "./OrderContent.component.css";
import TableHome from "../../table/home/TableHome.component"
import HeaderTitle from "../../header_title/HeaderTitle.component"
import useHandleOrder from "../../../hooks/useHandleOrder";
import useHandlePath from "../../../hooks/useHandlePath";
import NoData from "../../empty/NoData.component";

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
            ? <TableHome
            table={orderState.loanList}
            filter={['fkIdBiblioteca','fkIdUsuario','id','0','Username','Bibliotecário']}
            />
            : <NoData
              dataType="emprestimo"
              gender="M"              
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
            ? <TableHome
            table={orderState.reserveList}
            filter={['fkIdBiblioteca','fkIdUsuario','id','0','Username','tipo']}
            />
            : <NoData
              dataType="reserva"
              gender="F"              
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
              filter={['id','fkIdBiblioteca','fkIdUsuario','0','Username']}
              />
              : <NoData
                dataType="multa"
                gender="F"              
              />
            }
          </div>
            
      </section>
    </section>
  )
}

export default OrderContent
