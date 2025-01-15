import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
      imageUrl: string
      name: string
      price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()
    React.useEffect(() => {
        async function fetchPizza() {
            try {
              const {data} = await axios.get(`https://66b451169f9169621ea27051.mockapi.io/items:${id}`)
              setPizza(data)
            } catch (error) {
                alert('Не найдена!')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])
    if (!pizza) {
        return 'Загрузка...'
    }
  return (
    <div className='container'>
        <img src={pizza.imageUrl} alt="pizza" />
        <h2>{pizza.name}</h2>
        <h4>{pizza.price} P</h4>
    </div>
  )
}

export default FullPizza