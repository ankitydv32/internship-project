import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset/${token}`,
        { password }
      );

      alert(res.data.message);
alert(res.data.link);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;