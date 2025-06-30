import { createContext, useContext, useEffect, useState } from "react"
import useAxios from "../hooks/useAxios";
import axios from "axios";

type CategoryType = Record<'nome'|'id',string>

interface CategoryProps {
    categoryList:CategoryType[]
}


const CategoryContext = createContext({} as CategoryProps)

const CategoryProvider = ({children}:{children:React.ReactNode}) => {

        const {onAxiosQuery} = useAxios();
        const [categoryList,setCategoryList] = useState<CategoryType[]>([]);
      
              useEffect(()=>{

                const source = axios.CancelToken.source()
                  onAxiosQuery("get",{
                    url:"https://onlibrary-api.onrender.com/api/categoria",
                    type:{
                      get:{
            
                      }
                    },
                    onResolver:{
                      then(result) {
                        const category_data = result.data.data as CategoryType[]
                        const category_id_list:Set<CategoryType> = new Set([]);
                            const random_limit = (category_data.length);
                            const id_list = category_data.map((cat)=>cat);
                            const limit = 
                            category_data.length < 4
                            ? category_data.length
                            : 4


                            while(category_id_list.size < limit){
                                const random_id = Math.floor(Math.random()*random_limit+0);
                                category_id_list.add(id_list[random_id])
                            }
                            
    
                        setCategoryList([...category_id_list])
                      },
                      catch(error) {
                        console.log(error)
                      },
                    }
                  },source.token)
            
                },[])
    

  return (
    <CategoryContext.Provider value={{categoryList}}>
        {children}
    </CategoryContext.Provider>
  )
}

const useHandleCategory = ()=>{
    const context = useContext(CategoryContext)
    return context
}

export {
    CategoryContext,
    CategoryProvider,
    useHandleCategory
}
