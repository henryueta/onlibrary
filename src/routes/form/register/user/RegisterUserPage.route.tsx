// import RegisterUser from "../../../../components/form/register/user/RegisterUser.component";
// import NavForm from "../../../../components/nav/form/NavForm.component";
// import z, { ZodRawShape, ZodTypeAny } from "zod";
// import { schema } from "../../../../schema/form.schema";
// import useHandleRegister, { FormStepType } from "../../../../hooks/useHandleRegister";
// import { useParams } from "react-router-dom";
// import Form from "../../../../components/form/global/component/Form.component";
// import { form, InputProps } from "../../../../objects/form.object";
// import { useEffect, useState } from "react";
// import { FormDataProps } from "../../../../context/RegisterContext";
// import { useForm } from "react-hook-form";


// interface RegisterFormProps {
//   schema:{ [k: string]: ZodTypeAny; },
//   form:InputProps[]
// }

// const RegisterUserPage = () => {

// const {type} = useParams();

//   // const {authRegisterContext,onformep,onStep} = useHandleRegister();
//   // const [registerForm,setRegisterForm] = useState<RegisterFormProps | null>(null);


//   // useEffect(()=>{
//   //   setRegisterForm(onformep(type as  FormStepType|| null) as RegisterFormProps || {
//   //     form:[],
//   //     schema:[]
//   //   })
//   // },[type])

//   return (
//    <>
//     <NavForm/>
//     <RegisterUser step={type as FormStepType} registerStep={2} handleRegister={()=>{
//           // return isValid  
//           // ? (()=>{
//           //   handleSubmit((data)=>{
//           //     return onStep(1,data as FormDataProps)
//           //   })()
//           //   return true
//           // })()
//           // : (()=>{
//           //   return false
//           // })()
//           return true
//         }}>
//             {/* {
//               !!registerForm  
//               &&
//               <Form
//              formSchema={registerForm.schema} 
//              fields={registerForm.form}
//              />
//             } */}
//       </RegisterUser> 
//   </>
//   )
// }

// export default RegisterUserPage
