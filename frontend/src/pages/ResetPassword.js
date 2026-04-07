import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset/${token}`,
        { password }
      );

      alert(res.data?.message || "Success");
      navigate("/");

    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
  <div className="container">
    <div className="card">
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>

      <p><a href="/">Login</a></p>
    </div>
  </div>
);
}

export default ResetPassword;