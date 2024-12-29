import { CircleUserRound, HousePlug, LogOut, Menu, ShoppingCart } from "lucide-react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/Config/Config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar } from "../ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { logoutUser } from "@/store/authSlice/authSlice"
import { useEffect, useState } from "react"
import UserCartWrapper from "./CartWrapper"
import { fetchCartItems } from "@/store/shop/cartSlice"
import { Label } from "../ui/label"

function MenuItems({setOpen}) {

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams,setSearchparams] = useSearchParams()
  function handlenavigate(getCartMenu) {
    sessionStorage.removeItem('filters')
    const currentFilter = (getCartMenu.id !== 'home' && getCartMenu.id !== 'products' && getCartMenu.id !== 'search') 
  ? { 'category': [getCartMenu.id] } 
  : null
    sessionStorage.setItem('filters',(JSON.stringify(currentFilter)))
    if (location.pathname.includes('listing') && currentFilter !== null) {
      setSearchparams( new URLSearchParams(`?category=${getCartMenu?.id}`))
    } else {
      navigate(getCartMenu.path)
    }
  }

  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map(item => 
      <Label onClick={()=>{
        handlenavigate(item)
        setOpen(false)
      }} key={item.id} className="text-sm font-medium">
        {item.label}
      </Label>
    )}
  </nav>
}

function HeaderRightContent({setOpen}) {
  const {user} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.shopCart)

  const [openCartSheet, setOpenCartSheet] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logoutUser())
  }
  useEffect(()=>{
    dispatch(fetchCartItems(user.id))
  },[dispatch])

  return <div className="flex justify-between mb-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-slate-700'>
          <AvatarFallback className="bg-slate-700 text-white font-extrabold text-center">
            {user?.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56'>
        <DropdownMenuLabel>Logged In as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>{
          navigate('/shop/account');
          setOpen(false)}
          }>
            <CircleUserRound className="mr-2 h-5 w-5" />
            Account
            <DropdownMenuSeparator/>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
    <Button onClick={()=>{
      setOpenCartSheet(true);
      }} variant='outline' size='icon' className='mr-4 border-indigo-50 relative'>
    <ShoppingCart className="h-8 w-8"/>
    <span className="absolute top-[-8px] right-[-4px] font-bold text-lg">{cartItems?.items?.length}</span>
    <span className="sr-only">user cart</span>
    </Button>
    <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems}/>
    </Sheet>
  </div>
}

const ShoppingHeader = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={'/shop/home'} className="flex items-center gap-2">
        <HousePlug className="h-6 w-6"/>
        <span className="font-bold">
          Gangnam
        </span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='border-indigo-50 lg:hidden'>
            <Menu className="h-6 w-6"/>
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs'>
          <span className="sr-only">Header menu</span>
          <HeaderRightContent setOpen={setOpen}/>
          <MenuItems setOpen={setOpen}/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems setOpen={setOpen}/>
        </div>
            <div className="hidden lg:block">
              <HeaderRightContent setOpen={setOpen}/>
            </div>
      </div>
    </header>
  )
}
export default ShoppingHeader