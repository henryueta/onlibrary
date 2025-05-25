
type GroupProps<T extends object> = Record<'list',T[]>;

const Group = <T extends object>({list}:GroupProps<T[]>) => {
  return (
    <section className="groupSection">
        {

            // list.map((item,index)=>{
            //     return <div></div>
            // })
        }
    </section>
  )
}

export default Group
