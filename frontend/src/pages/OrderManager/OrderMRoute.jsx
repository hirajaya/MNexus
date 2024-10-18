import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";


const OrderMRoute = () => {
    const {userInfo} = useSelector(state=>state.auth)

  return userInfo && userInfo.isOrderM ?(
    <Outlet/>
  ) : (
    <Navigate to ="/login" replace />
  )
}

export default OrderMRoute
