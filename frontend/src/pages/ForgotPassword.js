import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot", {
        email
      });

      alert(res.data?.message || "Success");
      window.open(res.data.link);

    } catch (err) {
      alert("Error sending reset link");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>

      <input
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSend}>Send Reset Link</button>
    </div>
  );
}

export default ForgotPassword;