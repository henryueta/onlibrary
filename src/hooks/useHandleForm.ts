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
    UserTableQueryProps,
    GenderTableQueryProps,
    CategoryTableQueryProps,
    PublisherTableQueryProps,
} from "../objects/table.object";
import useHandleLibrary from "./useHandleLibrary";
import Word from "../classes/word.class";
import axios, { CancelToken } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


// type FormStateProps = QueryStateProps;

const initialFormState:QueryStateProps = {
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

const onHandleFormState = (state:QueryStateProps,action:ActionFormType)=>{
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
    //             url:"http://localhost:4200/data/group?type=book&id=1d8fq",
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
        type:Exclude<TableType,"library_management"|"global_management">,
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
                                url:"https://onlibrary-api.onrender.com/api/biblioteca/criar-biblioteca",
                                data:{
                                   post:{
                                     nome:current_data.nome,
                                    cep:new Word(current_data.cep,"cep").word,
                                    numero:current_data.numero,
                                    rua:current_data.rua,
                                    telefone:new Word(current_data.telefone,"telephone").word,
                                    aplicacao_multa:current_data.aplicacao_multa,
                                    aplicacao_bloqueio:current_data.aplicacao_bloqueio,
                                    reserva_online:current_data.reserva_online
                                   },
                                   put:{
                                    nome:current_data.nome,
                                    cep:new Word(current_data.cep,"cep").word,
                                    numero:current_data.numero,
                                    rua:current_data.rua,
                                    telefone:new Word(current_data.telefone,"telephone").word,
                                    aplicacao_multa:current_data.aplicacao_multa,
                                    aplicacao_bloqueio:current_data.aplicacao_bloqueio,
                                    reserva_online:current_data.reserva_online
                                   }
                                }
                            }
                        )
                    },
                    book:()=>{
                        const book_data = form.data as BookTableQueryProps
                        return (
                            {
                                url:tableRoutes['book'].post,
                                data:{
                                    post:{
                                        isbn:book_data.ISBN,
                                        titulo:book_data.titulo,
                                        descricao:book_data.descricao,
                                        ano_lancamento:book_data.ano_lancamento,
                                        autores:book_data.autores,
                                        categorias:book_data.categorias,
                                        generos:book_data.generos,
                                        editoras:book_data.editoras,
                                        imagem:book_data.imagem
                                    },
                                    put:{

                                    }
                                }
                            }
                        )
                    },
                    user:()=>{
                        const user_data = form.data as UserTableQueryProps
                        return (
                            {
                                url:"",
                                data:{
                                    post:{
                                        nome:user_data.nome,
                                        sobrenome:user_data.sobrenome,
                                        email:user_data.email,
                                        username:user_data.username,
                                        cpf:user_data.cpf,
                                    },
                                    put:{
                                        nome:user_data.nome,
                                        sobrenome:user_data.sobrenome,
                                        email:user_data.email,
                                        username:user_data.username,
                                        cpf:user_data.cpf,
                                    }
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
                                        fk_id_biblioteca: currentLibraryContext.libraryId,
                                        nome:account_data.nome,
                                        multa_padrao:new Word(account_data.multa_padrao,"numeric").word,
                                        prazo_devolucao_padrao:new Word(account_data.prazo_devolucao_padrao,"numeric").word,
                                        prazo_multa_padrao:new Word(account_data.prazo_multa_padrao,"numeric").word
                                    }
                                  
                                }
                            }
                        )
                    },
                    library_user:()=>{
                        const library_user_data = form.data as LibraryUserTableQueryProps
                        console.log(library_user_data)
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
                                    cpf:!!library_user_data.cpf
                                    ? new Word(library_user_data.cpf,"numeric").word
                                    : "",
                                 },
                                 put:{
                                    numero_matricula:library_user_data.numero_matricula,
                                    fk_id_perfil_usuario:library_user_data.perfis_biblioteca,
                                    tipo_usuario:library_user_data.tipo_usuario,
                                    situacao: library_user_data.situacao

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
                                    
                                    },
                                put:{
                                    fk_id_bibliotecario:current_userId.user_id,
                                    fk_id_biblioteca:currentLibraryContext.libraryId,
                                    situacao:loanData.situacao,
                                    dataDevolucao:loanData.data_devolucao
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
                                        fk_id_bibliotecario:current_userId.user_id,
                                        fk_id_livro:reserve_data.livros_biblioteca,
                                        tipo:"fisico",
                                        quantidade_total:reserve_data.quantidade_total,
                                        data_retirada:reserve_data.data_retirada
                                    },
                                    put:{
                                        quantidade_total:reserve_data.quantidade_total,
                                        fk_id_bibliotecario:current_userId.user_id,
                                        data_retirada:reserve_data.data_retirada,
                                        situacao:reserve_data.situacao
                                    }
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
                                        fk_id_bibliotecario:current_userId.user_id,
                                        motivo:amerce_data.motivo,
                                        situacao:amerce_data.situacao
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
                                     fk_id_livro:exemplaryData.livros_biblioteca,
                                    numero_tombo:exemplaryData.numero_tombo,
                                    situacao:exemplaryData.situacao,
                                    estante:exemplaryData.estante,
                                    prateleira:exemplaryData.prateleira,
                                    setor:exemplaryData.setor,
                                    fk_id_biblioteca:libraryId
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
                        const publisher_data = form.data as PublisherTableQueryProps
                        return (
                            {
                                url:tableRoutes['publisher'].post,
                                data:{
                                    post:{
                                        nome:publisher_data.nome
                                    },
                                    put:{}
                                }
                            }
                        )
                    },
                    category:()=>{
                        const category_data = form.data as CategoryTableQueryProps
                        return (
                            {
                                url:tableRoutes['category'].post,
                                data:{
                                    post:{
                                        nome:category_data.nome
                                    },
                                    put:{}
                                }
                            }
                        )
                    },
                    gender:()=>{
                        const gender_data = form.data as GenderTableQueryProps;
                        return (
                            {
                                url:tableRoutes['gender'].post,
                                data:{
                                    post:{
                                        nome:gender_data.nome
                                    },
                                    put:{}
                                }
                            }
                        )
                    },
            }

        const checkQueryType = {

            select:()=>{
                onAxiosQuery("get",{
                    url:`http://localhost:4200/data/group?type=${form.type}&id=${libraryId}&userId=${current_userId.user_id}`,
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
                    hasFormData:(
                        form.type === "book"
                    ),
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
                    hasFormData:(
                        form.type === "book"
                    ),
                    url:tableRoutes[form.type].put+"/"+(
                        form.type !== "user"
                        ? form.id
                        : current_userId.user_id
                    ),
                    type:{
                        put:{
                           data:checkTables[form.type]().data.put
                        }
                    },
                    onResolver:{
                        then(result) {
                            console.error(result)
                            result.data &&
                            setTimeout(()=>{
                                onNavigate(onFindTablePath(typeOfForm) || "",{
                                    replace:true
                                })
                            },1500)
                        },
                        catch(error) {
                            console.error(error)
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
    && typeOfForm !== "library_management"
    && typeOfForm !== "global_management"
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
