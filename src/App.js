import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'

function App() {
  //states
  const[loading,setLoading] = useState(true) 
  const[tabs, setTabs] = useState([])
  const[value,setValue] = useState(0)

  //fetch function
  const fetchTabs = async() => {
    setLoading(true)
    setValue(value)
    try{
      const response = await fetch(url)
      const newTabs = await response.json() 
      console.log(newTabs)
      setTabs(newTabs)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  //useEffect FUNCTION since we use fetch for API and we have more than one state
  useEffect(()=>{  
    fetchTabs();
  },[])  //repeat just one time

  //we have to write the below line otherwise tabs is going to be empty
    if (loading) {
      return (
        <section className="section loading">
          <h1>Loading...</h1>
        </section>
      )
    }
    //we should destructure array of objects and send it to tabs state
    const {title,dates,duties,company} = tabs[value]
    console.log(tabs[value])  //show one of the three ones when we click on each of them
  
  return(
    <section className='section'>
      <div className='title'>
        <h2>experience</h2>
        <div className='underline'></div>
      </div>
      <div className='job-center'>
        <div className="btn-container">
          {tabs.map((tab,i)=>{
            return(
              <button key={i} className='job-btn {isActive ? "active-btn": ""}' onClick={() => {setValue(i)}}>{tab.company}</button>
            )
          })}
        </div>
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((item,i)=>{
            return(
              <div key={i} className='job-desc'><FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight><p>{item}</p></div>
            )
          })}
        </article>
      </div>
      <button className='btn'>more info</button>
    </section> 
  )
}

export default App
