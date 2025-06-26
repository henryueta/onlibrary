import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useHandleLibrary from "./useHandleLibrary";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";
import { ManagementType } from "../routes/management/Management.route";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
      // você pode adicionar outras propriedades se precisar
    };
  }
}

interface LibraryData {
  [key: string]: Record<string, any>[]; 
}

const useHandlePdf = (management:ManagementType)=>{

    const [librarySummary,setLibrarySummary] = useState<any | null>(null);
    const {onAxiosQuery} = useAxios();
    const {currentLibraryContext} = useHandleLibrary();


    useEffect(()=>{

        !!librarySummary
        &&
        (()=>{
            onCreateLibrarySummary()
        })()

    },[librarySummary])

  const onQueryLibraryData = ()=>{

    !!currentLibraryContext.libraryId
        &&
        onAxiosQuery("get",{
        url:"https://onlibrary-api.onrender.com/api/data/resumo",
        type:{
            get:{
            params:{
                type:
                management === 'library'
                ? "biblioteca"
                : "admin",
                id_biblioteca:currentLibraryContext.libraryId
            }
            }
        },
        onResolver:{
            then(result) {
                setLibrarySummary(result.data.data)
            },
            catch(error){
            console.log(error)
            }
        }
        })

  }
  


  const onCreateLibrarySummary = ()=>{
  const doc = new jsPDF();

  const fieldsToIgnore = ['id', 'fkIdBiblioteca', 'fkIdUsuario'];

  for (const key in librarySummary) {
    if (Object.prototype.hasOwnProperty.call(librarySummary, key)) {
      const tableData = librarySummary[key];

      const columns = tableData.length > 0
        ? Object.keys(tableData[0])
            .filter(col => !fieldsToIgnore.includes(col)) 
            .map(col => ({ header: col.replace(/_/g, ' ').toUpperCase(), dataKey: col }))
        : [];

      const body = tableData.map(obj =>
        columns.map(col => obj[col.dataKey]) 
      );

      autoTable(doc,{
        head: [columns.map(col => col.header)],
        body: body,
        startY: !!((doc as any).lastAutoTable) ? (doc as any).lastAutoTable.finalY + 15 : 15,
        tableWidth:'auto',
        styles:{
            fontSize:7
        }
      });
    }
  }

  const doc_title = 'relatório_'+(
    !!(management === 'library')
    ? 'biblioteca'
    : 'geral')
    +'.pdf';

  doc.save(doc_title);
};
  return {
    onQueryLibraryData
  }

}

export default useHandlePdf;