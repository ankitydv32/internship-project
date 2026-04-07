import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      alert("Registered successfully! Verify your email.");
      window.location.href = res.data.link || "/";

    } catch (err) {
      alert("Error in register");
    }
  };

 return (
  <div className="container">
    <div className="card">
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>

      <p><a href="/">Login</a></p>
    </div>
  </div>
);
}
export default Register;