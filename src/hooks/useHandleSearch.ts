import { useState } from "react"

const useHandleSearch = ()=>{

    const [searchValue,setSearchValue] = useState<string>("");
    
    const onSearch = (value:string,quantity:number,filter?:any)=>{

        

    }   

    return {
        onSearch
    }


}

export default useHandleSearch