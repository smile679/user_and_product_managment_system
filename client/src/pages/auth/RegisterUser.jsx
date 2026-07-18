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
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useState } from "react";

const RegisterUser = () => {
const navigate = useNavigate();
const [ formData, setFormData ] = useState({ fullName : "", email: "", password: ""})
const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(formData) => {
    // console.log(formData);
     try {
        setLoading(true);
      const response = await registerUser(formData);
       console.log(response);
       if(response.data.success){
        // alert(response.data.message);
        return navigate("/login")
       }
     } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      console.log(error);
     } finally {
      setLoading(false);
     }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>create your account</CardTitle>
        <CardDescription>Already created account?</CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/login")}>
            login
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="your fullName"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
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
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 cursor-pointer"
              >
                {loading ? "Signing up..." : "Sign -Up"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterUser;
