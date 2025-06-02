import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface GraphicProps {
    title:string,
    categories:string[],
    data:number[]
}

const Graphic = ({title,categories,data}:GraphicProps) => {

    const options:ApexOptions = {
        fill: {
            type: "gradient",
            gradient: {
            type:"vertical",
            shade:"light",
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.3,
            stops: [0,100, 100]
            }
        },
        stroke:{
            curve:"smooth"
        },
        chart:{
            id:"chart_line",
            toolbar:{show:false},
            type:"area",
        },
        xaxis:{
            categories:categories
        },
        yaxis:{
            tooltip:{
                enabled:false
            }
        },
        title:{
            text:title,
            align:"left",
            style:{
                fontWeight:"600"
            }
        }
    }

    const series = [
        {
            data:data
        }
    ]

    return (
        <div 
        className="graphicContainer"
        style={{
            position:"relative",
            zIndex:3,
            width:"100%",
            height:"500px",
            padding:"1rem",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Chart 
            height="100%"
            width="1100"
            type="area"
            series={series}
            options={options}
            />
        </div>
    )

}

export default Graphic
