import { useEffect, useState } from "react"
import "./Slider.component.css"

const Slider = () => {
  const [sliderList,setSliderList] = useState<string[]>([]);
  const [currentSliderIndex,setCurrentSliderIndex] = useState(0);
  const [sliderClass,setSliderClass] = useState<string>("emergeSlide");

  useEffect(()=>{

    setSliderList([
      "https://absolutaformaturas.com.br/wp-content/uploads/2015/04/MKA_6419-1530x430.jpg",
      "https://absolutaformaturas.com.br/wp-content/uploads/2015/01/graduation-1530x430.jpg",
    ])
  },[])

    useEffect(()=>{

        setSliderClass("emergeSlide")

    },[currentSliderIndex])

      

    useEffect(()=>{

      const intervalId = setInterval(() => {
      setSliderClass("fadeSlide")

      setTimeout(()=>{
        setCurrentSliderIndex((prev) =>
        prev === sliderList.length-1? 0 : prev + 1
      );
      },200)

    }, 5000);

    return () => clearInterval(intervalId);


    },[sliderList])

  return (
    <div 
    className="sliderContentContainer"
    >
       <div 
       className="sliderContainer"
       >
        
          {
            !!sliderList.length
            &&
            <>
            
              <div 
              className="changeCurrentSliderContainer"
              id="setPreviousSliderContainer"
              >
                <button
                onClick={()=>{
                  currentSliderIndex > 0
                  &&
                  (()=>{
                    
                  setSliderClass("fadeSlide")
                    setTimeout(()=>{
                    setCurrentSliderIndex((prev)=>prev-=1)
                    },200)
                  })()
                }}>
                    previous
                </button>
              </div>  

              <img 
              className={sliderClass}
              src={sliderList[currentSliderIndex]} 
              alt="image_slider" 
              />  

              <div 
              className="changeCurrentSliderContainer"
              id="setNextSliderContainer"
              >
                <button
                onClick={()=>{
                  currentSliderIndex < sliderList.length-1
                  &&
                  (()=>{
                  setSliderClass("fadeSlide")
                    setTimeout(()=>{
                    setCurrentSliderIndex((prev)=>prev+=1)
                    },200)
                  })()
                  
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
