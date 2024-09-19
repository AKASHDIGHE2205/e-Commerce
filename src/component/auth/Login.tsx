import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeData } from "../../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChnage = (e: any) => {
    const { name, value }: any = e.target;
    setInputs((prev: any) => ({
      ...prev,
      [name]: value
    }
    ))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      email: inputs.email,
      password: inputs.password
    }
    console.log(body);

    try {
      const response = await axios.post('http://192.168.179.23:3001/log-in', body);
      console.log(response.data);

      if (response.status === 200) {
        navigate('/');
        dispatch(storeData({ data: response.data }))
        setInputs({
          email: "",
          password: ""
        })
      } else if (response.status === 404) {
        toast.error(response.data.message)
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
    }

  }

  return (

    <div className="flex justify-center items-center h-96">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <form onSubmit={handleLogin}>
          <div className="flex justify-center text-2xl font-serif mb-6">
            <h1>Log-in Form</h1>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              onChange={handleChnage}
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              onChange={handleChnage}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-9 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="mb-4">
            <span>
              Don't have an account?
              <button type="button" className="btn btn-link">Create account</button>
            </span>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn btn-outline btn-success w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
