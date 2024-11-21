import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import personService from './services/personService'
import Notification from './components/Notification'

const DisplayResults = ({list}) => { 
  return (
    <>
     {list.map(onePerson => 
        <p key={onePerson.id}>{onePerson.name} {onePerson.number}
       
        </p>
      )}
     </>
  )
}

const DisplayNumbers = ({name, number, onClickHandler}) => { 
  return (
    <>
        <p>{name} {number}
        <button onClick={onClickHandler}>Delete Me</button>
        </p>
     
     </>
  )
}

const Filter = ({onChange}) => {
  return(
    <div>
          <label>filter shown with</label> 
          <input onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({HandleNameChange, HandleNumberChange, FormSubmit}) => {
  return (
      <form>
        <div>
          name: <input onChange={HandleNameChange}/>
        </div>
        <div>number: <input onChange={HandleNumberChange} /></div>
        <div>
          <button type="submit" onClick={FormSubmit}>add</button>
        </div>
      </form>
  )
}

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [personSearchResults, setResults] = useState([])
  const [message, setMessage] = useState([])

  useEffect(() => {
    console.log('effect')
    personService.getAllPersons().then(personList => setPersons(personList))
  }, [])

  const HandleNameChange = (e) => {
      //console.log('new name handler ' + e.target.value);
      setNewName(e.target.value.trim())
  }
  const HandleNumberChange = (e) => {
    //console.log('new number handler ' + e.target.value);
    setNewNumber(e.target.value.trim())
 }
 const findNames = (e) => {
  const findString = e.target.value.trim().toLowerCase()
  const result = persons.filter((one) => one.name.trim().toLowerCase().includes(findString));
  console.log(result)
  setResults(result)
 } 

 const deleteEntry = (id, name) => {
  if (!window.confirm(`Delete ${name}?`)) return
  console.log('id to delete ' , id)
  console.log(persons.filter(onePerson => onePerson.id != id));
  
  const updatedPersonList = persons.filter(onePerson => onePerson.id != id)
  personService.deletePerson(id).then( (p) => {
    //persons.filter(onePerson => onePerson.id != id)
      console.log('this is p ', p)
      setPersons(updatedPersonList)
    }
  ).catch(e =>
  {
    console.log('errr', e)
    setMessage([`Information of ${name} has already been removed from server`, 'error'])
  })   
}

  const FormSubmit = (ev) => {
      ev.preventDefault()
      const found = persons.findIndex(e => e.name.trim().toLowerCase() === newName.toLowerCase())
      console.log(found)
      if (found === -1)
      {
        //const phoneBook = persons.concat({name: newName, number: newNumber, id: persons.length})
        
        const data = personService.addNewPerson({name: newName, number: newNumber}).then(
          adddedPerson => {
              const phoneBook = persons.concat(adddedPerson)
              setPersons(phoneBook)
              
              setMessage( [`Added ${newName}`,'success'])
            }
          ) 
      }
      else
      {
        if (window.confirm (`${newName} is already added ti phonebook, replace the old number with new one?`))
        {
          console.log('id is ' + persons[found].id)
          const data = personService.updatePerson(persons[found].id, {name: newName, number: newNumber}).then(
            updatedPerson => {
                const pb = persons.map((p) => {
                    console.log(`found ${found}`);
                    console.log('one obj ',  +p.id === found ? updatedPerson : p )
                    console.log( +p.id === found);
                    //+ in front of string converts to int
                    //this comparison was failing without conversion to int as the id property is string
                    //and was using === operator
                    return +p.id === found ? updatedPerson : p 
                  }
                )
                const newMessage = [`Updated ${newName}`, 'success']
                setMessage(newMessage)
                console.log('updated person update ', updatedPerson)
                console.log('phonebook update ', pb)
                setPersons(pb)
                
              }
              
            ) 
        }  
      //console.log(phoneBook)
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={findNames}></Filter>
      <PersonForm HandleNameChange={HandleNameChange} HandleNumberChange={HandleNumberChange} FormSubmit={FormSubmit}></PersonForm>
      <h2>Numbers</h2>
      {persons.map(onePerson =>            
        <DisplayNumbers onClickHandler={() => deleteEntry(onePerson.id, onePerson.name)} key={onePerson.id}  name={onePerson.name} number={onePerson.number}></DisplayNumbers>                
      )}
      
      <h2>Search Results</h2>
      <DisplayResults list={personSearchResults}></DisplayResults>
    </div>
  )
}

export default App
