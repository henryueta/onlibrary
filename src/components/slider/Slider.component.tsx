import { useEffect, useState } from "react"
import "./Slider.component.css"

const Slider = () => {
  const [sliderList,setSliderList] = useState<string[]>([]);
  const [currentSliderIndex,setCurrentSliderIndex] = useState(0);

  useEffect(()=>{

    setSliderList([
      'https://absolutaformaturas.com.br/wp-content/uploads/2015/04/MKA_6419-1530x430.jpg',
      'https://absolutaformaturas.com.br/wp-content/uploads/2015/01/graduation-1530x430.jpg',
      'https://www.intersaberes.com/wp-content/uploads/2023/03/woman-reading-book-evening-home-close-up.jpg'
    ])
     // Limpa o intervalo no unmount
  },[])

    useEffect(()=>{

      const intervalId = setInterval(() => {
      setCurrentSliderIndex((prev) =>
        prev === sliderList.length-1? 0 : prev + 1
      );
    }, 20000);
    return () => clearInterval(intervalId);

    },[sliderList])

  return (
    <div 
    className="sliderContentContainer"
    >
       <div 
       className="sliderContainer"
       style={!!sliderList.length
        ? {
          background:"url("+sliderList[currentSliderIndex]+")"
        }
        : {}
       }
       >
          {
            !!sliderList.length
            &&
            <>
            
              <div className="changeCurrentSliderContainer">
                <button
                onClick={()=>{
                  currentSliderIndex > 0
                  &&
                  setCurrentSliderIndex((prev)=>prev-=1)
                }}>
                    previous
                </button>
              </div>  

              <div className="changeCurrentSliderContainer">
                <button
                onClick={()=>{
                  currentSliderIndex < sliderList.length-1
                  &&
                  setCurrentSliderIndex((prev)=>prev+=1)
                }}>
                    next
                </button>
              </div>   
            </>
          }
          
      </div>
        
    </div>
  )
}

export default Slider
