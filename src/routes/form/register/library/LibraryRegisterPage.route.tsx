import "./LibraryRegisterPage.route.css";
import Form from "../../../../components/form/global/component/Form.component"
import { form } from "../../../../objects/form.object"
import white_onlibrary_logo from "../../../../assets/imgs/logo/white_onlibrary_logo.png";
import { onFindTablePath } from "../../../../objects/table.object";

const LibraryRegisterPage = ()=>{

  return (
    <section className="libraryFormSection">
      <div className="headerContainer">
          <div className="logoContainer">
            <img src={white_onlibrary_logo} alt="" />
          </div>
          <div className="titleContainer">
            <h1>
              Cadastrando sua biblioteca
            </h1>
          </div>
      </div>
         <Form
          method={{
           post:true,
           put:false
          }}
           formSchema={form.formList.find((item)=>item.name == "library")!.schema['post']}
          typeOfData={'library'}
           onSubmit={(data)=>console.log(data)}
           />
    </section>
  )

}


export default LibraryRegisterPage
