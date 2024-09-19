import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./component/navbar/Navbar"
import Employee from "./component/employee/Employee"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./component/auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store/Store";
import Logout from "./component/auth/Logout";
function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.authslice)
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          {!isAuthenticated ? (<>
            <Route path='log-in' element={<Login />} />
            <Route path="*" element={<Navigate to="/log-in" />} />
          </>)
            : (<>
              <Route path='employee' element={<Employee />} />
              <Route path="log-out" element={<Logout />} />
            </>)
          }

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
