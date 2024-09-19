import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { logout } from "../../features/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  })
  return <Navigate to='log-in' />
}

export default Logout
