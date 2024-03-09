import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    errors: {
      email: "",
    },
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3000/api/users/register",
      data: {
        formData,
      },
    })
      .then((res) => {
        console.log("error:", res.data.message.error);
        if (res.data.message.error) {
          console.log("there is an error:", res.data.message.error);
          setFormData((prevFormData) => ({
            ...prevFormData,
            errors: {
              email: res.data.message.error,
            },
          }));
        } else {
          console.log("there is NOT an error:", res.data.message.error);
          // should add a pop up saying user was created
          console.log("data: ", res.data);

          // saves user data to locally
          sessionStorage.setItem("user", JSON.stringify(res.data));

          console.log("session data: ", JSON.parse(sessionStorage["user"]));

          setFormData((prevFormData) => ({
            ...prevFormData,
            errors: {
              email: "",
            },
          }));
          // redirects to login page
          navigate("/login");
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
            //REMEMEBER name is important for React to track formdata with useState
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
            Username
          </label>
          <input
            name="username"
            className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="JSmith"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
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
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-flora-red hover:bg-flora-red-light text-white font-bold py-2 px-4 rounded mt-4"
          >
            Register
          </button>
          <Link to={"/login"}>
            <button
              type="button"
              className=" bg-none hover:text-flora-red-light text-flora-red font-bold py-2 px-4 rounded mt-4"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
