
type WordFormatType = "cpf" | "name" | "isbn" | "cep" | "telephone";

class Word {
    word:string | null = null

    constructor(word:string,format:WordFormatType){
        const formatList = {
            telephone:()=>{
                this.word = word.replace(/\D/g,"")
            },
            cep:()=>{
                this.word = word.replace("-","")
            },
            isbn:()=>{
              this.word = word.replace(/-/g,"")
            },
            cpf:()=>{
                this.word = word.replace(".","").replace(".","").replace("-","")
            },
            name:()=>{

                for(const [index,item] of Object.entries(word)){
                    let letter = "";
                    let current_letter = "";

                    item === word[0] ?(
                       (()=>{
                        letter = word[0]
                        current_letter = letter.toUpperCase()
                       })()
                    )
                    :(
                        item.trim() == ""
                        ? (()=>{
                           letter =  word[Number.parseInt(index)+1];
                           current_letter = letter.toUpperCase()
                        })()
                        :
                        word[Number.parseInt(index)-1].trim() != ""
                         &&
                        (()=>{
                            letter = item
                            current_letter = item.toLowerCase()

                        })()
                    )
                    word = word.replace(letter,current_letter)

                }
                this.word = word


            }

        }
        formatList[format]()

    }


}

export default Word
