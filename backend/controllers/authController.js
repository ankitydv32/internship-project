const crypto = require("crypto");
const User = require("../models/user");
const EmailToken = require("../models/emailToken");
const PasswordToken = require("../models/passwordToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

 const user = new User({
  name,
  email,
  password: hashedPassword,
  role: "user" // default
});

  await user.save();

  const token = crypto.randomBytes(32).toString("hex");

  await new EmailToken({
    userId: user._id,
    token
  }).save();

  res.json({
    message: "Registered. Verify your email",
    link: `http://localhost:5000/api/auth/verify/${token}`
  });
};

// VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  try {
    const tokenData = await EmailToken.findOne({ token: req.params.token });

    if (!tokenData) {
      return res.send("<h2>Invalid Token</h2>");
    }

    const user = await User.findById(tokenData.userId);

    user.isEmailVerified = true;
    await user.save();

    await EmailToken.deleteOne({ _id: tokenData._id });

    // DIRECT REDIRECT
    res.redirect("http://localhost:3000");

  } catch (err) {
    res.send("<h2>Error verifying email</h2>");
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  if (!user.isEmailVerified) {
    return res.json({ message: "Please verify your email first" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message: "Wrong password" }); 
  }

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({
    message: "Login success",
    token,
    role: user.role
  });
};

// PROFILE
exports.profile = (req, res) => {
  res.json({ message: "This is protected profile", user: req.user });
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");

  await new PasswordToken({
    userId: user._id,
    token
  }).save();

  res.json({
    message: "Reset link generated",
    link: `http://localhost:3000/reset/${token}` 
  });
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const tokenData = await PasswordToken.findOne({ token: req.params.token });

  if (!tokenData) return res.json({ message: "Invalid token" });

  const user = await User.findById(tokenData.userId);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = hashedPassword;
  await user.save();

  await PasswordToken.deleteOne({ _id: tokenData._id });

  res.json({ message: "Password reset successful" });
};