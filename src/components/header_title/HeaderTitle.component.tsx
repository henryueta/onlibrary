

interface HeaderTitleProps {
  title:string,
  hasHrLine?:boolean
}

const HeaderTitle = ({title,hasHrLine}:HeaderTitleProps) => {
  return (
    <>
        <div className="headerContainer">
             <div className="titleContainer">
                <h1>
                    {title}
                </h1>
             </div>    
        </div>
       {
        !!hasHrLine
        &&
         <hr/>
       }
    </>
  )
}

export default HeaderTitle
