import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("token");

    //  Token check (protected route)
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    //  Optional: verify token with backend
    axios.get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: token
      }
    })
    .catch(() => {
      alert("Unauthorized");
      navigate("/");
    });

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>

        <p>Welcome </p>
        <p>{email}</p>
        <p>Role: {role}</p>

        {/* Admin Access */}
        {role === "admin" && (
          <>
            <p style={{ color: "red" }}>Admin Panel Access</p>

            <button onClick={() => navigate("/admin")}>
              Go to Admin Panel
            </button>
          </>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;