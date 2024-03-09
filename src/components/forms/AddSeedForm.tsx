import axios from "axios";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import "./AddSeedForm.css";
import { useNavigate } from "react-router-dom";

const AddSeedForm = () => {
  const [formData, setFormData] = useState({
    common_name: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const userData = sessionStorage.getItem("user");

    const successMessageModal = (navigate: any, message: string) => {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        color: "#cd5c5c",
        confirmButtonColor: "#cd5c5c",
        confirmButtonText: "Add More",
        showCancelButton: true,
        cancelButtonText: "Display Collection",
        cancelButtonColor: "#d07878",
        background: " url(src/images/leaves2.jpg)",
      }).then((result) => {
        if (!result.isConfirmed) {
          navigate("/display");
        }
      });
    };

    const errorMessageModal = (message: string) => {
      Swal.fire({
        title: "Error",
        text: "Your seeds have been stored",
        icon: "success",
        color: "#cd5c5c",
        confirmButtonColor: "#cd5c5c",
        confirmButtonText: "OK",
        background: " url(src/images/leaves2.jpg)",
      });
    };

    axios({
      method: "POST",
      url: "http://localhost:3000/api/seeds/add",
      data: {
        formData,
        userData,
      },
    })
      .then((res) => {
        successMessageModal(navigate, res.data.message.success);
        setFormData({
          common_name: "",
          quantity: "",
        });
      })
      .catch((err) => {
        errorMessageModal(err);
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
    <form onSubmit={handleSubmit} className="" action="">
      <div className="mb-4 space-y-4">
        <div>
          <label className="block text-gray-700 text-md font-bold ">Name</label>
          <input
            name="common_name"
            className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="The common name of the parent plant"
            value={formData.common_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-md font-bold ">
            Quantity
          </label>
          <input
            name="quantity"
            className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="number"
            placeholder="How many seeds do you have?"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-flora-red hover:bg-flora-red-light text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddSeedForm;
