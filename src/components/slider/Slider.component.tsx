import { useEffect, useState } from "react"
import "./Slider.component.css"

const Slider = () => {
  const [sliderList,setSliderList] = useState<string[]>([]);
  const [currentSliderIndex,setCurrentSliderIndex] = useState(0);

  useEffect(()=>{

    setSliderList([
      'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*lAoXzLYaHoONaw4yG91fqA.jpeg',
      'https://blog-leiturinha-novo.s3.amazonaws.com/production/uploads/2024/12/Livros-infantis-mais-amados-de-2024.jpg',
      'https://www.intersaberes.com/wp-content/uploads/2023/03/woman-reading-book-evening-home-close-up.jpg'
    ])
    
  },[])

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
