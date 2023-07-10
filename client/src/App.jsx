import { useEffect, useState } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [FriendList, setFriendList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/read", {
      name: name,
      age: age
    })
      .then((res) => {
        setFriendList(res.data)
        // console.log(res?.data)
      })
      .catch((err) => console.log(err))

  }, [])

  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      name: name,
      age: age
    })
      .then((res) => setFriendList([...FriendList,
      { name: name, age: age, _id: res.data._id }]))
      .catch((err) => console.log(err))

    setName("")
    setAge(0)
  }

  const updateFriend = (id) => {
    const newAge = prompt('Enter your new age')

    Axios.put('http://localhost:3001/update', {
      newAge: newAge,
      id: id
    }).then(() => {
      setFriendList(FriendList.map((val) => {
        return val?._id == id ? { _id: id, name: val?.name, age: newAge } : val
      }))
    })
  }

  const deleteFriend = (id) => {
    const requested = confirm('Are you sure you want to delete')
    if (requested) {
      Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {

        setFriendList(FriendList.filter((val) => {
          return val._id != id;
        }))
      })
    }
  }

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" className="inputName" placeholder='Enter your Name....' value={name} onChange={(e) => setName(e?.target?.value)} />
        <input type="number" className="inputAge" placeholder='Enter your Age....' value={age} onChange={(e) => setAge(e?.target?.value)} />
        <button type="submit" className='inputSubmit' onClick={() => addFriend()}>Submit</button>
      </div>
      <div className="listOfFriends">
        {FriendList?.map((ele) => {
          return (
            <div className="friendContainer" key={ele?._id}>
              <div className="friend">
                <h3 className="name">
                  Name: {ele?.name}
                </h3>
                <h3 className="age">
                  Age: {ele?.age}
                </h3>
              </div>
              <button type="submit" onClick={() => (updateFriend(ele?._id))}>Update</button>
              <button type="submit" id='removeFriend' onClick={() => deleteFriend(ele?._id)} >Delete</button>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default App
