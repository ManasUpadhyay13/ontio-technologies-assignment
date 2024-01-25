import './App.css'
import FormContainer from './components/formContainer'
import { Table } from './components/table'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <FormContainer />
  },
  {
    path: "/table",
    element: <Table />
  }
])

function App() {

  return (
    <>
      <h2
        style={{ textAlign: "center", marginBottom: "20px" }}
      >React Multi Step Form</h2>
      <div className='app'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
