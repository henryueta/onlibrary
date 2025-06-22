import { useHandleCategory } from "../../../context/CategoryContext"
import GroupBook from "../book/GroupBook.component"

const GroupByCategory = () => {

    const {categoryList} = useHandleCategory();

  return (
    <>
        {
            [...categoryList].map((categoryBook)=>{
                return (
                    <GroupBook
                        title={categoryBook.nome} 
                        category={categoryBook.id}
                    />
                ) 
                
            })
        }
    </>
  )
}

export default GroupByCategory
