import { useEffect, useState } from "react"

function App() {

  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch("http://13.209.114.196:8080/api/members")
      .then(res => res.json())
      .then(data => setMembers(data))
  }, [])

  return (
    <div>
      <h1>Member List</h1>

      {members.map((m:any) => (
        <div key={m.id}>
          {m.name}
        </div>
      ))}
    </div>
  )
}

export default App