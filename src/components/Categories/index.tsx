import React from "react"

type CategoriesProps = {
  value: number
  onChangeCategory: any
}
const Categories: React.FC<CategoriesProps> =({value, onChangeCategory}) => {
    const categories: string[] = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    // const [activeIndex, setActiveIndex] = React.useState(0)
    // const choosingACategory = (i) => {
    //     setActiveIndex(i)
    // }
    return (
    <div className="categories">
                <ul>
                  {
                    categories.map((categoryName, i) => <li onClick={() => onChangeCategory(i)} key={categoryName} className= { value === i ? 'active' : ''  } >{categoryName}</li> )
                  }
                </ul>
              </div>
    )
  }

  export default Categories