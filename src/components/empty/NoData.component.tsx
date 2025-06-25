import "./NoData.component.css"
import noData_icon from "../../assets/imgs/icons/noData_icon.png"

interface NoDataProps {
    dataType:string
    gender:"M"|"F"
}

const NoData = ({dataType,gender}:NoDataProps) => {
  return (
    <div className="noDataContainer">
        <div className="iconContainer">
            <img src={noData_icon} alt="noData_icon" />
        </div>
        <p>
            {
                `Nenhum${
                    gender === 'F'
                    ? 'a'
                    : ''
                } ${dataType} encontrad${
                    gender === 'F'
                    ? 'a'
                    : 'o'
                }`
                
            }
        </p>
    </div>
  )
}

export default NoData
