import CommonForm from "@/components/Common/Form"
import { loginFormControl } from "@/Config/Config"
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/store/authSlice/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const {toast} = useToast()
  const initialState = {
    email:'',
    password:''
  }
  const [formData,setFormData] = useState(initialState)

  async function onFormSubmit(e) {
    e.preventDefault()
    const res = await dispatch(loginUser(formData))
    if (res?.payload?.success) {
      toast({
        title : res.payload.message
      })
    } else {
      toast({
        title : res.payload.message,
        variant: 'destructive'
      })
    }
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <Link to={'/auth/register'} className="font-medium ml-2 text-primary hover:underline">
        <p>Don't have an account</p>
        </Link>
      </div>
      <CommonForm formControls={loginFormControl}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onFormSubmit}/>
    </div>
  )
}
export default Login