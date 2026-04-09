import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access denied");
      navigate("/dashboard");
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");

      console.log(res.data);

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const changeRole = async (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    await API.put(`/auth/users/${id}`, { role: newRole });
    fetchUsers();
  };

  const toggleActive = async (id, currentStatus) => {
    await API.put(`/auth/users/${id}`, { isActive: !currentStatus });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/auth/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Panel</h1>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

        <div style={{ overflowX: "auto", width: "100%", marginTop: "20px" }}>
          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center"
            }}
          >
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(users) &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isActive ? "Active" : "Inactive"}</td>

                    <td>
                      <button onClick={() => changeRole(user._id, user.role)}>
                        Change Role
                      </button>

                      <button
                        onClick={() =>
                          toggleActive(user._id, user.isActive)
                        }
                      >
                        Toggle Status
                      </button>

                      <button onClick={() => deleteUser(user._id)}>
                        Delete
                      </button>

                      <button onClick={() => navigate("/artworks")}>
                        Manage Artworks
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;