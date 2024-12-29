import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/Auth/Layout"
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"
import AdminLayout from "./components/Admin/Layout"
import AdminDashboard from "./Pages/Admin/Dashboard"
import AdminOrders from "./Pages/Admin/Orders"
import AdminProducts from "./Pages/Admin/Products"
import ShoppingLayout from "./components/Shopping/Layout"
import NotFound from "./components/NotFound.jsx/NotFound"
import ShoppingHome from "./Pages/Shopping/Home"
import ShoppingListing from "./Pages/Shopping/Listing"
import ShoppingCheckout from "./Pages/Shopping/Checkout"
import ShoppingAccount from "./Pages/Shopping/Account"
import Auth_Check from "./components/Common/Auth_Check"
import UnauthPage from "./Pages/Unauth_Page/Unauth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/authSlice/authSlice"
import { Skeleton } from "./components/ui/skeleton"
import PaypalReturn from "./Pages/Shopping/PaypalReturn"
import PaymentSuccess from "./Pages/Shopping/PaymentSuccess"
import Search from "./Pages/Shopping/Search"

function App() {
  const {isAuthenticated,user,isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if (isLoading) {
    return <Skeleton className='w-[600px] h-[600px] rounded-full'/>
  }

  return (
    <div className="flex w-full h-auto flex-col bg-white">
      <Routes>
      <Route path="/" element={
        <Auth_Check isAuthenticated={isAuthenticated} user={user}>
      </Auth_Check>
      }>

      </Route>
        <Route path="/auth" element={
          <Auth_Check isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </Auth_Check>}>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        </Route>

        <Route path="/admin" element={
          <Auth_Check isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </Auth_Check>}>
        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="orders" element={<AdminOrders/>}/>
        <Route path="products" element={<AdminProducts/>}/>
        </Route>
        
        <Route path="/shop" element={
          <Auth_Check isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </Auth_Check>}>
        <Route path="home" element={<ShoppingHome/>}/>
        <Route path="listing" element={<ShoppingListing/>}/>
        <Route path="checkout" element={<ShoppingCheckout/>}/>
        <Route path="account" element={<ShoppingAccount/>}/>
        <Route path="paypal-return" element={<PaypalReturn/>}/>
        <Route path="paypal-success" element={<PaymentSuccess/>}/>
        <Route path="search" element={<Search/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
        <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
