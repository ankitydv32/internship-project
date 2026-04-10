import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handlePayment = async () => {
    alert("Payment Successful (Demo)");

    try {
      await API.post("/order", { name, email, address });
      navigate("/success");
    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />
      <button onClick={handlePayment}>
        Pay & Place Order
      </button>
    </div>
  );
}

export default Checkout;