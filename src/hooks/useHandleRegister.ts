import { FormDataProps, RegisterContext } from "../context/RegisterContext";
import useHandleAuth from "./usehandleAuth";
import { useContext, useEffect, useReducer } from "react";
import { form, InputProps } from "../objects/form.object";
import {  ZodTypeAny } from "zod";
import useAxios, { ActionQueryType, QueryStateProps } from "./useAxios";
import Word from "../classes/word.class";
import { useNavigate } from "react-router-dom";

type StepIndex = 1|2|3;

export type FormStepType = "name" | "contact" | "password";

type RegisterStateProps =  Omit<QueryStateProps,"isLoading">
 & Record<'isComplete',boolean> & Record<'currentStep',number>

const initialRegisterState:RegisterStateProps = {

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
    isComplete:false,
    currentStep: 0

}

type ActionRegisterType = Exclude<ActionQueryType,{type:"isLoading",value:boolean}> 
| {type:"isComplete",value:boolean} | {type:"currentStep",value:number}

const onHandleRegisterState = (state:RegisterStateProps,action:ActionRegisterType)=>{
        switch (action.type) {
            case "success":
                return {...state,success:action.value}
            case "error":
                return {...state,error:action.value}
            case "isComplete":
                return {...state,isComplete:action.value}
            case "currentStep":
                return {...state,currentStep:action.value}
            default:
                return state
    }
}

const useHandleRegister = ()=>{


    const registerSteps = ["/register/user/step/name","/register/user/step/contact","/register/user/step/password"]
    const {onHandleAuth,authState} = useHandleAuth();
    const {onAxiosQuery,queryState} = useAxios();
    const authRegisterContext = useContext(RegisterContext)
    const onNavigate = useNavigate();

    const [registerState,setRegisterState] = useReducer(onHandleRegisterState,initialRegisterState);

    useEffect(()=>{
        setRegisterState({
            type:"success",
            value:queryState.success
        })
        
    },[queryState.success])

    useEffect(()=>{
        setRegisterState({
            type:"error",
            value:queryState.error
        })
    },[queryState.error])

    useEffect(()=>{
        registerState.success.success &&
        onNavigate(registerSteps[registerState.currentStep+1]) 

    },[registerState.success,registerState.currentStep])

    useEffect(()=>{
        authState.success.success 
        && (()=>{
            authRegisterContext.setRegisterData(null)
            onNavigate("/login")
        })()
    },[authState.success])

    useEffect(()=>{
        
    },[authState.error])

    const onformep = (step:FormStepType | null):{
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

            const stepSchema =  Object.entries(findUserForm?.schema.post || {}).filter((item)=>
                        fieldList.includes(item[0])                                                
                    )
               
            const stepForm = form.formList[0].fields.filter((item)=>
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

    const onQueryStep = (step:StepIndex,data:FormDataProps)=>{
        onAxiosQuery("post",{
            url:"https://onlibrary-api.onrender.com/api/auth/validar-etapa",
            type:{
                post:{
                    data:{
                        etapa:step,
                        dados:data
                    }
                }
            },
            onResolver:{
                then:()=>{},
                catch:(error)=>console.log(error)
            }
        })
    }

    const onStep = (step:StepIndex,data:FormDataProps)=>{

        const checkStep = {
            1:(data:FormDataProps)=>{
               setRegisterState({
                type:"currentStep",
                value:0
               })
                if(data){
                    const formated_name = new Word(data.nome, "name").word;
                    const formated_lastName = new Word(data.sobrenome,"name").word;
                    const formated_cpf = new Word(data.cpf,"numeric").word 
                    authRegisterContext.setRegisterData({...authRegisterContext.registerData,
                            nome:formated_name,
                            sobrenome:formated_lastName,
                            cpf: formated_cpf } as FormDataProps
                    )
                    onQueryStep(1,{
                        nome:formated_name,
                        sobrenome:formated_lastName,
                        cpf:formated_cpf
                    } as FormDataProps)
                }          
            },
            2:(data:FormDataProps)=>{
                setRegisterState({
                    type:"currentStep",
                    value:1
                   })
                authRegisterContext.setRegisterData({...authRegisterContext.registerData,
                        email:data?.email,
                        username:data?.username} as FormDataProps
                    )
                onQueryStep(2,data)
            },
            3:(data:FormDataProps)=>{
                setRegisterState({
                    type:"currentStep",
                    value:2
                   })
                authRegisterContext.setRegisterData({...authRegisterContext.registerData,
                    senha:data?.senha
                } as FormDataProps)

               
            }
        }

        if( !!data){
            checkStep[step](data)
        }  
        
    }

    return {
        authRegisterContext,
        onformep,
        queryState,
        authState,
        onStep,
        registerSteps
    }

}

export default useHandleRegister