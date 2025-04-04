import "./FirstRegisterPage.route.css";
import Register from "../../../../components/form/register/Register.component";
import NavForm from "../../../../components/nav/form/NavForm.component";

const FirstRegisterStep = () => {
  return (
   <>
    <NavForm/>
    <Register registerStep={1}>
        <label htmlFor="">
          <p>Nome:</p>
          <input type="text"/>
        </label>
        <label htmlFor="">
            <p>Sobrenome:</p>
            <input type="text"/>
        </label>
        <label htmlFor="">
            <p>CPF:</p>
            <input type="text"/>
        </label> 
      </Register> 
  </>
  )
}

export default FirstRegisterStep
