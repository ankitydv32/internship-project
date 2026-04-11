import { useEffect, useState } from "react";
import API from "../api/authApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Processing"
          ? "Shipped"
          : currentStatus === "Shipped"
          ? "Delivered"
          : "Delivered";

      await API.put(`/admin/orders/${id}`, {
        status: newStatus
      });

      fetchOrders();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>

      <h3>Total Paid: ₹{totalPaid}</h3>

      <input
        placeholder="Search by email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Artworks</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.name}</td>
              <td>{o.email}</td>

                <td>
                 {o.items && o.items.length > 0
                 ? o.items.map((i) => i.title).join(", ")
                 : "N/A"}
                </td>

              <td>₹{o.total}</td>
              <td>{o.paymentStatus}</td>
              <td>{o.deliveryStatus}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>

              <td>
                <button
                  disabled={o.deliveryStatus === "Delivered"}
                  onClick={() =>
                    updateStatus(o._id, o.deliveryStatus)
                  }
                >
                  {o.deliveryStatus === "Processing"
                    ? "Mark Shipped"
                    : o.deliveryStatus === "Shipped"
                    ? "Mark Delivered"
                    : "Delivered"}
                </button>

                <button
                  onClick={() => {
                    alert(
                      `Name: ${o.name}
Email: ${o.email}
Total: ₹${o.total}
Status: ${o.deliveryStatus}

Artworks:
${o.items?.map(i => i.artworkId?.title).join(", ")}`
                    );
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;