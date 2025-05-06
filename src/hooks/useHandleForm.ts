import { useEffect, useReducer, useState } from "react"
import { BookAssociationProps, FormListProps, form as formObject, FormObjectProps, QueryType } from "../objects/form.object"
import useAxios, { ActionQueryType, QueryStateProps, QuerySuccessProps } from "./useAxios";
import { BookTableQueryProps, LibraryTableQueryProps, TableQueryProps, TableType } from "../objects/table.object";
import useHandleLibrary from "./useHandleLibrary";
import Word from "../classes/word.class";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


type FormStateProps = QueryStateProps;

const initialFormState:FormStateProps = {
    success:{
        data:null,
        message:"",
        success:false
    },
    error:{
        error:"",
        message:"",
        status:0
    },
    isLoading:false
}

type ActionFormType = ActionQueryType

const onHandleFormState = (state:FormStateProps,action:ActionFormType)=>{
        switch (action.type) {
            case "success":
                return {...state,success:action.value}
            case "error":
                return {...state,error:action.value}
            case "isLoading":
                return {...state,isLoading:action.value}
            default:
                return state
    }
}



const useHandleForm = (typeOfForm:TableType)=>{

    const {currentLibraryContext} = useHandleLibrary()
    const [form,setForm] = useState<FormObjectProps>(formObject);
    const {onAxiosQuery,queryState} = useAxios();
    const [formState,setFormState] = useReducer(onHandleFormState,initialFormState);
    const onNavigate = useNavigate();

    useEffect(()=>{
        setFormState({
            type:"success",
            value:queryState.success
        })
    },[queryState.success])   

    useEffect(()=>{
        setFormState({
            type:"error",
            value:queryState.error
        })
    },[queryState.error])

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
                url:"http://localhost:5700/data/group?type=book&id=1d8fq",
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
        type:Exclude<TableType,"none">,
        id?:string
        data?:TableQueryProps
        },
        type:QueryType)=>{
            console.log(form.data)
        const checkQueryType = {

            select:()=>{
                onAxiosQuery("get",{
                    url:`http://localhost:5700/data/group?type=${form.type}&id=${libraryId}`,
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
                !!form.data &&
               (()=>{
                const checkTables = {
                    library:()=>{
                        const current_data = form.data as LibraryTableQueryProps
                        return (
                            {
                                //https://onlibrary-api.onrender.com/api/bibliotecas/criar-biblioteca
                                url:"http://localhost:5700/data/create?type=library",
                                data:{
                                    nome:current_data.nome,
                                    endereco:{
                                        cep:new Word(current_data.cep,"cep").word,
                                        numero:current_data.numero,
                                        rua:current_data.rua
                                    },
                                    telefone:new Word(current_data.telefone,"telephone").word,
                                    aplicacao_multa:!!current_data.aplicacao_multa,
                                    aplicacao_bloqueio:!!current_data.aplicacao_bloqueio,
                                    reserva_online:!!current_data.reserva_online
                                }
                            }
                        )
                    },
                    book:()=>{
                        const current_data = form.data as BookTableQueryProps
                        return (
                            {
                                url:"http://localhost:5700/data/create?type=book",
                                data:{
                                    isbn:new Word(current_data.isbn,"isbn").word,
                                    titulo:current_data.titulo,
                                    descricao:current_data.descricao,
                                    ano_lancamento:current_data.ano_lancamento,
                                    autores:current_data.autores,
                                    categorias:current_data.categorias,
                                    generos:current_data.generos,
                                    editoras:current_data.editoras
                                }
                            }
                        )
                    },
                    user:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    account:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    library_user:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    loan:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    reserve:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    amerce:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    exemplary:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    author:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    publisher:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    category:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
                    gender:()=>{
                        return (
                            {
                                url:"",
                                data:{}
                            }
                        )
                    },
            }
            const current_userId = JSON.parse(Cookies.get("user_id") || "");
              const current_url = checkTables[form.type]().url+"&userId="+current_userId.user_id;
              !!form.data &&
              (()=>{
                axios.defaults.withCredentials = true
                onAxiosQuery("post",{
                    url:current_url,
                    type:{
                      post:{
                        data:checkTables[form.type]().data
                      }
                    },
                    onResolver:{
                        then:(result)=>{
                            result.data &&
                            onNavigate("/management/library")
                        },
                        catch:(error)=>console.log(error)
                      }
                  })
              })()
               })()
            },
            update:()=>{

            },
            delete:()=>{

            }

        }
        checkQueryType[type]()

    }

useEffect(()=>{


    !!formObject
    && !!typeOfForm
    && typeOfForm !== "none"
    && currentLibraryContext.libraryId

    && onQueryForm(
    currentLibraryContext.libraryId,
    {
        type:typeOfForm,
    },"select")
},[formObject,typeOfForm,currentLibraryContext.libraryId])


return {
    form,
    onQueryForm,
    formState
}

}

export default useHandleForm
