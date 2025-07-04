import { AssociationTableProps } from "./form.object";
import {path } from "./path.object";

export type TableType = 
"library_management"
|"global_management" 
| "library" 
|"book"
|"library_book" 
| "user"
| "library_user"
| "account"
| "loan"
| "reserve"
| "amerce"
| "exemplary"
| "library_author"
| "library_publisher"
| "library_category"
| "library_gender"
| "author"
| "publisher"
| "category"
| "gender";


export type TableTitleType = 
"Biblioteca"
|"Livro" 
| "Usuário" 
| "Perfil" 
| "Empréstimo" 
| "Reserva" 
| "Multa" 
| "Exemplar" 
| "Autor" 
| "Editora" 
| "Categoria" 
| "Gênero"

type account_situation = "ativo" | "bloqueado"



export type LibraryTableQueryProps =
Record<'id'|'nome'|'bairro'|'rua'|'cep'|'telefone',string>
& Record<'numero',number>
& Record<'aplicacao_multa'|'aplicacao_bloqueio'|'reserva_online',boolean>

export type AuthorTableQueryProps =
Record<'id'|'nome',string>

export type CategoryTableQueryProps =
Record<'id'|'nome',string>

export type GenderTableQueryProps =
Record<'id'|'nome',string>

export type PublisherTableQueryProps =
Record<'id'|'nome',string>

export type ExemplaryTableQueryProps =
Record<'id'|'livros_biblioteca'|'setor'|'prateleira'|'estante',string>
& 
Record<'situacao',
Record<
'disponivel'|
'indisponivel'|
'reservado'|
'emprestado',
string>>

& Record<'numero_tombo',number>

export type LoanTableQueryProps =
Record<'bibliotecario'|'situacao'|'data_devolucao',string>
& Record<'exemplares_biblioteca'|'usuarios_biblioteca',AssociationTableProps>

export type ReserveTableQueryProps =
Record<'bibliotecario'|'situacao'|'data_retirada'|'quantidade_total'|'exemplares',string>
& Record<'livros_biblioteca'|'usuarios_biblioteca',AssociationTableProps>

export type AmerceTableQueryProps =
Record<'bibliotecario'|'valor'|'situacao'|'data_vencimento'|'motivo',string>
& Record<'usuarios_biblioteca',AssociationTableProps>

export type AccountTableQueryProps =
Record<'biblioteca'|'nome'|'multa_padrao'|'prazo_devolucao_padrao'|'prazo_multa_padrao',string>

export type LibraryUserTableQueryProps =
Record<'usuarios'|'perfis_biblioteca',AssociationTableProps>
& Record<'tipo_usuario'|'numero_matricula'|'biblioteca'|'cpf'|'situacao',string>

export type BookTableQueryProps =
Record<'id'| 'ISBN' | 'titulo' | 'descricao'|'imagem',string>
&
Record<'ano_lancamento',number>
&
Record<'autores'|'categorias'|'generos'|'editoras',AssociationTableProps>

export type UserTableQueryProps =
Record<'id'|'nome'| 'sobrenome'| 'email'| 'cpf'|'senha'| 'username',string>
&
Record<'situacao',account_situation>




export type TableQueryProps=
BookTableQueryProps |
UserTableQueryProps |
LibraryTableQueryProps |
AuthorTableQueryProps |
CategoryTableQueryProps |
GenderTableQueryProps |
PublisherTableQueryProps |
ExemplaryTableQueryProps |
LoanTableQueryProps |
ReserveTableQueryProps |
AmerceTableQueryProps |
AccountTableQueryProps |
LibraryUserTableQueryProps;

export interface TableTypeProps {
    type:TableType | 'online_reserve',
    management:"global"|"library"
    title:string,
    quantity:number,
    warning?:boolean,
    operations:{
      post:boolean,
      put:boolean,
      delete:boolean
    }
    path:string,
    headers:string[],
    dependencies:string[]
}

const tableTitleList = [
    "Livro",
    "Usuário",
    "Biblioteca",
    "Perfil",
    "Empréstimo",
    "Reserva",
    "Multa",
    "Exemplar",
    "Autor",
    "Editora",
    "Categoria",
    "Gênero"
]



const onFindTitleIndex = (title:TableTitleType)=>{
    return  tableTitleList.findIndex((item)=>item === title)
}

const tableRoutes = {
  library:{
    getById:"https://onlibrary-api.onrender.com/api/biblioteca/dependencies",
    post:"",
    put:"https://onlibrary-api.onrender.com/api/biblioteca/atualizar-biblioteca",
    delete:"https://onlibrary-api.onrender.com/api/biblioteca/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/biblioteca/search",
    graphic:""
  },
  book:{
    getById:"https://onlibrary-api.onrender.com/api/livro/dependencies",
    post:"https://onlibrary-api.onrender.com/api/livro/criar-livro",
    put:"https://onlibrary-api.onrender.com/api/livro/atualizar-livro",
    delete:"",
    referenceText:"https://onlibrary-api.onrender.com/api/livro/{livroId}/details",
    graphic:""
  },
  library_book:{
    getById:"",
    post:"",
    put:"",
    delete:"",
    referenceText:"https://onlibrary-api.onrender.com/api/livro/search/biblioteca",
    graphic:""
  },
  library_author:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/autor/criar-autor",
    put:"https://onlibrary-api.onrender.com/api/autor/atualizar-autor",
    delete:"",
    referenceText:"",
    graphic:""
  },
  library_category:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/categoria/criar-categoria",
    put:"https://onlibrary-api.onrender.com/api/categoria/atualizar-categoria",
    delete:"",
    referenceText:"",
    graphic:""
  },
  library_publisher:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/editora/criar-editora",
    put:"https://onlibrary-api.onrender.com/api/editora/atualizar-editora",
    delete:"",
    referenceText:"",
    graphic:""
  },
  library_gender:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/genero/criar-genero",
    put:"https://onlibrary-api.onrender.com/api/genero/atualizar-genero",
    delete:"",
    referenceText:"",
    graphic:""
  },
  user:{
    getById:"https://onlibrary-api.onrender.com/api/usuario/dependencies",
    post:"",
    put:"https://onlibrary-api.onrender.com/api/usuario/atualizar",
    delete:"https://onlibrary-api.onrender.com/api/usuario/deletar",
    referenceText:"",
    graphic:""
  },
  library_user:{
    getById:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/dependencies",
    post:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/criar-usuarioBiblioteca",
    put:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/atualizar-usuarioBiblioteca",
    delete:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/search",
    graphic:""
  },
  loan:{
    getById:"https://onlibrary-api.onrender.com/api/emprestimo/dependencies",
    post:"https://onlibrary-api.onrender.com/api/emprestimo/criar-emprestimo",
    put:"https://onlibrary-api.onrender.com/api/emprestimo/atualizar-emprestimo",
    delete:"https://onlibrary-api.onrender.com/api/emprestimo/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/emprestimo/search",
    graphic:""
  },
  amerce:{
    getById:"https://onlibrary-api.onrender.com/api/multa/dependencies",
    post:"https://onlibrary-api.onrender.com/api/multa/criar-multa",
    put:"https://onlibrary-api.onrender.com/api/multa/atualizar-multa",
    delete:"https://onlibrary-api.onrender.com/api/multa/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/multa/search",
    graphic:""
  },
  online_reserve:{
    getById:"https://onlibrary-api.onrender.com/api/reserva/dependencies",
    post:"https://onlibrary-api.onrender.com/api/reserva/criar-reserva",
    put:"https://onlibrary-api.onrender.com/api/reserva/atualiza-reserva",
    delete:"",
    referenceText:"https://onlibrary-api.onrender.com/api/reserva/search",
    graphic:""
  },
  reserve:{
    getById:"https://onlibrary-api.onrender.com/api/reserva/dependencies",
    post:"https://onlibrary-api.onrender.com/api/reserva/criar-reserva",
    put:"https://onlibrary-api.onrender.com/api/reserva/atualiza-reserva",
    delete:"https://onlibrary-api.onrender.com/api/reserva/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/reserva/search",
    graphic:""
  },
   account:{
    getById:"https://onlibrary-api.onrender.com/api/perfil/dependencies",
    post:"https://onlibrary-api.onrender.com/api/perfil/criar-perfil",
    put:"https://onlibrary-api.onrender.com/api/perfil/atualizar-perfil",
    delete:"https://onlibrary-api.onrender.com/api/perfil/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/perfil/search",
    graphic:""

  },
  exemplary:{
    getById:"https://onlibrary-api.onrender.com/api/exemplar/dependencies",
    post:"https://onlibrary-api.onrender.com/api/exemplar/criar-exemplar",
    put:"https://onlibrary-api.onrender.com/api/exemplar/atualizar-exemplar",
    delete:"https://onlibrary-api.onrender.com/api/exemplar/deletar",
    referenceText:"https://onlibrary-api.onrender.com/api/exemplar/search",
    graphic:""
  },
  author:{
    getById:"https://onlibrary-api.onrender.com/api/autor/dependencies",
    post:"https://onlibrary-api.onrender.com/api/autor/criar-autor",
    put:"https://onlibrary-api.onrender.com/api/autor/atualizar-autor",
    delete:"https://onlibrary-api.onrender.com/api/autor/deletar",
    referenceText:"",
    graphic:""
  },
  category:{
    getById:"https://onlibrary-api.onrender.com/api/categoria/dependencies",
    post:"https://onlibrary-api.onrender.com/api/categoria/criar-categoria",
    put:"https://onlibrary-api.onrender.com/api/categoria/atualizar-categoria",
    delete:"https://onlibrary-api.onrender.com/api/categoria/deletar",
    referenceText:"",
    graphic:""
  },
  publisher:{
    getById:"https://onlibrary-api.onrender.com/api/editora/dependencies",
    post:"https://onlibrary-api.onrender.com/api/editora/criar-editora",
    put:"https://onlibrary-api.onrender.com/api/editora/atualizar-editora",
    delete:"https://onlibrary-api.onrender.com/api/editora/deletar",
    referenceText:"",
    graphic:""
  },
  gender:{
    getById:"https://onlibrary-api.onrender.com/api/genero/dependencies",
    post:"https://onlibrary-api.onrender.com/api/genero/criar-genero",
    put:"https://onlibrary-api.onrender.com/api/genero/atualizar-genero",
    delete:"https://onlibrary-api.onrender.com/api/genero/deletar",
    referenceText:"",
    graphic:""
  }


}

const tableTypeDataList:TableTypeProps[] = [
  {
    type:"user",
    management:"global",
    title:"Usuário",
    quantity:0,
    warning:false,
    operations:{
      post:false,
      delete:true,
      put:true
    },
    path: path.onCreatePathParams("global_list_data_management",[
        {
          field:"type",
          param:"user"
        }
    ]),
    headers:[],
    dependencies:[]
  },
  {
    type:"global_management",
    management:"global",
    title:"",
    quantity:0,
    warning:false,
    operations:{
      post:false,
      delete:false,
      put:false
    },
    path:path.onFindPath("global_management"),
    headers:[],
    dependencies:[
            tableTitleList[onFindTitleIndex("Livro")],
            tableTitleList[onFindTitleIndex("Usuário")],
            tableTitleList[onFindTitleIndex("Biblioteca")]
    ]
  },
    {
        type:"library_management",
        management:"library",
        title:"",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path:path.onFindPath("library_management"),
        headers:[],
        dependencies:
        [
            tableTitleList[onFindTitleIndex("Livro")],
            tableTitleList[onFindTitleIndex("Usuário")],
            tableTitleList[onFindTitleIndex("Empréstimo")],
            tableTitleList[onFindTitleIndex("Reserva")],
            tableTitleList[onFindTitleIndex("Multa")]
        ]
    },
  {
    type:"library",
    management:"global",
    title:"Biblioteca",
    quantity:0,
    warning:false,
    operations:{
      post:false,
      delete:true,
      put:true
    },
    path:path.onCreatePathParams("global_list_data_management",[
        {
          field:"type",
          param:"library"
        }
    ]),
    headers:[],
    dependencies:[]
  },
  {
    type:"library_book",
    management:"library",
    title:tableTitleList[onFindTitleIndex("Livro")],
    quantity:0,
    warning:false,
    operations:{
      post:false,
      delete:false,
      put:false      
    },
     path: path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"library_book"
            }
      ]),
       headers:
        [],
        dependencies:
            [
               tableTitleList[onFindTitleIndex("Exemplar")],  
                tableTitleList[onFindTitleIndex("Autor")],
                tableTitleList[onFindTitleIndex("Editora")],
                tableTitleList[onFindTitleIndex("Categoria")],
                tableTitleList[onFindTitleIndex("Gênero")]
            ]
  },
    {
        type:"library_author",
        management:"library",
        title:"Autor",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"library_author"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"library_publisher",
        management:"library",
        title:"Editora",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"library_publisher"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"library_category",
        management:"library",
        title:"Categoria",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"library_category"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"library_gender",
        management:"library",
        title:"Gênero",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"library_gender"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"book",
        management:"global",
        title:tableTitleList[onFindTitleIndex("Livro")],
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("global_list_data_management",[
            {
              field:"type",
              param:"book"
            }
          ]),
        headers:
        [],
        dependencies:
            [
                tableTitleList[onFindTitleIndex("Autor")],
                tableTitleList[onFindTitleIndex("Editora")],
                tableTitleList[onFindTitleIndex("Categoria")],
                tableTitleList[onFindTitleIndex("Gênero")]
            ]
    },
    {
        type:"author",
        management:"global",
        title:"Autor",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("global_list_data_management",[
            {
              field:"type",
              param:"author"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"publisher",
        management:"global",
        title:"Editora",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("global_list_data_management",[
            {
              field:"type",
              param:"publisher"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"category",
        management:"global",
        title:"Categoria",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("global_list_data_management",[
            {
              field:"type",
              param:"category"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"gender",
        management:"global",
        title:"Gênero",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("global_list_data_management",[
            {
              field:"type",
              param:"gender"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"library_user",
        management:"library",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Usuário")],
        quantity:0,
        path:path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"library_user"
            }
          ]),
        headers:
        [],
        dependencies:
            [
                tableTitleList[onFindTitleIndex("Perfil")]
            ]
    },{
        type:"account",
        management:"library",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Perfil")],
        headers:[],
        dependencies:[],
        path:path.onCreatePathParams("library_list_data_management",[
            {
                field:"type",
                param:"account"
            }
        ]),
        quantity:0
    }, {
        type:"loan",
        management:"library",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Empréstimo")],
        quantity:0,
        path:path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"loan"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"reserve",
        management:"library",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Reserva")],
        quantity:0,
        path:path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"reserve"
            }
          ]),
        headers:
        [],
        dependencies:
        [
          "Reserva Online"
        ]
    },{
        type:"amerce",
        management:"library",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:"Multa",
        quantity:0,
        path:path.onCreatePathParams("library_list_data_management",[
            {
              field:"type",
              param:"amerce"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"exemplary",
        management:"library",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Exemplar")],
        quantity:0,
        path:path.onCreatePathParams("library_list_data_management",[
            {
                field:"type",
                param:"exemplary"
            }
        ]),
        headers:
        [],
        dependencies:
        []
    },
    {
      type:"online_reserve",
      management:"library",
      warning:false,
      operations:{
          post:false,
          put:false,
          delete:false
        },
      title:"Reserva Online",
      quantity:0,
      path:path.onCreatePathParams("library_list_data_management",[
        {
          field:"type",
          param:"online_reserve"
        }
      ]),
      headers:
      [],
      dependencies:
      []
    }
];

const onFindTableIndex = (type:TableType)=>{

    return tableTypeDataList.findIndex((item)=>{
      return item.type === type
    });
}

const onFindTablePath = (type:TableType)=>{
    return tableTypeDataList.find((item)=>item.type == type)?.path
}

export const onCheckTableDependencie = (type:TableTypeProps)=>{

    return !!tableTypeDataList.find((table)=>{
      
      return !!(table.type !== "global_management" && table.type !== "library_management")
      && table.dependencies.find((dep)=>{
        return dep === type.title
      })
    })

}


export {
    tableTypeDataList,
    tableRoutes,
    onFindTableIndex,
    onFindTablePath,
    onFindTitleIndex
}
