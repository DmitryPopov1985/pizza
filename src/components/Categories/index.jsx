import React from "react"

function Categories() {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const [activeIndex, setActiveIndex] = React.useState(0)
    const choosingACategory = (i) => {
        setActiveIndex(i)
    }
    return (
    <div className="categories">
                <ul>
                  {
                    categories.map((value, i) => <li onClick={() => choosingACategory(i)} key={value} className= { activeIndex === i ? 'active' : ''  } >{value}</li> )
                  }
                </ul>
              </div>
    )
  }

  export default Categories