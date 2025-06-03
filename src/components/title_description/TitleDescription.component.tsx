
export interface TitleDescriptionProps {
    className?:string
    title:string,
    description:React.ReactNode
  }

const TitleDescription = ({className,title,description}:TitleDescriptionProps)=>{

    return (
      <div className={className}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
  
  }

export default TitleDescription
