import { useEffect, useState } from "react"
import {  AssociationTableProps, BookAssociationProps, FormListProps, form as formObject, FormObjectProps } from "../objects/form.object"
import useAxios from "./useAxios";



const useHandleForm = ()=>{

    const [form,setForm] = useState<FormObjectProps>(formObject);
    const {onAxiosQuery} = useAxios();
    
    
    console.log(

        // formObject.formList.map((item)=>{
        //    return item.fields.filter((item_field)=>{
        //        return item_field.tag === "select" && item_field.options?.hasQuery
        //     })
        // })


    )

    const onGetBookAssociations = ()=>{
        onAxiosQuery("get",{
            url:"http://localhost:5600/book/association?",
            type:{
                get:{}
            },
            onResolver:{
                then:(result)=>{
                    const current_result = result.data as BookAssociationProps;

                    const current_form =  formObject.formList.map((item)=>
                    {
                        return {...item,fields:item.fields.map((item_field)=> 
                            item_field.tag === "select" && item_field.options?.hasQuery 
                            ? {...item_field,options:{
                                ...item_field.options,
                                list: current_result 
                                && (()=>{
                                    console.log()
                                   return Object.entries(current_result).filter((item_result)=>{
                                    
                                        return item_result[0].toLowerCase() === 
                                        item_field.title.toLowerCase()
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                        && item_result[1]
                                        
    
                                    })[0][1]
                                })()
                            }}
                            : item_field
                        )}
                    }
                    )
                    console.log(current_form)

                    setForm((prev)=>{
                        return {...prev,formList:current_form as FormListProps[]} 
                    })
                   
                },
                catch:(error)=>{
                    console.log(error)
                }
            } 
            })
        }
useEffect(()=>{
    console.log(form)
    console.log(formObject)
},[form])

useEffect(()=>{
   
    
    !!formObject 
    && onGetBookAssociations()

},[formObject])


return {
    form
}

}

export default useHandleForm