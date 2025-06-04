
type HeaderTitleProps = Record<'title',string>

const HeaderTitle = ({title}:HeaderTitleProps) => {
  return (
    <>
        <div className="headerContainer">
             <div className="titleContainer">
                <h1>
                    {title}
                </h1>
             </div>    
        </div>
        <hr />
    </>
  )
}

export default HeaderTitle
