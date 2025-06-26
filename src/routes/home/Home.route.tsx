import './Home.route.css';
import NavHome from '../../components/nav/home/NavHome.component'
import FooterHome from '../../components/footer/home/FooterHome.component'
import Slider from '../../components/slider/Slider.component'
import Main from '../../components/main/Main.component'
import useHandlePath from '../../hooks/useHandlePath';
import GroupByCategory from '../../components/group/category/GroupByCategory.component';



function Home() {

  
  const {currentPathContext} = useHandlePath();

  return (
    <>
    <section className={'homeSection'}>
      <NavHome/>
        
        <Main 
        className={'mainContent '+currentPathContext.transitionClass}
        contentStyle={{
          flexDirection:"column",
          width:"var(--mainContainerWidth)",
          gap:"3.5rem",
          padding:"3.5rem 2rem 3.5rem 2rem",
          marginTop:"5rem",
        }}>
        <Slider/>
          <GroupByCategory/>           
        </Main>
        
      <FooterHome/>

    </section>
    </>
  )
}

export default Home
