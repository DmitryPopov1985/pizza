import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaLoader from '../components/PizzaBlock/PizzaLoader'
import PizzaBlock from '../components/PizzaBlock'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({name: 'популярности',sortProperty: 'rating' })

  
console.log(sortType)

  React.useEffect(() => {
    setIsLoading(true)
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    fetch(`https://66b451169f9169621ea27051.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((response) => {
        return response.json()
      }).then(arr => {
        setItems(arr) 
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {
          isLoading
            ? [...new Array(6)].map((_, i) => <PizzaLoader key={i} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        }
      </div>
    </div>
  )
}

export default Home