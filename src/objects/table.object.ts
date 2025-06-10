import { AssociationTableProps } from "./form.object";
import {path } from "./path.object";

export type TableType = "none" | "library" |"book" | "user" | "library_user" | "account"| "loan" | "reserve" | "amerce" | "exemplary" | "author" | "publisher" | "category" | "gender";
export type TableTitleType = "Livro" | "Usuário" | "Perfil" | "Empréstimo" | "Reserva" | "Multa" | "Exemplar" | "Autor" | "Editora" | "Categoria" | "Gênero"

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
Record<'bibliotecario'|'situacao'|'data_retirada'|'quantidade_total',string>
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
    getById:"http://localhost:3300/library/get/dependencies",
    post:"",
    put:"https://onlibrary-api.onrender.com/api/biblioteca/atualizar-biblioteca",
    delete:"",
    referenceText:"",
    graphic:""
  },
  book:{
    getById:"http://localhost:3300/book/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/livro/criar-livro",
    put:"https://onlibrary-api.onrender.com/api/livro/atualizar-livro",
    delete:"",
    referenceText:"http://localhost:3300/book/get/search",
    graphic:""
    
  },
  user:{
    getById:"http://localhost:3300/user/get/dependencies",
    post:"",
    put:"https://onlibrary-api.onrender.com/api/auth/atualizar-usuario",
    delete:"",
    referenceText:"",
    graphic:""
  },
  library_user:{
    getById:"http://localhost:3300/library_user/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/criar-usuarioBiblioteca",
    put:"https://onlibrary-api.onrender.com/api/usuarioBiblioteca/atualizar-usuarioBiblioteca",
    delete:"http://localhost:3300/library_user/delete",
    referenceText:"http://localhost:3300/library_user/get/search",
    graphic:""
  },
  loan:{
    getById:"http://localhost:3300/loan/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/emprestimo/criar-emprestimo",
    put:"https://onlibrary-api.onrender.com/api/emprestimo/atualizar-emprestimo",
    delete:"",
    referenceText:"http://localhost:3300/loan/get/search",
    graphic:""
    // "http://localhost:3300/loan/put",
  },
  amerce:{
    getById:"http://localhost:3300/amerce/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/multa/criar-multa",
    put:"https://onlibrary-api.onrender.com/api/atualizar-multa",
    delete:"",
    referenceText:"http://localhost:3300/amerce/get/search",
    graphic:""
  },
  online_reserve:{
    getById:"http://localhost:3300/reserve/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/reserva/criar-reserva",
    put:"https://onlibrary-api.onrender.com/api/reserva/atualiza-reserva",
    delete:"",
    referenceText:"http://localhost:3300/reserve/get/search",
    graphic:""
  },
  reserve:{
    getById:"http://localhost:3300/reserve/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/reserva/criar-reserva",
    put:"https://onlibrary-api.onrender.com/api/reserva/atualiza-reserva",
    delete:"",
    referenceText:"http://localhost:3300/reserve/get/search",
    graphic:""
  },
   account:{
    getById:"http://localhost:3300/account/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/perfil/criar-perfil",
    //http://localhost:3300/account/post
    put:"https://onlibrary-api.onrender.com/api/perfil/atualizar-perfil",
    delete:"",
    referenceText:"http://localhost:3300/account/get/search",
    graphic:""

  },
  exemplary:{
    getById:"http://localhost:3300/exemplary/get/dependencies",
    post:"https://onlibrary-api.onrender.com/api/exemplar/criar-exemplar",
    put:"https://onlibrary-api.onrender.com/api/exemplar/atualizar-exemplar",
    delete:"",
    referenceText:"http://localhost:3300/exemplary/get/search",
    graphic:""
  },
  author:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/autor/criar-autor",
    put:"https://onlibrary-api.onrender.com/api/autor/atualizar-autor",
    delete:"",
    referenceText:"",
    graphic:""
  },
  category:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/categoria/criar-categoria",
    put:"https://onlibrary-api.onrender.com/api/categoria/atualizar-categoria",
    delete:"",
    referenceText:"",
    graphic:""
  },
  publisher:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/editora/criar-editora",
    put:"https://onlibrary-api.onrender.com/api/editora/atualizar-editora",
    delete:"",
    referenceText:"",
    graphic:""
  },
  gender:{
    getById:"",
    post:"https://onlibrary-api.onrender.com/api/genero/criar-genero",
    put:"https://onlibrary-api.onrender.com/api/genero/atualizar-genero",
    delete:"",
    referenceText:"",
    graphic:""
  }


}

const tableTypeDataList:TableTypeProps[] = [
  {
    type:"library",
    title:"Biblioteca",
    quantity:0,
    warning:false,
    operations:{
      post:true,
      delete:true,
      put:true
    },
    path:path.onFindPath("library_choice"),
    headers:[],
    dependencies:[]
  },
    {
        type:"none",
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
        type:"book",
        title:tableTitleList[onFindTitleIndex("Livro")],
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"book"
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
        type:"author",
        title:"Autor",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("list_data_management",[
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
        title:"Editora",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("list_data_management",[
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
        title:"Categoria",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("list_data_management",[
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
        title:"Gênero",
        quantity:0,
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        path: path.onCreatePathParams("list_data_management",[
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
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Usuário")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
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
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Perfil")],
        headers:[],
        dependencies:[],
        path:path.onCreatePathParams("list_data_management",[
            {
                field:"type",
                param:"account"
            }
        ]),
        quantity:0
    }, {
        type:"loan",
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Empréstimo")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
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
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Reserva")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
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
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:"Multa",
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
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
        warning:false,
        operations:{
          post:true,
          put:true,
          delete:true
        },
        title:tableTitleList[onFindTitleIndex("Exemplar")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
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
      warning:false,
      operations:{
          post:false,
          put:false,
          delete:false
        },
      title:"Reserva Online",
      quantity:0,
      path:path.onCreatePathParams("list_data_management",[
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
    return tableTypeDataList.findIndex((item)=>item.type == type);
}

const onFindTablePath = (type:TableType)=>{
    return tableTypeDataList.find((item)=>item.type == type)?.path
}

export {
    tableTypeDataList,
    tableRoutes,
    onFindTableIndex,
    onFindTablePath
}
