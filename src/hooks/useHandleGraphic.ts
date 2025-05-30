import { useState } from "react"

type GraphicTableType = 'reserve' | 'loan' | 'amerce';

const useHandleGraphic = ()=>{

    const [graphicTable,setGraphicTable] = useState<GraphicTableType>('loan');

    

return {

}

}

export default useHandleGraphic