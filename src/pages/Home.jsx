import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaLoader from '../components/PizzaBlock/PizzaLoader'
import PizzaBlock from '../components/PizzaBlock'

const Home = () => {
    const [items, setItems] = React.useState([])
const [isLoading, setIsLoading] = React.useState(true)
React.useEffect(() => {
  fetch('https://66b451169f9169621ea27051.mockapi.io/items')
  .then((response) => {
    return response.json()
  }).then(arr => {
    setItems(arr)
    setIsLoading(false)
})
}, [])
  return (
    <>
     <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            
             {
                isLoading
                ? [...new Array(6)].map((obj) => <PizzaLoader  />)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />  )
             } 
          </div>
    </>
  )
}

export default Home