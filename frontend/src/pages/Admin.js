import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access denied");
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Panel</h1>

        <p>👥 Manage Users</p>
        <p>🛍️ Manage Products</p>
        <p>💰 Manage Sales</p>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Admin;