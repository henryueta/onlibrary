import { useEffect, useState } from "react"
import { BookAssociationProps, FormListProps, form as formObject, FormObjectProps, QueryType } from "../objects/form.object"
import useAxios from "./useAxios";
import { TableQueryProps, TableType } from "../objects/table.object";
import useHandleLibrary from "./useHandleLibrary";


const useHandleForm = (typeOfForm:TableType)=>{

    const {currentLibraryContext} = useHandleLibrary()
    const [form,setForm] = useState<FormObjectProps>(formObject);
    const {onAxiosQuery} = useAxios();
    
    
    console.log(

        // formObject.formList.map((item)=>{
        //    return item.fields.filter((item_field)=>{
        //        return item_field.tag === "select" && item_field.options?.hasQuery
        //     })
        // })


    )


    useEffect(()=>{
        onAxiosQuery("get",
            {
                url:"http://localhost:5600/data/group?type=book&id=1d8fq",
                type:{
                    get:{

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
            }
        )
    },[])

    const onQueryForm = (
        libraryId:string,
        form:{
        type:TableType,
        id?:string
        data?:TableQueryProps
        },
        type:QueryType)=>{
        const checkQueryType = {

            select:()=>{
                onAxiosQuery("get",{
                    url:`http://localhost:5600/data/group?type=${form.type}&id=${libraryId}`,
                    type:{
                        get:{}
                    },
                    onResolver:{
                        then:(result)=>{
                            const current_result = result.data as BookAssociationProps;
        
                            const current_form =  formObject.formList.map((item)=>
                            {
                                return {...item,fields:item.fields.map((item_field)=> 
                                    item_field.tag === "select" && item_field.options?.hasQuery && item.name == form.type
                                    ? {...item_field,options:{
                                        ...item_field.options,
                                        list: current_result 
                                        && (()=>{
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
            },
            create:()=>{

            },
            update:()=>{

            },
            delete:()=>{

            }

        }
        checkQueryType[type]()

    }

useEffect(()=>{
   
    
    !!formObject && !!typeOfForm && typeOfForm !== "none"
    && onQueryForm(
    "",
    {
        type:typeOfForm,
    },"select")

},[formObject,typeOfForm])


return {
    form,
    onQueryForm
}

}

export default useHandleForm