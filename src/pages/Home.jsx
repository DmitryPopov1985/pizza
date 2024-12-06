import React, { useRef } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaLoader from '../components/PizzaBlock/PizzaLoader'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch =  useRef(false)
  const isMounted = useRef(false)

  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  // const [categoryId, setCategoryId] = React.useState(0)
  // const [sortType, setSortType] = React.useState({name: 'популярности',sortProperty: 'rating' })
  // const [currentPage, setCurrentPage] = React.useState(1)
  const {categoryId, sort, currentPage } = useSelector((state) => state.filter )
  
  const fetchPizzas = () => {
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
  }

  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  },[categoryId, sort.sortProperty, currentPage, ])
  
  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
        ...params,
        sort,
      })
    )
      isSearch.current = true
      console.log(params)
    }
    
  }, [])

  React.useEffect(() => {
    if(!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
  
  

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
      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  )
}

export default Home