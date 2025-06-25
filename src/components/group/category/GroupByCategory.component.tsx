import { useHandleCategory } from "../../../context/CategoryContext"
import Spinner from "../../spinner/Spinner.component";
import GroupBook from "../book/GroupBook.component"

const GroupByCategory = () => {

    const {categoryList} = useHandleCategory();
    const defaultLoadArray = ['','','',''] 

  return (
    <>
        {
            !!categoryList.length
            ?
            [...categoryList].map((categoryBook)=>{
                return (
                    <GroupBook
                        title={categoryBook.nome} 
                        category={categoryBook.id}
                    />
                ) 
                
            })
            : defaultLoadArray.map(()=>{
                return <section className="listBookSection">
                    <Spinner/>
                </section>
            })
        }
    </>
  )
}

export default GroupByCategory
