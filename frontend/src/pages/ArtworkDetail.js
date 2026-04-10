import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/authApi";

function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    try {
      const res = await API.get(`/artworks/${id}`);
      setItem(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Artwork not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/home")}>
        Back
      </button>

      <h2>{item.title}</h2>

      <p><b>Artist:</b> {item.artist}</p>
      <p><b>Category:</b> {item.category}</p>

      <img src={item.image} alt="" width="200" />

      <p><b>Description:</b> {item.description}</p>

      <p><b>Price:</b> ₹{item.price}</p>
      <p><b>Status:</b> {item.isSold ? "Sold" : "Available"}</p>
    </div>
  );
}

export default ArtworkDetail;