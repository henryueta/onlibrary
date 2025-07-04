import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, DefaultValues, Path, useForm } from "react-hook-form";
import { z, ZodRawShape} from "zod";
import { onFindTableIndex, TableQueryProps, TableType, tableTypeDataList } from "../../../../objects/table.object";
import { useEffect, useReducer, useState } from "react";
import { InputProps } from "../../../../objects/form.object";
import { NumericFormat, PatternFormat } from "react-number-format";
import Warn from "../../../warn/Warn.component";
import Select, { MultiValue, SingleValue } from "react-select"
import useHandleForm from "../../../../hooks/useHandleForm";
import useHandleLibrary from "../../../../hooks/useHandleLibrary";
import { useParams } from "react-router-dom";
import Spinner from "../../../spinner/Spinner.component";
import cube_icon from "../../../../assets/imgs/icons/black_cubeTable_icon.png"
import Communication from "../../../communication/Communication.component";
import useHandlePath from "../../../../hooks/useHandlePath";

interface FormProps{
  formSchema:z.ZodObject<ZodRawShape>
  typeOfData?:Exclude<TableType,"library_management"|"global_management">
  fields?:InputProps[]
  onSubmit:(data:{[x: string]:any})=>void
  defaultValues?:TableQueryProps
  orderPreference?:string[]
  method:{
    post:boolean,
    put:boolean
  },
  redirectAfterConclude?:boolean,
  redirectTo?:string
  buttonRef?:React.RefObject<HTMLButtonElement | null>
}

interface FormQueryStateProps {
  isErrorView:boolean,
  isSuccessView:boolean,
  isSent:boolean
}

const initialFormQueryState:FormQueryStateProps = {

  isErrorView:false,
  isSuccessView:false,
  isSent:false
}

type ActionFormType =
{

  type:'error',
  value:boolean

} 
|
{
  type:"success",
  value:boolean
}
|
{
  type:"submited",
  value:boolean
}

const handleFormQueryState = (state:FormQueryStateProps,action:ActionFormType)=>{
  switch (action.type) {
            case "success":
              return {...state,isSuccessView:action.value}
            case "error":
              return {...state,isErrorView:action.value}
            case "submited":
              return {...state,isSent:action.value}
            default:
              return state
          }
}

const Form = ({typeOfData,onSubmit,defaultValues,formSchema,fields,buttonRef,method,redirectAfterConclude,redirectTo}:FormProps) => {
  const schemaObject = formSchema
  const [formBase,setFormBase] = useState<InputProps[]>();
  const {currentLibraryContext} = useHandleLibrary();
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const {form} = useHandleForm(typeOfData || "library_management"||"global_management")
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


  const [defaultValueList,setDefaultValueList] = useState<
  DefaultValues<{
    [x: string]: any;
}> | {
    [x: string]: any;
} | undefined>(undefined)
  useEffect(()=>{
    setDefaultValueList(defaultValues)
  },[defaultValues])

  const {register,formState:{errors},handleSubmit,control,setValue} = useForm<SchemaType>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schemaObject),
  });

  const {onQueryForm,formState} = useHandleForm(typeOfData || "library_management"||"global_management")
  const {onTransition,currentPathContext} = useHandlePath();

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
      setFormQueryState({
        type:"submited",
        value:false
      })
      })()
  
  },[formState.error])

  useEffect(()=>{
    ///-------
    !!formState.success.message
    &&
    (()=>{

      setFormQueryState({
        type:"submited",
        value:false
      })

      setIsUpdate(false)
      !!redirectTo
      &&
      setTimeout(()=>{
        onTransition(redirectTo,{
          hasReplace:false
        })
      },1000)

    })()
  },[formState.success])


  return (
    <>
    <Communication
        formState={formState}
        />
    <form className={currentPathContext.transitionClass}>
      {
        !!typeOfData
          &&
          tableTypeDataList[onFindTableIndex(typeOfData)]
          &&
          <>
        <div className="titleContainer">
        
        <img src={cube_icon} alt="table_icon" />
        <h1>
          {
          !!typeOfData
          &&
          tableTypeDataList[onFindTableIndex(typeOfData)].title
        }
        </h1>
      </div>
      

      <hr />
      </>
      }
        {
          formBase &&
          formBase.map((item_input,index_input)=>
         {  
              
              return item_input.type !== "hidden"
              &&(
              <div 
              className="inputDataContainer"
              style={
                !method.put
                && 
                (item_input.forForm.put 
                && 
                !item_input.forForm.post )
                ||
                (
                  method.post
                  &&
                  !item_input.forForm.post
                  
                )
                ? {display:"none"} 
                : {}
              }
              // htmlFor={item_input!.id} 
              key={index_input}
              >
                <div className="titleFieldContainer">
                  <p>
                    {
                      item_input!.title
                    }
                  </p>
                </div>
                <div className="fieldContainer">
                  <div className="fieldDataContainer">
                  {
                    item_input.tag === "select" && !!item_input.options
                    ?
                    <Controller
                    name={item_input!.registerId}
                    defaultValue={defaultValueList && defaultValueList[item_input!.registerId].value}
                    control={control}
                    render={()=>
                      
                      <Select
                     styles={{
                      
                      control:(base)=>({
                        ...base,
                        height:"45px"
                      })
                     }}
                     isDisabled={
                      ( method.put && !isUpdate)
                      ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                      ||
                      (!item_input.forForm.post
                      && 
                      !item_input.forForm.put)
                    }
                      defaultValue={defaultValueList && defaultValueList[item_input!.registerId]}
                     placeholder={` `}
                    //  {...field}
                     className="selectOptions" 
                     isMulti={
                      !!item_input.options
                      &&
                      item_input.options.isMultiple}
                     options={
                      !!item_input.options
                      ?
                      item_input.options.list.map((item_option)=>{
                       return {
                      value:item_option.value,
                      label:item_option.label
                     }
                    })
                    : []
                  }
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
                      
                    }
                      
                      />
                     
                    :item_input!.tag === "input"
                    ?
                    !!item_input!.maskFormat
                    ?
                    <Controller
                    name={item_input!.registerId}
                    defaultValue={defaultValueList && defaultValueList[item_input!.registerId].toString()}
                    control={control}
                    render={({field})=>
                      <PatternFormat
                      
                    defaultValue={defaultValueList && defaultValueList[item_input!.registerId].toString()}
                      disabled={
                        ( method.put && !isUpdate)
                        ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                      ||
                      (!item_input.forForm.post
                      && 
                      !item_input.forForm.put)
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
                    defaultValue={defaultValueList && defaultValueList[item_input!.registerId].toString()}  
                  
                    name={item_input!.registerId}
                    control={control}
                    render={({field})=>
                      <NumericFormat
                      
                    defaultValue={defaultValueList && defaultValueList[item_input!.registerId].toString()}  
                      disabled={
                        ( method.put && !isUpdate)
                        ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                      ||
                      (!item_input.forForm.post
                      && 
                      !item_input.forForm.put)
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
                    :
                    item_input.tag === 'input'
                    &&
                    <div 
                    className={
                      item_input.type === 'file'
                      ? "imagePreviewContainer"
                      : ""
                    }
                    >
                    

                    <label 
                    className={
                      item_input.type === 'file'
                      ? 'image_preview_label'
                      : ""
                    }
                    htmlFor={item_input.id} >
                      <input
                      disabled={
                        ( method.put && !isUpdate)
                        ||
                        !(item_input.forForm.post === method.post
                        || 
                        item_input.forForm.put === method.put)
                        ||
                        (!item_input.forForm.post
                        && 
                        !item_input.forForm.put)
                      }
                      defaultValue={
                        defaultValueList
                        &&
                        !!(item_input.type !== 'file')
                        ? defaultValueList[item_input!.registerId]
                        : ""
                      }
                      type={item_input!.type}
                      id={item_input!.id}
                      {...register(item_input!.registerId as Path<SchemaType>)}
                      />
                    </label>
                    
                    </div>
                    
                    : item_input!.tag === "textarea"
                    &&
                    <textarea
                    defaultValue={defaultValueList && defaultValueList[item_input!.registerId]}
                    disabled={
                      ( method.put && !isUpdate)
                      ||
                       !(item_input.forForm.post === method.post
                      || 
                      item_input.forForm.put === method.put)
                      ||
                      (!item_input.forForm.post
                      && 
                      !item_input.forForm.put)
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
            </div>
            )
          }
          )

        }

        {
          !!!buttonRef
          &&
         <div className="submitFormDataContainer">
            {
              method.put
              &&
              <button type="button" 
              style={{border:"0.1rem solid var(--blue_var)"}}
              className="cancelButton"
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
              <button className="acceptButton"  
              disabled={
                formQueryState.isSent
              }
              onClick={
                handleSubmit((data:SchemaType)=>
             {
              formQueryState.isSent == false
              ?(()=>
              {setFormQueryState({
                type:"submited",
                value:true
              })
              return typeOfData && data
              &&  onQueryForm(currentLibraryContext.libraryId || "",{
               id:id,
               type:typeOfData,
               data:data as TableQueryProps
             },
             method.post 
             ? "create"
             : "update",
              !!redirectAfterConclude)})()
             :null
             }
             
              )}>
                {
                  formQueryState.isSent
                  &&
                  (!formState.error.message
                  ||
                  !formState.success.message)
                  &&
                  <Spinner/>
                }
            {
              method.post
              ? "Cadastrar"
              : "Concluir"
            }
            </button>
            }
            

         </div>
        }

    </form>
    </>
  )
}

export default Form
