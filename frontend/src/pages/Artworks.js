import { useEffect, useState } from "react";
import API from "../api/authApi";

function Artworks() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    price: ""
  });

  // FETCH
  const fetchData = async () => {
    const res = await API.get("/artworks");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/artworks/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/artworks", form);
    }

    setForm({ title: "", artist: "", price: "" });
    fetchData();
  };

  // DELETE
  const deleteItem = async (id) => {
    await API.delete(`/artworks/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Artworks</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="artist"
          placeholder="Artist"
          value={form.artist}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Artwork" : "Add Artwork"}
        </button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              style={{ opacity: item.isHidden ? 0.3 : 1 }}
            >
              <td>{item.title}</td>
              <td>{item.artist}</td>
              <td>{item.price}</td>
              <td>{item.isSold ? "Sold" : "Available"}</td>

              <td>
                <button onClick={() => deleteItem(item._id)}>
                  Delete
                </button>

                <button
                  onClick={() => {
                    setForm({
                      title: item.title,
                      artist: item.artist,
                      price: item.price
                    });
                    setEditId(item._id);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    await API.patch(`/artworks/${item._id}/sold`);
                    fetchData();
                  }}
                >
                  {item.isSold ? "Unmark Sold" : "Mark Sold"}
                </button>

                <button
                  onClick={async () => {
                    await API.patch(`/artworks/${item._id}/hide`);
                    fetchData();
                  }}
                >
                  {item.isHidden ? "Show" : "Hide"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Artworks;