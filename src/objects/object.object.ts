const object = {
    getKeys(object:object){
        return Object.keys(object)
    },
    findItem(object:object,filter:{
        type:"value" | "index"
        value?:string,
        index?:number
    }){
        let keys = Object.keys(object);
        return keys.find((item,index)=>
        {
            console.log(item)
            return filter.type == "value"
            ?  item === filter.value
            :  index === filter.index
        }
        )
    }
}

export {
    object
}