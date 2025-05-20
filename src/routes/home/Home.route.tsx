import './Home.route.css'
import NavHome from '../../components/nav/home/NavHome.component'
import FooterHome from '../../components/footer/home/FooterHome.component'
import GroupBook from '../../components/group/book/GroupBook.component'
import Slider from '../../components/slider/Slider.component'
import Main from '../../components/main/Main.component'
import teste from "../../assets/imgs/teste2.webp"

const livros = [{
  image:teste,
  title:"A névoa da floresta"
},
{
  image:teste,
  title:"A névoa da floresta"
},
{
  image:teste,
  title:"A névoa da floresta"
},
{
  image:teste,
  title:"A névoa da floresta"
},
{
  image:teste,
  title:"A névoa da floresta"
},{
  image:teste,
  title:"A névoa da floresta"
},{
  image:teste,
  title:"A névoa da floresta"
}]

function Home() {

  return (
    <section className='homeSection'>
      <NavHome/>
        <Main contentStyle={{
          flexDirection:"column",
          width:"var(--mainContainerWidth)",
          gap:"3.5rem",
          padding:"3.5rem 2rem 3.5rem 2rem",
          marginTop:"5rem",
        }}>
        <Slider/>

          <GroupBook
           title="Livros em destaque" 
           itemList={livros}
          category=''
           />

          <GroupBook 
          title="Livros em destaque" 
          itemList={livros}
          category=''
          />

        </Main>
      <FooterHome/>

      {/* <form>
        <input type="file" {...register("image")}/>
        
      </form>
      <button type='button' onClick={()=>handleSubmit((data)=>
          {
            
            const formData = new FormData();

            formData.append("image",data.image[0])

            axios.post("http://localhost:3500/upload",formData,{
              headers:{
                "Content-Type":"multipart/form-data"
              }
            })
          .then((result)=>console.log(result.data))
          .catch((error)=>console.log(error))
          }
        )()}>Enviar</button> */}

    </section>
  )
}

export default Home
