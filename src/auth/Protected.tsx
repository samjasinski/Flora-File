import { Outlet, Navigate } from "react-router-dom";

const Protected = ({ children }: any) => {
  // Retrieve user data from localStorage
  const userData = sessionStorage.getItem("user");

  // Check if userData exists and is not null/undefined
  if (!userData) {
    console.log("No user data..");
    // If user data doesn't exist, redirect to login page
    return <Navigate to="/login" />;
  }

  try {
    // Parse user data from JSON format
    const userDataObject = JSON.parse(userData);

    // Check if token exists in user data
    const token = userDataObject.token;

    // Check if token exists and render children (protected routes)
    return token ? <Outlet /> : <Navigate to="/login" />;
  } catch (error) {
    // Handle parsing error
    console.error("Error parsing user data from localStorage:", error);
    // Redirect to login page or handle error as appropriate for your application
    return <Navigate to="/login" />;
  }
};

export default Protected;
