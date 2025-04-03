import Register from "../../../../components/form/register/Register.component"

const ThirdRegisterStep = () => {
  return (
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
  )
}

export default ThirdRegisterStep
