const Artwork = require("../models/artwork");

// GET ALL
exports.getArtworks = async (req, res) => {
  const data = await Artwork.find();
  res.json(data);
};

// ADD
exports.addArtwork = async (req, res) => {
  const { title, description, price, artist } = req.body;

  const artwork = new Artwork({
    title,
    description,
    price,
    artist
  });

  await artwork.save();
  res.json({ message: "Artwork added" });
};

// UPDATE
exports.updateArtwork = async (req, res) => {
  await Artwork.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Artwork updated" });
};

// DELETE
exports.deleteArtwork = async (req, res) => {
  await Artwork.findByIdAndDelete(req.params.id);
  res.json({ message: "Artwork deleted" });
};

// TOGGLE STATUS
exports.updateStatus = async (req, res) => {
  await Artwork.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Status updated" });
};
exports.updateArtwork = async (req, res) => {
  await Artwork.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Artwork updated" });
};
exports.toggleSold = async (req, res) => {
  const item = await Artwork.findById(req.params.id);

  item.isSold = !item.isSold;
  await item.save();

  res.json({ message: "Updated" });
};
exports.toggleHide = async (req, res) => {
  const item = await Artwork.findById(req.params.id);

  item.isHidden = !item.isHidden;
  await item.save();

  res.json({ message: "Updated" });
};