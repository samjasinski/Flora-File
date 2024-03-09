import axios from "axios";
import DisplayList from "../components/display/DisplayList";
import { useEffect, useState } from "react";

const Display = () => {
  const [seedData, setSeedData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const uid = JSON.parse(userData).user._id;

      axios
        .get(`http://localhost:3000/api/seeds/display/${uid}`)
        .then((res) => {
          setSeedData(res.data);
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    } else {
      console.log(
        "ERROR: No user is logged in as there is no user data in local storage"
      );
    }
  }, []);

  return <div>{seedData && <DisplayList userSeedData={seedData} />}</div>;
};

export default Display;
