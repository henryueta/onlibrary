import { useEffect, useReducer, useState } from "react"
import { BookAssociationProps, FormListProps, form as formObject, FormObjectProps, QueryType } from "../objects/form.object"
import useAxios, { ActionQueryType, QueryStateProps } from "./useAxios";
import {
  BookTableQueryProps,
  LoanTableQueryProps,
  AccountTableQueryProps,
  LibraryUserTableQueryProps,
   LibraryTableQueryProps,
    TableQueryProps,
    ExemplaryTableQueryProps,
     TableType, 
     tableRoutes,
     onFindTablePath,
     AmerceTableQueryProps,
     AuthorTableQueryProps,
     ReserveTableQueryProps,
     } from "../objects/table.object";
import useHandleLibrary from "./useHandleLibrary";
import Word from "../classes/word.class";
import axios, { CancelToken } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useHandleTable from "./useHandleTable";


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
        status:0,
        data:""
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

    // useEffect(()=>{
    //     onAxiosQuery("get",
    //         {
    //             url:"http://localhost:3300/data/group?type=book&id=1d8fq",
    //             type:{
    //                 get:{
    //
    //                 }
    //             },
    //             onResolver:{
    //                 then(result) {
    //                     console.log(result)
    //                 },
    //                 catch(error) {
    //                     console.log(error)
    //                 },
    //             }
    //         }
    //     )
    // },[])
const current_userId = JSON.parse(Cookies.get("user_id") || "{}");
    const onQueryForm = (
        libraryId:string,
        form:{
        type:Exclude<TableType,"none">,
        id?:string
        data?:TableQueryProps
        },
        type:QueryType,
        cancelToken?:CancelToken)=>{

            const checkTables = {
                    library:()=>{
                        const current_data = form.data as LibraryTableQueryProps
                        return (
                            {
                                // "http://localhost:3300/data/create?type=library&userId="+current_userId.user_id
                                //https://onlibrary-api.onrender.com/api/bibliotecas/criar-biblioteca
                                url:"https://onlibrary-api.onrender.com/api/biblioteca/criar-biblioteca",
                                data:{
                                   post:{
                                     nome:current_data.nome,
                                    cep:new Word(current_data.cep,"cep").word,
                                    numero:current_data.numero,
                                    rua:current_data.rua,
                                    telefone:new Word(current_data.telefone,"telephone").word,
                                    aplicacaoMulta:!!current_data.aplicacao_multa,
                                    aplicacaoBloqueio:!!current_data.aplicacao_bloqueio,
                                    reservaOnline:!!current_data.reserva_online
                                   },
                                   put:{

                                   }
                                }
                            }
                        )
                    },
                    book:()=>{
                        const book_data = form.data as BookTableQueryProps
                        return (
                            {
                                url:"http://localhost:3300/book/post",
                                data:{
                                    post:{
                                        ISBN:book_data.ISBN,
                                        titulo:book_data.titulo,
                                        descricao:book_data.descricao,
                                        ano_lancamento:book_data.ano_lancamento,
                                        autores:book_data.autores,
                                        categorias:book_data.categorias,
                                        generos:book_data.generos,
                                        editoras:book_data.editoras
                                    },
                                    put:{

                                    }
                                }
                            }
                        )
                    },
                    user:()=>{
                        return (
                            {
                                url:"",
                                data:{
                                    post:{},
                                    put:{}
                                }
                            }
                        )
                    },
                    account:()=>{
                      const account_data = form.data as AccountTableQueryProps;
                        return (
                            {
                                url:tableRoutes['account'].post,
                                data:{
                                    post:{
                                    fk_id_biblioteca: currentLibraryContext.libraryId,
                                    nome:account_data.nome,
                                    multa_padrao:new Word(account_data.multa_padrao,"numeric").word,
                                    prazo_devolucao_padrao:new Word(account_data.prazo_devolucao_padrao,"numeric").word,
                                    prazo_multa_padrao:new Word(account_data.prazo_multa_padrao,"numeric").word
                                    },
                                    put:{

                                    }
                                  
                                }
                            }
                        )
                    },
                    library_user:()=>{
                        const library_user_data = form.data as LibraryUserTableQueryProps
                        return (
                            {
                                url:tableRoutes['library_user'].post,
                                data:{
                                 post:{
                                     numero_matricula:library_user_data.numero_matricula,
                                    fk_id_biblioteca:libraryId,
                                    fk_id_usuario:library_user_data.usuarios,
                                    fk_id_perfil_usuario:library_user_data.perfis_biblioteca,
                                    tipo_usuario:library_user_data.tipo_usuario,
                                    cpf:new Word(library_user_data.cpf,"numeric").word
                                 },
                                 put:{
                                    numero_matricula:library_user_data.numero_matricula,
                                    fk_id_perfil_usuario:library_user_data.perfis_biblioteca,
                                    tipo_usuario:library_user_data.tipo_usuario,
                                 }
                                }
                            }
                        )
                    },
                    loan:()=>{
                      const loanData = form.data as LoanTableQueryProps;
                        return (
                            {
                                url:tableRoutes['loan'].post,
                                data:{
                                 post:{
                                    exemplares:loanData.exemplares_biblioteca,
                                    fk_id_biblioteca:currentLibraryContext.libraryId,
                                    fk_id_usuario_biblioteca:loanData.usuarios_biblioteca,
                                    fk_id_bibliotecario:current_userId.user_id,
                                    situacao:loanData.situacao,
                                    dataDevolucao:loanData.data_devolucao
                                    },
                                put:{

                                }
                                }
                            }
                        )
                    },
                    reserve:()=>{
                        const reserve_data = form.data as ReserveTableQueryProps
                        return (
                            {
                                url:tableRoutes['reserve'].post,
                                data:{
                                    post:{
                                        fk_id_biblioteca:currentLibraryContext.libraryId,
                                        fk_id_usuario:reserve_data.usuarios_biblioteca,
                                        fk_id_bibliotecario:null,
                                        fk_id_livro:reserve_data.livros_biblioteca,
                                        tipo:"fisico",
                                        quantidade_total:reserve_data.quantidade_total
                                    },
                                    put:{}
                                }
                            }
                        )
                    },
                    amerce:()=>{
                        const amerce_data = form.data as AmerceTableQueryProps;
                        return (
                            {
                                url:tableRoutes['amerce'].post,
                                data:{
                                    post:{
                                        fk_id_usuario:amerce_data.usuarios_biblioteca,
                                        fk_id_bibliotecario:current_userId.user_id,
                                        fk_id_biblioteca:currentLibraryContext.libraryId,
                                        motivo:amerce_data.motivo
                                    },
                                    put:{

                                    }
                                }
                            }
                        )
                    },
                    exemplary:()=>{
                      const exemplaryData = form.data as ExemplaryTableQueryProps
                        return (
                            {
                                url:tableRoutes['exemplary'].post,
                                data:{
                                 post:{
                                     fk_id_livro:exemplaryData.livros_biblioteca,
                                    numero_tombo:exemplaryData.numero_tombo,
                                    situacao:exemplaryData.situacao,
                                    estante:exemplaryData.estante,
                                    prateleira:exemplaryData.prateleira,
                                    setor:exemplaryData.setor,
                                    fk_id_biblioteca:libraryId
                                 },
                                 put:{
                                    
                                 }
                              }
                            }
                        )
                    },
                    author:()=>{
                        const author_data = form.data as AuthorTableQueryProps;
                        return (
                            {
                                url:tableRoutes['author'].post,
                                data:{
                                    post:{
                                        nome:author_data.nome
                                    },
                                    put:{
                                        nome:author_data.nome
                                    }
                                }
                            }
                        )
                    },
                    publisher:()=>{
                        return (
                            {
                                url:"",
                                data:{
                                    post:{},
                                    put:{}
                                }
                            }
                        )
                    },
                    category:()=>{
                        return (
                            {
                                url:"",
                                data:{
                                    post:{},
                                    put:{}
                                }
                            }
                        )
                    },
                    gender:()=>{
                        return (
                            {
                                url:"",
                                data:{
                                    post:{},
                                    put:{}
                                }
                            }
                        )
                    },
            }

        const checkQueryType = {

            select:()=>{
                onAxiosQuery("get",{
                    url:`http://localhost:3300/data/group?type=${form.type}&id=${libraryId}&userId=${current_userId.user_id}`,
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
                                                item_field.registerId.toLowerCase()
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

                            setForm((prev)=>{
                                return {...prev,formList:current_form as FormListProps[]}
                            })

                        },
                        catch:(error)=>{
                            console.log(error)
                        }
                    }
                    },
                    cancelToken)
            },
            create:()=>{

                !!form.data &&
               (()=>{
                

            //   const current_url = checkTables[form.type]().url+"&userId="+current_userId.user_id;
              !!form.data &&
              (()=>{
                axios.defaults.withCredentials = true
                onAxiosQuery("post",{
                    url:checkTables[form.type]().url,
                    type:{
                      post:{
                        data:checkTables[form.type]().data.post
                      }
                    },
                    onResolver:{
                        then:(result)=>{
                            result.data &&
                            setTimeout(()=>{
                                onNavigate(onFindTablePath(typeOfForm) || "",{
                                    replace:true
                                })
                            },1500)
                        },
                        catch:(error)=>console.log(error)
                      }
                  })
              })()
               })()
            },
            update:()=>{                
                onAxiosQuery("put",{
                    url:tableRoutes[form.type as TableType].put+"/"+form.id,
                    type:{
                        put:{
                           data:checkTables[form.type]().data.post
                        }
                    },
                    onResolver:{
                        then(result) {
                            console.log(result)
                            result.data &&
                            setTimeout(()=>{
                                onNavigate(onFindTablePath(typeOfForm) || "",{
                                    replace:true
                                })
                            },1500)
                        },
                        catch(error) {
                            console.log(error)
                        },
                    }
                })

            },
            delete:()=>{
               
            }

        }
        checkQueryType[type]()

    }

useEffect(()=>{
    const source = axios.CancelToken.source();
    !!formObject
    && !!typeOfForm
    && typeOfForm !== "none"
    && currentLibraryContext.libraryId

    && onQueryForm(
    currentLibraryContext.libraryId,
    {
        type:typeOfForm,
    },"select",source.token)
    return ()=>{
      source.cancel()
    }
},[formObject,typeOfForm,currentLibraryContext.libraryId])


return {
    form,
    onQueryForm,
    formState
}

}

export default useHandleForm
