import CommonForm from "@/components/Common/Form"
import { registerFormControl } from "@/Config/Config"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/store/authSlice/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()
  const initialState = {
    userName : '',
    email:'',
    password:''
  }
  const [formData,setFormData] = useState(initialState)

  async function onFormSubmit(e) {
    e.preventDefault()
    const res = await dispatch(registerUser(formData))
    if (res?.payload?.success) {
      toast({
        title: res.payload.message
      })
      navigate('/auth/login')
    }else{
      toast({
        title : res?.payload?.message,
        variant: "destructive",
      })
    }
    }
  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create a new account</h1>
        <Link to={'/auth/login'} className="font-medium ml-2 text-primary hover:underline">
        <p>Already have an account</p>
        </Link>
      </div>
      <CommonForm formControls={registerFormControl}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onFormSubmit}/>
    </div>
  )
}
export default Register