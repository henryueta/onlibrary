import './Home.route.css'
import Nav from '../../components/nav/Nav.component'
import Footer from '../../components/footer/Footer.component'
import List from '../../components/list/List.component'
import Slider from '../../components/slider/Slider.component'
import Main from '../../components/main/Main.component'
import teste from "../../assets/imgs/teste.webp"

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
      <Nav/>
        <Main contentStyle={{
          flexDirection:"column",
          width:"var(--mainContainerWidth)",
          gap:"3.5rem",
          padding:"3.5rem 0px 3.5rem 0px",
          marginTop:"5rem"
        }}>
        <Slider/>
          <List title="Livros em destaque" itemList={livros}/>
          <List title="Livros em destaque" itemList={livros}/>
        </Main>
      <Footer/>
    </section>
  )
}

export default Home
