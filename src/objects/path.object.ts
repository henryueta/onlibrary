const management_path = "/management"
const register_path = "/register"


const onCreateManagementPath = (path:string,type:"library"|"global")=>{
    return `${management_path}${
        type === "library"
        ? "/library"
        : "/global"
    }${path}`;
}

const onCreateRegisterPath = (path:string)=>{
    return `${register_path}${path}`;
}

interface PathObjectProps {
    list:Record<'type'|'path',string>[],
    onFindIndex(type:string):number
    onFindPath(type:string):string,
    onCreatePathParams(type:string,paramsList:{
        field:string,
        param:string
    }[]):string
}

const path:PathObjectProps = {

    list: [
        {
            type:"home_page",
            path:"/"
        },
        {
            type:"book_page",
            path:"/book/:id"
        },
        {
            type:"search_page",
            path:"/search/:value/:filter"
        },
        {
            type:"online_reserve",
            path:"/book/online_reserve/:id"
        },
        {
            type:"online_reserve_conclusion",
            path:"/book/online_reserve/conclusion"
        },
        {
            type:"support_page",
            path:"/support"
        },
        {
            type:"support_conclusion_page",
            path:"/support/conclusion"
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
            type:"user_page",
            path:"/user/:type"
        },
        {
            type:"global_management",
            path:onCreateManagementPath("","global")
        },
        {
            type:"library_choice",
            path:onCreateManagementPath("/choice","library")
        },
        {
            type:"library_register",
            path:onCreateRegisterPath("/library")
        },
        {
            type:"library_management",
            path:onCreateManagementPath("","library")
        },
        {
            type:"library_about",
            path:onCreateManagementPath("/about","library")
        },
        {
            type:"library_list_data_management",
            path:onCreateManagementPath("/data/list/:type","library")
        },
        {
            type:"library_create_data_management",
            path:onCreateManagementPath("/data/create/:type","library")
        },
        {
            type:"library_update_data_management",
            path:onCreateManagementPath("/data/update/:type/:id","library")
        },
         {
            type:"global_list_data_management",
            path:onCreateManagementPath("/data/list/:type","global")
        },
        {
            type:"global_create_data_management",
            path:onCreateManagementPath("/data/create/:type","global")
        },
        {
            type:"global_update_data_management",
            path:onCreateManagementPath("/data/update/:type/:id","global")
        }
        
        ], 
         onFindIndex(type){
            return this.list.findIndex((item)=>item.type === type);
        },      
         onFindPath(type:string){
            return this.list[this.onFindIndex(type)].path
        },
        onCreatePathParams(type:string,paramsList){
            let current_path = this.onFindPath(type);
            paramsList.forEach((item)=>{
                current_path = current_path.replace(":"+item.field,item.param)
            })
            return current_path          
        }

}


export {
    path
} 