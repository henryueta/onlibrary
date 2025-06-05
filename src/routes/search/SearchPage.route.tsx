import "./SearchPage.route.css";
import NavHome from "../../components/nav/home/NavHome.component";
import HeaderTitle from "../../components/header_title/HeaderTitle.component";
import BookCard from "../../components/card/book/BookCard.component";
import { data, useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import useHandleSearch from "../../hooks/useHandleSearch";

const filterList = 
[
    {
        title:"Todos",
        value:"todos"
    },
    {
        title:"Título",
        value:"titulo"   
    },
    {
        title:"Autores",
        value:"autor"
    },
    {
        title:"Categorias",
        value:"categoria"
    },
    {
        title:"Gêneros",
        value:"genero"
    },
    {
        title:"Editoras",
        value:"editora"
    }
]



const SearchPage = () => {


    const {value,filter} = useParams();
    const {currentSearchContext} = useHandleSearch();
    // const [dataFilterState,setDataFilterState] = useReducer(onHandleDataFilterState,initialDataFilterState);
    const [dataFilter,setDataFilter] = useState<string>(
        !!filter?.length
        ? filter
        : filterList[0].value
    );
    const onNavigate = useNavigate();
    // const [searchPageState,setSearchPageState] = useReducer(onHandleSearchPageState,initialSearchPageState);
useEffect(()=>{
    !!value?.length && !!filter?.length
    &&
    currentSearchContext.setSearchContextState({
        type:"currentValueFilter",
        value:{
            currentValue:value,
            filter:filter
        }
    })
    
    !!filter?.length
    && setDataFilter(filter)

},[value,filter])

useEffect(()=>{

    !!dataFilter.length
    &&
    (()=>{
        currentSearchContext
        .setSearchContextState({
        type:"filter",
        value:dataFilter
        })
        onNavigate(`/search/${value}/${dataFilter}`,{replace:true})
    })()
    
},[dataFilter])

  return (
    <section className="searchPageSection">
        <NavHome/>
        <section className="filterSeaction">
                <div className="filterContainer">
                    <HeaderTitle
                    title="Filtragem"
                    hasHrLine
                    />  
                </div>
                <div className="typeTitleContainer">
                    <p>
                        Tipo de pesquisa
                    </p>
                </div>
                <div className="filterListContainer">
                    {
                        filterList.map((item)=>{
                            return (
                                <button
                                style={
                                    item.value === filter
                                    ? {color:"var(--blue_var)"}
                                    : {}
                                }
                                onClick={()=>{
                                    setDataFilter(item.value)                                   
                                }}>
                                    {item.title}
                                </button>
                            )
                        })
                    }
                </div>
            </section>
        <section className="bookSearchSection">
            
            <section className="resultSection">
                <div className="resultContainer">
                    <HeaderTitle
                    title={
                        `Resultado sobre a pesquisa "${value}"
                         com filtragem "${filterList.find((item)=>item.value == dataFilter)?.title}"`}
                    hasHrLine
                    />
                    <div className="resultQuantityContainer">
                        <p>{"0 resultados"}</p>
                    </div>
                    <div className="dataContainer">
                    <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                        <BookCard
                        id=""
                        image={{
                        height:400,
                        width:250,
                        url:"https://wtrxmsmkatrnenkhanra.supabase.co/storage/v1/object/public/onlibrarybucket/image/book/teste2%20(1).webp"
                        }}
                        title="aaa"
                        />
                    </div>
                </div>  
            </section>
        </section>
    </section>
  )
}

export default SearchPage
