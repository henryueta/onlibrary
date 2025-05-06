import "../../global/component/global.component.css";
import "./RegisterLibrary.component.css"

interface RegisterLibraryProps {
  children:React.ReactNode
  checkboxList:React.ReactNode
  handleRegister:()=>boolean
}

const RegisterLibrary = ({children,checkboxList,handleRegister}:RegisterLibraryProps) => {
  return (
    <section className="formSection">
        <div className="registerLibraryContainer">
            <div className="registerTitleContainer">
                <h1>Crie sua biblioteca online</h1>
            </div>
            <form>
              <div className="registerDetailsContainer">
                  <div className="libraryInformationContainer">
                      {children}
                  </div>
                  <div className="libraryOptionsContainer">
                    <div className="titleContainer">
                      <span>
                          Opções de uso
                      </span>
                    </div>
                    <div className="checkboxListContainer">
                      {checkboxList}
                    </div>
                  </div>
            </div>
          </form>
          <div>
            <button onClick={()=>handleRegister()}>
                Concluir
            </button>
          </div>
        </div>
    </section>
  )
}

export default RegisterLibrary
