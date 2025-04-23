const management_path = "/management/library"
const register_path = "/register"

const onCreateManagementPath = (path:string)=>{
    return `${management_path}${path}`;
}

const onCreateRegisterPath = (path:string)=>{
    return `${register_path}${path}`;
}

interface PathObjectProps {
    list:Record<'type'|'path',string>[],
    onFindIndex(type:string):number
    onFindPath(type:string):string
}

const path:PathObjectProps = {

    list: [
        {
            type:"home_page",
            path:"/"
        },
        {
            type:"book_page",
            path:"/book"
        },
        {
            type:"user_login",
            path:"/login"
        },
        {
            type:"user_register_step1",
            path:onCreateRegisterPath("/user/step/name")
        },
        {
            type:"user_register_step2",
            path:onCreateRegisterPath("/user/step/contact")
        },
        {
            type:"user_register_step3",
            path:onCreateRegisterPath("/user/step/password")
        },
        {
            type:"library_register",
            path:onCreateRegisterPath("/library")
        },
        {
            type:"library_management",
            path:onCreateManagementPath("")
        },
        {
            type:"book_management",
            path: onCreateManagementPath("/book")
        },
        {
            type:"user_management",
            path:onCreateManagementPath("/user")
        },
        {
            type:"loan_management",
            path:onCreateManagementPath("/loan")
        },
        {
            type:"reservation_management",
            path:onCreateManagementPath("/reservation")
        },
        {
            type:"amerce_management",
            path:onCreateManagementPath("/amerce")
        },
        {
            type:"exemplary_management",
            path:onCreateManagementPath("/exemplary")
        },
        {
            type:"author_management",
            path:onCreateManagementPath("/author")
        },
        {
            type:"publisher_management",
            path:onCreateManagementPath("/publisher")
        },
        {
            type:"category_management",
            path:onCreateManagementPath("/category")
        },
        {
            type:"gender_management",
            path:onCreateManagementPath("/gender")
        },
        {
            type:"",
            path:onCreateManagementPath("")
        }
        
        ], 
         onFindIndex(type){
            return this.list.findIndex((item)=>item.type === type);
        },      
         onFindPath(type:string){
            return this.list[this.onFindIndex(type)].path
        }

}


export {
    path
} 