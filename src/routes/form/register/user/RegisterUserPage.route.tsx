import RegisterUser from "../../../../components/form/register/user/RegisterUser.component";
import NavForm from "../../../../components/nav/form/NavForm.component";
import z from "zod";
import { schema } from "../../../../schema/form.schema";
import useHandleRegister from "../../../../hooks/useHandleRegister";
import { useParams } from "react-router-dom";

type RegisterStep1Props = z.infer<typeof schema.schemaList.user.register.step1>;

const RegisterUserPage = () => {

const {type} = useParams();

  const {authRegister,onStep} = useHandleRegister();
    console.log(authRegister)

  return (
   <>
    <NavForm/>
    <RegisterUser registerStep={1} handleRegister={()=>true}>
            <></>
      </RegisterUser> 
  </>
  )
}

export default RegisterUserPage
