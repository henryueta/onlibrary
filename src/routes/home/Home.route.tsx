import './Home.route.css';
import NavHome from '../../components/nav/home/NavHome.component'
import FooterHome from '../../components/footer/home/FooterHome.component'
import GroupBook from '../../components/group/book/GroupBook.component'
import Slider from '../../components/slider/Slider.component'
import Main from '../../components/main/Main.component'
import jsPDF from 'jspdf'
import {autoTable} from "jspdf-autotable"
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import useHandleLibrary from '../../hooks/useHandleLibrary';

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
      // você pode adicionar outras propriedades se precisar
    };
  }
}

function Home() {

  const {onAxiosQuery} = useAxios();
  const {currentLibraryContext} = useHandleLibrary();
  const [data,setData] = useState<any>();



  useEffect(()=>{
    !!currentLibraryContext.libraryId
    &&
    onAxiosQuery("get",{
      url:"http://localhost:4200/data/get/summary?id="+currentLibraryContext.libraryId,
      type:{
        get:{}
      },
      onResolver:{
        then(result) {
            setData(result.data)
        },
        catch(error){
          console.log(error)
        }
      }
    })

  },[currentLibraryContext.libraryId])


  const teste = ()=>{

    const doc = new jsPDF();


    doc.text("Relatório Onlibrary",10,10)

    

    Object.entries(data).map((item,index)=>{
      
      const finalY = !!doc.lastAutoTable 
    ? doc.lastAutoTable.finalY
    : 10;

      const header_list  = item[1] as object[]
      const formated_header = Object.entries(header_list[index]).map((header)=>{
        return header[0]
      })
      const data_list = item[1] as object[]
      const formated_data = data_list.map((data_header)=>Object.entries(data_header).map((data)=>{
        return data[0].toLowerCase() !== "fk_id_usuario"
        &&
        data[0].toLowerCase() !== "fk_id_biblioteca"
        &&
        data[0].toLowerCase() !== "id"
        &&
         data[1]
      })).map((obj)=>obj.filter((noBoolean)=>!!noBoolean))


      autoTable(doc, {
        head: [(()=>{
          console.warn(formated_header)
          return formated_header.filter((accept_item)=>
      accept_item !== "id"
      &&
      accept_item !== "fk_id_biblioteca"
       &&
       accept_item !== "fk_id_usuario"
     )
        })()],
        body: (()=>{
          console.warn(formated_data)
          return formated_data
        })(),
        startY: finalY + 10,
        tableWidth:"auto",
        styles:{
          fontSize:7
        }
      });
    })
    
  
  
    doc.save('multiplas-tabelas.pdf');

  }

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
          <button
          onClick={()=>{
            !!data
            &&
            teste()
          }}
          >CLICK</button>
          <GroupBook
           title="Livros em destaque" 
          category=''
           />
           <GroupBook
           title="Livros em destaque" 
          category=''
           />
           
        </Main>
      <FooterHome/>

    </section>
  )
}

export default Home
