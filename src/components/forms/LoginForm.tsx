import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: "http://localhost:3000/api/users/login",
      data: {
        formData,
      },
    })
      .then(async (res) => {
        if (res.data.token) {
          //store user data locally
          sessionStorage.setItem("user", JSON.stringify(res.data));
          // redirect to homepage
          navigate("/home");
        } else {
          // set the errors
          setFormData((prevFormData) => ({
            ...prevFormData,
            errors: res.data.errors,
          }));
        }
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 space-y-4">
        <div>
          <label className="block text-gray-700 text-md font-bold ">
            Email
          </label>
          <input
            name="email"
            className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="e.g. JohnSmith@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formData.errors.email != "" && (
            <p className="text-rose-400 mt-2">{formData.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-md font-bold ">
            Password
          </label>
          <input
            name="password"
            className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            minLength={8}
            required
          />
          {formData.errors.password != "" && (
            <p className="text-rose-400 mt-2">{formData.errors.password}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-flora-red hover:bg-flora-red-light text-white font-bold py-2 px-4 rounded mt-4"
          >
            Login
          </button>
          <Link to={"/register"}>
            <button
              type="button"
              className=" bg-none hover:text-flora-red-light text-flora-red font-bold py-2 px-4 rounded mt-4"
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
