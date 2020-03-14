import { useState } from 'react'

export const useField = (type) => {  
    
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const onChangeC = (event) => {
    setContent(event.target.value)
  }

  const onChangeA = (event) => {
    setAuthor(event.target.value)
  
  }

  const onChangeI = (event) => {
    setInfo(event.target.value)
  }

  const reset = () => {
      setContent('')
      setAuthor('')
      setInfo('')
  }


  return {
    type,
    content, 
    author,
    info,
    setInfo,
    onChangeC,
    onChangeA,
    onChangeI,
    reset
  }
}
