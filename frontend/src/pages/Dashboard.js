import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Dashboard() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    // token verify using API instance
    API.get("/profile")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data);
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

        <p>Welcome</p>
        <p>{email}</p>
        <p>Role: {role}</p>

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