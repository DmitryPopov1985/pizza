import React from "react"

type CategoriesProps = {
  value: number
  onChangeCategory: (i: number) => void
}
const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

const Categories: React.FC<CategoriesProps> =({value, onChangeCategory}) => {
  
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