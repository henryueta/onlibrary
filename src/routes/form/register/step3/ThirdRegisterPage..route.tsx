import Register from "../../../../components/form/register/Register.component"
import NavForm from "../../../../components/nav/form/NavForm.component"

const ThirdRegisterStep = () => {
  return (
    <>
      <NavForm/>
      <Register registerStep={3}>
        <label htmlFor="">
          <p>Senha:</p>
          <input type="text" />
        </label>
        <label htmlFor="">
          <p>Repita sua senha:</p>
          <input type="text" />
        </label>
      </Register>
    </>
  )
}

export default ThirdRegisterStep
