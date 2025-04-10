import './Home.route.css'
import NavHome from '../../components/nav/home/NavHome.component'
import FooterHome from '../../components/footer/home/FooterHome.component'
import GroupBook from '../../components/list/book/GroupBook.component'
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
      <NavHome/>
        <Main contentStyle={{
          flexDirection:"column",
          width:"var(--mainContainerWidth)",
          gap:"3.5rem",
          padding:"3.5rem 2rem 3.5rem 2rem",
          marginTop:"5rem",
        }}>
        <Slider/>
          <GroupBook title="Livros em destaque" itemList={livros}/>
          <GroupBook title="Livros em destaque" itemList={livros}/>
        </Main>
      <FooterHome/>
    </section>
  )
}

export default Home
