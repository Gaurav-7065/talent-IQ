import { useState } from 'react'
import { SignInButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>welcome to the page</h1>
     <SignInButton/>
    </>
  )
}

export default App
