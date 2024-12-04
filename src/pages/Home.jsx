import React from 'react'
import axios from 'axios'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaLoader from '../components/PizzaBlock/PizzaLoader'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'


const Home = () => {
  const dispatch = useDispatch()
  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  // const [categoryId, setCategoryId] = React.useState(0)
  // const [sortType, setSortType] = React.useState({name: 'популярности',sortProperty: 'rating' })
  const [currentPage, setCurrentPage] = React.useState(1)
  const {categoryId, sort} = useSelector((state) => state.filter )
  
  

  React.useEffect(() => {
    setIsLoading(true)
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ?  `&search=${searchValue} ` : ''

    axios.get(`https://66b451169f9169621ea27051.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((response) => {
        setItems(response.data) 
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sort, searchValue, currentPage])

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
        <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id)) } />
        <Sort  />
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