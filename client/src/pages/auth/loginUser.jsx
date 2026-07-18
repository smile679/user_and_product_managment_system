import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
   const [formData, setFormData] = useState({
    email: "",
    password: "",
   })
   const [ isLoading, setIsLoading ] = useState(false);
   const [ error, setError ] = useState('')

  const handleLogin = async (formData) => {
    try {
    setIsLoading(true)
    const response = await loginUser(formData)
    console.log(response.data.success);
    
      if(response.data.success){
        setError('')
        navigate("/dashboard");
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(formData);
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginUser;
