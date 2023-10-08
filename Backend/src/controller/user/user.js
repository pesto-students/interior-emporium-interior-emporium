import User from "../../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptr from "cryptr";
const cryptrKey = new cryptr("myTotalySecretKey");

export const registerUser = async (req, res) => {
  try {
    let isUserExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (isUserExist) {
      return res.status(404).json({ error: "User already register" });
    }

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      //   roleId,
    });
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokenTemp = jwt.sign({ _id: user._id }, "thisisme", {
      expiresIn: "120m",
    });
    const token = cryptrKey.encrypt(tokenTemp);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
