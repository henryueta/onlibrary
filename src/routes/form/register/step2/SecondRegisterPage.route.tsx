import Register from "../../../../components/form/register/Register.component"
import NavForm from "../../../../components/nav/form/NavForm.component"

const SecondRegisterStep = () => {
  return (
    <>
      <NavForm/>
      <Register registerStep={2}>
        <label htmlFor="">
          <p>Username:</p>
          <input type="text" />
        </label>
        <label htmlFor="">
          <p>Email:</p>
          <input type="text" />
        </label>
        <label htmlFor="">
          <p>Telefone(opcional):</p>
          <input type="text" />
        </label>
      </Register>
    </>

  )
}

export default SecondRegisterStep
