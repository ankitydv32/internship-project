import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/verify/${token}`)
      .then(res => {
        alert(res.data?.message || "Success");
      })
      .catch(() => {
        alert("Verification failed");
      });
  }, [token]);

  return (
  <div className="container">
    <h2>Email Verified Successfully </h2>
    <p>You can now login</p>
  </div>
);
}

export default VerifyEmail;