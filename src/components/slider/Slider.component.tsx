import { useEffect, useState } from "react"
import "./Slider.component.css"
import slide_1 from "../../assets/imgs/slide/slide_1.png"
import slide_2 from "../../assets/imgs/slide/slide_2.png"
import blackArrow_icon from "../../assets/imgs/icons/blackArrow_icon.png"


const Slider = () => {
  const [sliderList,setSliderList] = useState<string[]>([]);
  const [currentSliderIndex,setCurrentSliderIndex] = useState(0);
  const [sliderClass,setSliderClass] = useState<string>("emergeSlide");

  useEffect(()=>{

    setSliderList([
      slide_1,
      slide_2,
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

    }, 20000);

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

                  (()=>{
                    
                  setSliderClass("fadeSlide")
                    setTimeout(()=>{
                    setCurrentSliderIndex((prev)=>{
                      return currentSliderIndex === 0
                      ? (sliderList.length - 1)
                      : prev-=1
                    })
                    },200)
                  })()
                }}>
                    <img src={blackArrow_icon} alt="previous_arrow_icon" />
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
                  (()=>{
                  setSliderClass("fadeSlide")
                    setTimeout(()=>{
                    setCurrentSliderIndex((prev)=>{
                      return currentSliderIndex === (sliderList.length -1)
                      ? prev-=1
                      : prev+=1
                    })
                    },200)
                  })()
                  
                }}>
                    <img src={blackArrow_icon} alt="next_arrow_icon" />
                </button>
              </div>   
            </>
          }
          
      </div>
        
    </div>
  )
}

export default Slider
