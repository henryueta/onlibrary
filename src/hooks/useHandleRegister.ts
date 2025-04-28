import { FormDataProps, RegisterContext } from "../context/RegisterContext";
import useHandleAuth from "./usehandleAuth";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { form, InputProps } from "../objects/form.object";
import {  ZodTypeAny } from "zod";
import useAxios from "./useAxios";
import Word from "../classes/word.class";

type StepIndex = 1|2|3;

export type FormStepType = "name" | "contact" | "password";

const useHandleRegister = ()=>{

    

    const {authContext,onHandleStatus,onHandleAuth} = useHandleAuth();
    const {onAxiosQuery,isLoading} = useAxios();
    const authRegisterContext = useContext(RegisterContext)

    const onFormtep = (step:FormStepType | null):{
        schema:{ [k: string]: ZodTypeAny; },
        form:InputProps[]
    } | {}=>{
        const formList = Object.values(form.formList);
        const findUserForm =  formList.find((item)=>item.name == "user")

        const stepFieldList = {

            nameStep:['nome','sobrenome','cpf'],
            contactStep:['username','email'],
            passwordStep:['senha','repetir_senha']

        }

        const onCheckFields = (fieldList:string[])=>{

            const stepSchema =  Object.entries(findUserForm?.schema.shape || {}).filter((item,index)=>
                        fieldList.includes(item[0])                                                
                    )
               
            const stepForm = form.formList[0].fields.filter((item,index)=>
                    fieldList.includes(item.title.toLowerCase()) 
            )
           
            return {
                schema:Object.fromEntries(stepSchema),
                form:stepForm
            }
                     
        }   

        const formStepList = {

            name:()=>{               
              return  onCheckFields(stepFieldList.nameStep)
            },
            contact:()=>{
                return  onCheckFields(stepFieldList.contactStep)
            },
            password:()=>{
                return  onCheckFields(stepFieldList.passwordStep)
            }
        }

       return !!step 
      ?  formStepList[step]()
        : {}
    }

    useEffect(()=>{
        authRegisterContext.registerData &&
        Object.keys(authRegisterContext.registerData).length == 6 &&
        onHandleAuth("register",authRegisterContext.registerData)
    },[authRegisterContext.registerData])


    const onQueryStep = (data:FormDataProps)=>{
        onAxiosQuery("post",{
            url:"http://localhost:5600/register?step=name",
            type:{
                post:{
                    data:data as object
                }
            },
            onResolver:{
                then:(result)=>console.log(result),
                catch:(error)=>console.log(error)
            }
        })
    }

    const onStep = (step:StepIndex,data:FormDataProps)=>{

        const checkStep = {
            1:(data:FormDataProps)=>{
                if(data){
                    const formated_name = new Word(data?.nome, "name").word;
                    const formated_lastName = new Word(data?.sobrenome,"name").word;
                    const formated_cpf = new Word(data?.cpf,"cpf").word 
                   
                    authRegisterContext.setRegisterData({...authRegisterContext.registerData,
                            nome:formated_name,
                            sobrenome:formated_lastName,
                            cpf: formated_cpf } as FormDataProps
                    )
                    onQueryStep({
                        nome:formated_name,
                        sobrenome:formated_lastName,
                        cpf:formated_cpf
                    } as FormDataProps)
                }          
            },
            2:(data:FormDataProps)=>{
                authRegisterContext.setRegisterData({...authRegisterContext.registerData,
                        email:data?.email,
                        username:data?.username} as FormDataProps
                    )
                onQueryStep(data)
            },
            3:(data:FormDataProps)=>{
                authRegisterContext.setRegisterData({...authRegisterContext.registerData,
                    senha:data?.senha
                } as FormDataProps)
                Cookies.set("userStatus",JSON.stringify({
                  errorStatus:{
                    hasError:false,
                    errorValue:""
                  },
                  authStatus:{
                    hasAuth:true,
                    authValue:"KJK1"
                  } 
                }))
                authContext.setUserStatus(onHandleStatus())
            }
        }

        if( !!data){
            checkStep[step](data)
        }  
        
    }

    return {
        authRegisterContext,
        onFormtep,
        isLoading,
        onStep
    }

}

export default useHandleRegister