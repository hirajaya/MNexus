import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const InventoryRoute = () => {
    const {userInfo} = useSelector(state=>state.auth)

  return userInfo && userInfo.isInventoryM ?(
    <Outlet/>
  ) : (
    <Navigate to ="/login" replace />
  )
}

export default InventoryRoute
