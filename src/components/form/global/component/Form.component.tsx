import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, DefaultValues, Path, useForm } from "react-hook-form";
import { z, ZodRawShape} from "zod";
import { TableQueryProps, TableType } from "../../../../objects/table.object";
import { useEffect, useReducer, useState } from "react";
import { InputProps } from "../../../../objects/form.object";
import { NumericFormat, PatternFormat } from "react-number-format";
import Warn from "../../../warn/Warn.component";
import Select, { MultiValue, SingleValue } from "react-select"
import useHandleForm from "../../../../hooks/useHandleForm";
import useHandleLibrary from "../../../../hooks/useHandleLibrary";
import Dialog from "../../../dialog/Dialog.component";
import bigWarning_icon from "../../../../assets/imgs/icons/bigWarning_icon.png";
import bigValidated_icon from "../../../../assets/imgs/icons/bigValidated_icon.png"
import { useParams } from "react-router-dom";

interface FormProps{
  formSchema:z.ZodObject<ZodRawShape>
  typeOfData?:Exclude<TableType,"none">
  fields?:InputProps[]
  onSubmit:(data:{[x: string]:any})=>void
  defaultValues?:TableQueryProps
  orderPreference?:string[]
  method:{
    post:boolean,
    put:boolean
  },
  buttonRef?:React.RefObject<HTMLButtonElement | null>
}

// const preference = ["id","nome","idade"]

// const define = Object.entries(teste);

// preference.map((item,index)=>{
//   const a = define.find((item2,index2)=>{
//     return  define[index2][0] == item
//   })
// })


interface FormQueryStateProps {
  error:{
    view:boolean,
    close:boolean
  },
  success:{
    view:boolean,
    close:boolean
  }
}

const initialFormQueryState:FormQueryStateProps = {

  error:{
    view:false,
    close:true
  },
  success:{
    view:false,
    close:true
  }

}

type ActionFormType =
{

  type:'error',
  value:{
    view:boolean,
    close:boolean
  }

} 
|
{
  type:"success",
  value:{
    view:boolean,
    close:boolean
  }
}

const handleFormQueryState = (state:FormQueryStateProps,action:ActionFormType)=>{
  switch (action.type) {
            case "success":
              return {...state,success:action.value}
            case "error":
              return {...state,error:action.value};
            default:
              return state
          }
}

const Form = ({typeOfData,onSubmit,defaultValues,formSchema,fields,buttonRef,method}:FormProps) => {
  const schemaObject = formSchema
  const [formBase,setFormBase] = useState<InputProps[]>();
  const {currentLibraryContext} = useHandleLibrary();
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const {form} = useHandleForm(typeOfData || "none")
  const {id} = useParams()



  const [formQueryState,setFormQueryState] = useReducer(handleFormQueryState,initialFormQueryState);

  useEffect(()=>{

    !!form
    &&
    !!typeOfData
    ?setFormBase(form.formList.find((item)=>
      item.name === typeOfData
    )?.fields)
    : !!fields
    && setFormBase(fields);

  },[form])


  type SchemaType = z.infer<typeof schemaObject>


  const [teste,setTeste] = useState<
  DefaultValues<{
    [x: string]: any;
}> | {
    [x: string]: any;
} | undefined>(undefined)
  useEffect(()=>{
    setTeste(defaultValues)
  },[defaultValues])

  useEffect(()=>{

    // teste&&
    // Object.entries(teste).map((item)=>console.log(item[1]))
  },[teste])

  const {register,formState:{errors},handleSubmit,control,setValue} = useForm<SchemaType>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schemaObject),
  });


  const {onQueryForm,formState} = useHandleForm(typeOfData || "none")

  useEffect(()=>{
    buttonRef &&
    buttonRef.current &&
    buttonRef.current.addEventListener('click',()=>{

      handleSubmit((data:SchemaType)=>onSubmit(data))()
      
      })
  },[buttonRef])

  useEffect(()=>{
    !!formState.error.message
    &&
    (()=>{
     console.log(errors)
      setFormQueryState({
        type:"error",
        value:{
          view:true,
          close:false
        }
      })

    })()
  },[formState.error])

  useEffect(()=>{
    !!formState.success.message
    &&
    setFormQueryState({
        type:"success",
        value:{
          view:true,
          close:false
        }
      })
  },[formState.success])

  return (
    <form>
        {
          formBase &&
          formBase.map((item_input,index_input)=>
         {  
              
              return item_input.type !== "hidden"
              &&(
                // (item_input.forForm.post === method.post
                // || 
                // item_input.forForm.put === method.put)
                // &&
              <label htmlFor={item_input!.id} key={index_input}>
                <div className="titleFieldContainer">
                  <p>
                    {
                      item_input!.title.concat(" :")
                    }
                  </p>
                </div>
                <div className="fieldContainer">
                  <div className="fieldDataContainer">
                  {
                    item_input.tag === "select" && !!item_input.options
                    ?
                     <Select
                     isDisabled={
                      ( method.put && !isUpdate)
                      ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                    }
                      defaultValue={teste && teste[item_input!.registerId]}
                     placeholder={` `}
                     className="selectOptions" isMulti={item_input.options.isMultiple}
                     options={item_input.options.list.map((item_option)=>{
                 
                       return {
                      value:item_option.value,
                      label:item_option.label
                     }})}
                     onChange={(e)=>setValue(item_input.registerId,
                      item_input.options?.isMultiple
                      ? (()=>{
                        const multiple = e as MultiValue<{
                          value:string,
                          label:string
                        }>
                        return  multiple.map(item_currentOption=>item_currentOption.value)
                      })()
                      : (()=>{
                        const single = e as SingleValue<{
                          value:string,
                          label:string
                        }>
                        return single!.value
                      })()
                     )}
                     >
                     </Select>
                    :item_input!.tag === "input"
                    ?
                    !!item_input!.maskFormat
                    ?
                    <Controller
                    defaultValue={teste && teste[item_input!.registerId]}
                    name={item_input!.registerId}
                    control={control}
                    render={({field})=>
                      <PatternFormat
                      disabled={
                        ( method.put && !isUpdate)
                        ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                      }
                     {...field}
                     format={item_input?.maskFormat || ""}
                    mask={"_"}/>
                    }
                    >
                    </Controller>
                    : !!item_input.numericFormat
                    ?
                    <Controller
                    defaultValue={teste && teste[item_input!.registerId]}
                    name={item_input!.registerId}
                    control={control}
                    render={({field})=>
                      <NumericFormat
                      disabled={
                        ( method.put && !isUpdate)
                        ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                      }
                     {...field}
                     prefix={item_input.numericFormat?.prefix || ""}
                     decimalScale={item_input.numericFormat?.decimalScale || 0}
                     suffix={item_input.numericFormat?.suffix || ""}
                     thousandSeparator={item_input.numericFormat?.thousandSeparator || "."}
                     decimalSeparator={item_input.numericFormat?.decimalSeparator || " "}
                     allowNegative={false}
                     />
                    }
                    >
                    </Controller>
                    :<input
                    disabled={
                      ( method.put && !isUpdate)
                      ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                    }
                    value={teste && teste[item_input!.registerId]}
                    type={item_input!.type}
                    id={item_input!.id}
                    {...register(item_input!.registerId as Path<SchemaType>)}/>
                    : item_input!.tag === "textarea"
                    &&
                    <textarea
                    disabled={
                      ( method.put && !isUpdate)
                      ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                    }
                   id={item_input!.id} 
                  {...register(item_input!.registerId as Path<SchemaType>)}>
                  </textarea>


                  }
                  {
                    item_input.type !== "checkbox" &&
                    item_input.type !== "file" &&
                    item_input.tag !== "select"
                    && <></>
                  }
                  </div>
                <div className="errorContainer">
                {
                  errors
                  && Object.entries(errors).map((item,index)=>
                    {
                    return !!item[1]?.message && item[0] == item_input!.registerId
                    && <Warn color="black" key={index} warning={item[1].message.toString() || null}/>
                    })


                }
                 </div>
              </div>
            </label>
            )
          }
          )

        }
        {
           !!formQueryState.success.view
          && <Dialog
          closeOnExternalClick={false}
          className={`dialogPane ${formQueryState.success.close ?"closeDialog" : ""}`} 
           close={{
            timer:1000,
            closeButton:true,
            onClose:()=>{
            setFormQueryState({
              type:"success",
              value:{
                view:true,
                close:true
              }
            })
            setTimeout(()=>{
              setFormQueryState({
              type:"success",
              value:{
                view:false,
                close:true
              }
            })
            },1000)
          }
           }}>
              <div className={"formSubmitErrorContainer"}>
                <img src={bigValidated_icon} alt="bigValidated_icon" />
                <h1>Success</h1>
               <p>Cadastro realizado com sucesso!</p>
              </div>
          </Dialog>
        }
        {
          !!formQueryState.error.view
          && <Dialog
          closeOnExternalClick={false}
          className={`dialogPane ${formQueryState.error.close ?"closeDialog" : ""}`}
           close={{
            timer:100,
            closeButton:true,
              onClose:()=>{
            setFormQueryState({
              type:"error",
              value:{
                view:true,
                close:true
              }
            })
            setTimeout(()=>{
              setFormQueryState({
              type:"error",
              value:{
                view:false,
                close:true
              }
            })
            },1000)
          }
           }}>
              <div className={"formSubmitErrorContainer"}>
                <img src={bigWarning_icon} alt="bigWarning_icon" />
                <h1>Error</h1>
               <p>{formState.error.message}</p>
              </div>
          </Dialog>
        }
        {
          !!!buttonRef
          &&
         <div className="submitFormDataContainer">
            
            {
              
              <button type="button" className="cancelButton"
              onClick={()=>{
                setIsUpdate((prev)=>!prev)
              }}
              >
             {
              method.put && !isUpdate
              ?
              "Editar"
              :
              "Cancelar"
             }
            </button>
            }
            {
              (method.post || method.put && isUpdate)
              &&
              <button className="managementButton"  onClick={handleSubmit((data:SchemaType)=>
             {
              return typeOfData && data
              &&  onQueryForm(currentLibraryContext.libraryId || "",{
               id:id,
               type:typeOfData,
               data:data as TableQueryProps
             },
             method.post 
             ? "create"
             : "update")
             }
              )}>
            {
              method.post
              ? "Cadastrar"
              : "Editar"
            }
            </button>
            }
            

         </div>
        }

    </form>
  )
}

export default Form
