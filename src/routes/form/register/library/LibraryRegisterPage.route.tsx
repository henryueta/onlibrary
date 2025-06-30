import "./LibraryRegisterPage.route.css";
import Form from "../../../../components/form/global/component/Form.component"
import { form } from "../../../../objects/form.object"
import onlibrary_logo from "../../../../assets/imgs/logo/white_onlibrary_logo.png"
import useHandlePath from "../../../../hooks/useHandlePath";

const LibraryRegisterPage = ()=>{

  const {onTransition,currentPathContext} = useHandlePath()

  return (
    <section className={"libraryFormSection "+currentPathContext.transitionClass}>
      <div className="headerContainer">
          <div className="logoContainer" 
          onClick={()=>{
              onTransition("/",{
                hasReplace:true
              })
          }}
          >
            <img src={onlibrary_logo} alt="onlibrary_logo" />
          </div>
          <div className="titleContainer">
            <h1>
              Cadastrando sua biblioteca
            </h1>
          </div>
      </div>
         <Form
         redirectTo="/user/libraries"
          method={{
           post:true,
           put:false
          }}
           formSchema={form.formList.find((item)=>item.name == "library")!.schema['post']}
          typeOfData={'library'}
           onSubmit={()=>{}}
           />
    </section>
  )

}


export default LibraryRegisterPage
