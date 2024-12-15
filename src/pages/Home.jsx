import React, { useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaLoader from '../components/PizzaBlock/PizzaLoader'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas} from '../redux/slices/pizzasSlice'
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock'


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {items, status }= useSelector((state) => state.pizzas)
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { searchValue } = React.useContext(SearchContext)
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue} ` : ''

    dispatch(fetchPizzas({ category, sortBy, order, search, currentPage}))
   
    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage, navigate])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      getPizzas()
      isSearch.current = true
    }

  }, [dispatch])

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     getPizzas()
  //   }

  // }, [categoryId, sort.sortProperty, searchValue, currentPage])

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          status ===  'error' ? <NotFoundBlock/> : status === 'loading' ? [...new Array(6)].map((_, i) => <PizzaLoader key={i} />) : pizzas
        }
       
      </div>
      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  )
}

export default Home