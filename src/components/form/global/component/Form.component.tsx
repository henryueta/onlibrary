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
  buttonRef?:React.RefObject<HTMLButtonElement | null>
}

// const preference = ["id","nome","idade"]

// const define = Object.entries(defaultValueList);

// preference.map((item,index)=>{
//   const a = define.find((item2,index2)=>{
//     return  define[index2][0] == item
//   })
// })


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

const Form = ({typeOfData,onSubmit,defaultValues,formSchema,fields,buttonRef,method,redirectAfterConclude}:FormProps) => {
  const schemaObject = formSchema
  const [formBase,setFormBase] = useState<InputProps[]>();
  const {currentLibraryContext} = useHandleLibrary();
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const {form} = useHandleForm(typeOfData || "library_management"||"global_management")
  const {id} = useParams()
  const [imagePreviewSource,setImagePreviewSource] = useState<string>("");
  
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

  const {register,formState:{errors},handleSubmit,control,setValue,getValues} = useForm<SchemaType>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schemaObject),
  });


  const {onQueryForm,formState} = useHandleForm(typeOfData || "library_management"||"global_management")

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
      //   setFormQueryState({
      //   type:"error",
      //   value:true
      // })
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
      // setFormQueryState({
      //   type:"success",
      //   value:true
      // })

      setFormQueryState({
        type:"submited",
        value:false
      })

      setIsUpdate(false)

    })()
  },[formState.success])


  return (
    <form>
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
                // ((item_input.forForm.post || !item_input.forForm.put)
                //   || 
                //   (item_input.forForm.put || item_input.forForm.post))
                // &&
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
                    render={({field})=>
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
                      
                      item_input.options.isMultiple}
                     options={
                      
                      item_input.options.list.map((item_option)=>{
                      defaultValueList &&
                      console.warn(defaultValueList[item_input!.registerId],item_input.options?.isMultiple)
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
                      {
                      item_input.type === 'file'
                      &&
                      <div className="imagePreviewInfo">
                        <p>Clique para escolher a imagem</p>
                    </div>
                    }
                      {item_input.type === 'file'
                      &&
                      !!imagePreviewSource.length
                      &&
                      <img 
                      id={item_input!.registerId} 
                      src={imagePreviewSource}
                      
                      alt="image_preview"/>
                    }
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
                      defaultValue={defaultValueList && defaultValueList[item_input!.registerId]}
                      type={item_input!.type}
                      id={item_input!.id}
                      {...register(item_input!.registerId as Path<SchemaType>)}
                      onChange={(e)=>{
                        item_input.type === 'file'
                        &&
                        e.target.files?.length
                        &&
                        (()=>{
                          const current_file = e.target.files[0]
                          const reader = new FileReader();
                          reader.onload = (e_img)=>{
                            const image_source = e_img.target?.result as string
                            setImagePreviewSource(image_source)
                          }
                          reader.readAsDataURL(current_file)
                        })()
                      }}
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
        <Communication
        formState={formState}
        // serverState={formQueryState}
        />
        {/* {
           !!formQueryState.isSuccessView
          && <ServerMessage
          message={formState.success.message}
          type="success"
          onClose={
            ()=>{
              setFormQueryState({
                type:"success",
                value:false
              })
            }
          }
          />
        }
        {
          !!formQueryState.isErrorView
          &&  <ServerMessage
          message={formState.error.message}
          type="error"
          onClose={
            ()=>{
              setFormQueryState({
                type:"error",
                value:false
              })
            }
          }
          />
        } */}
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
              // style={{
              //   backgroundColor:
              //   formQueryState.isSent
              //   ? "var(--selectedBlue_var)"
              //   : "var(--blue_var)" ,
              // }}
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
  )
}

export default Form
