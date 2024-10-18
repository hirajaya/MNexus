import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";


const SalesMRoute = () => {
    const {userInfo} = useSelector(state=>state.auth)

  return userInfo && userInfo.isSalesM ?(
    <Outlet/>
  ) : (
    <Navigate to ="/login" replace />
  )
}

export default SalesMRoute
