import React from 'react'
import styles from './Search.module.css'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickClear = () => {
   dispatch(setSearchValue(''))
   setValue('')
   inputRef.current?.focus()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    },500),
    [],
  )

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
    updateSearchValue(evt.target.value)
  }
  return (
    <div className={styles.root}>
      <svg className={styles.icon} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_" />
      </svg>
      <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы...' />
      {value && 
      <svg onClick={() => {onClickClear()}} className={styles.iconClear} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
      </svg>}
    </div>
  )
}

export default Search