import { useState } from "react"
import RegisterLibrary from "../../../../components/form/register/library/RegisterLibrary.component"
import NavForm from "../../../../components/nav/form/NavForm.component"
import "./LibraryRegisterPage.route.css"
import z from "zod"
import {Controller,useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PatternFormat } from "react-number-format"

const schema = z.object({
  libraryName_reg:z.string().refine((val)=>val.trim().length > 0,{
    message:"Campo nome inválido"
  }),
  libraryTelephone_reg:z.string().refine((val)=>val.trim().length > 0,{
    message:"Campo nome inválido"
  }),
  libraryRoadAdress_reg:z.string().refine((val)=>val.trim().length > 0,{
    message:"Campo nome inválido"
  }),
  libraryNumberAdress_reg:z.string().refine((val)=>val.trim().length > 0,{
    message:"Campo nome inválido"
  }),
  libraryCepAdress_reg:z.string().refine((val)=>val.trim().length > 0,{
    message:"Campo nome inválido"
  }),
  libraryNeighborhoodAdress_reg:z.string().refine((val)=>val.trim().length > 0,{
    message:"Campo nome inválido"
  }),
  reservationOption_reg:z.boolean(),
  amerceOption_reg:z.boolean(),
  userBlockOption_reg:z.boolean()
})  

type LibraryRegisterProps = z.infer<typeof schema>;

type LibraryRegisterType = keyof LibraryRegisterProps


interface LibraryDataProps{
  id:string,
  title:string,
  registerId:LibraryRegisterType,
  maskFormat?:string
}

const reg_names:string[] = Object.keys(schema.shape);

const LibraryRegisterPage = () => {

  const {register,formState,handleSubmit,control} = useForm<LibraryRegisterProps>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema)
  });

  const {errors,isValid} = formState;

  const [libraryOptions] = useState<LibraryDataProps[]>([
    {
      id:"reservationOption_id",
      title:"Reservas online",
      registerId:"reservationOption_reg"
    },
    {
      id:"amerceOption_id",
      title:"Multa para devoluções vencidas",
      registerId:"amerceOption_reg"
    },
    {
      id:"userBlockOption_id",
      title:"Bloqueio de conta para devoluções vencidas",
      registerId:"userBlockOption_reg"
    }
  ])
  const [libraryInformation] = useState<LibraryDataProps[][]>([
   [
    {
      id:"libraryName_id",
      title:"Nome",
      registerId:"libraryName_reg"
    },
    {
      id:"libraryTelephone_id",
      title:"Telefone",
      registerId:"libraryTelephone_reg",
      maskFormat:"(11) ####-####"
    }
   ],
   [
    {
      id:"libraryRoadAdress_id",
      title:"Rua",
      registerId:"libraryRoadAdress_reg"
    }
   ],
   [
    {
      id:"libraryNumberAdress_id",
      title:"Número",
      registerId:"libraryNumberAdress_reg"
    },
    {
      id:"libraryCepAdress_id",
      title:"CEP",
      registerId:"libraryCepAdress_reg",
      maskFormat:"#####-###"
    },
    {
      id:"libraryNeighborhoodAdress_id",
      title:"Bairro",
      registerId:"libraryNeighborhoodAdress_reg"
    }
   ]
  ])

  return (
    <>
       <NavForm/>
       <RegisterLibrary 
       handleRegister={()=>{
        return isValid 
        ? (()=>{
          handleSubmit((data)=>{
            console.log(data)
          })()
          return true
        })()
        : (()=>{
          return false
        })()
      }} 
       checkboxList={
            libraryOptions.map((item,index)=>
                <label htmlFor={item.id} key={index}>
                  <input type="checkbox" id={item.id} {...register(item.registerId,{
                    required:true
                    })}/>
                  <span>
                      {item.title}
                  </span>
                </label>
                 )
                        
        }>
            {
              libraryInformation.map((item,index)=>
                <div className="inputContainer" key={index}>
                    {
                      item.map((item_input,index_input)=>{
                       return <label htmlFor={item_input.id} key={index_input}>
                          <p>{item_input.title}</p>
                            
                         { 
                         item_input.maskFormat?

                          <Controller 
                          name={item_input.registerId}
                          control={control}
                          render={({field})=>{
                           const index =  reg_names[reg_names.indexOf(field.name)]
                           return schema.shape[index as LibraryRegisterType] instanceof z.ZodBoolean == false
                           ?
                            <PatternFormat {...field} format={item_input?.maskFormat || ""} mask="_" 
                            value={typeof field.value === 'string' ? field.value:typeof field.value === "string" ? field.value : "" }/>
                            :
                            <></>
                          }}
                          >
                          </Controller> 
                          : <input type="text" {...register(item_input.registerId)}/>
                      }                     
                           {
                             Object.entries(errors).map((item,index)=>
                             {
                              return item[1].message && item[0] == item_input.registerId
                              && <p key={index}>{item[1].message}</p>

                             }
                            )
                           }

                            
                        </label>
                      })
                    }
                </div>
              )
            }

       </RegisterLibrary> 
    </>
  )
}

export default LibraryRegisterPage
