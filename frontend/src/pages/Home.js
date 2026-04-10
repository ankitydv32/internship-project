import { useEffect, useState } from "react";
import API from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.get("/artworks/public");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.artist?.toLowerCase().includes(search.toLowerCase())) &&
      (category === "" || item.category === category) &&
      (price === "" ||
        (price === "low" && item.price < 1000) ||
        (price === "high" && item.price >= 1000))
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Artworks</h2>

      {/* Search */}
      <input
        placeholder="Search by title or artist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Painting">Painting</option>
        <option value="Music">Music</option>
        <option value="Sketch">Sketch</option>
        <option value="Modern">Modern</option>
      </select>

      {/* Price Filter */}
      <select onChange={(e) => setPrice(e.target.value)}>
        <option value="">All Prices</option>
        <option value="low">Below 1000</option>
        <option value="high">Above 1000</option>
      </select>

      {/* Empty State */}
      {filteredData.length === 0 && <p>No artworks found</p>}

      {/* List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredData.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/artwork/${item._id}`)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              cursor: "pointer",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "0.3s"
            }}
          >
            <h4>{item.title}</h4>
            <p>{item.artist}</p>

            <p>
              {item.description
                ? item.description.slice(0, 50) + "..."
                : "No description"}
            </p>

            <img
              src={item.image || "https://via.placeholder.com/200"}
              alt="art"
              width="100%"
            />

            <p>{item.category || "N/A"}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;