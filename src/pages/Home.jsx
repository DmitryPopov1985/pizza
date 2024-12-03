import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaLoader from '../components/PizzaBlock/PizzaLoader'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'


const Home = () => {
  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({name: 'популярности',sortProperty: 'rating' })
  const [currentPage, setCurrentPage] = React.useState(1)



  React.useEffect(() => {
    setIsLoading(true)
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ?  `&search=${searchValue} ` : ''

    fetch(`https://66b451169f9169621ea27051.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((response) => {
        return response.json()
      }).then(arr => {
        setItems(arr) 
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items
  // .filter((obj) => {
  //   if(obj.name.toLowerCase().includes(searchValue.toLowerCase() )) {
  //     return true
  //   }
  //   return false
  // })
  .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, i) => <PizzaLoader key={i} />): pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home