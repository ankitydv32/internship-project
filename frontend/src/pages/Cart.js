import { useEffect, useState } from "react";
import API from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setItems(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = items.reduce((sum, item) => {
    return sum + (item.artworkId?.price || 0);
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>

      <h3>Total: ₹{total}</h3>

      <button onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>

      <button
        onClick={async () => {
          await API.delete("/cart/clear");
          fetchCart();
        }}
        style={{ marginLeft: "10px" }}
      >
        Clear Cart
      </button>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map((item) => (
        <div key={item._id} style={{ marginTop: "20px" }}>
          <h3>{item.artworkId?.title}</h3>

          <img
            src={item.artworkId?.image || "https://via.placeholder.com/200"}
            width="200"
            alt=""
          />

          <p>₹{item.artworkId?.price}</p>

          <button
            onClick={async () => {
              await API.delete(`/cart/${item._id}`);
              fetchCart();
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;