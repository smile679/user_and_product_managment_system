import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/auth";


const LoginUser = () => {
   const navigate = useNavigate();
   const { data , setData } = useState({
    email: "",
    password: "",
   })
   const { isLoading, setIsLoading } = useState(false);
   const { error, setError } = useState('')
   const { message , setMessage } = useState('');

  const handleLogin = async (data) => {
    try {
    setIsLoading(true)
    const response = await loginUser(data)
      if(response.data.success){
        setMessage(response.data.message)
      } else {
        setError(response.data.message);
      }
    setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>You don't have an account</CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e)=>setData({...data,email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required onChange={(e)=>setData({...data,password: e.target.value })} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full"
          onClick={()=> handleLogin(data)}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginUser;
