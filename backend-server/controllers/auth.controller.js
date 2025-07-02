import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../utils/fileHelpers.js";
import dotenv from "dotenv";

const USERS_FILE = "./models/users.json";

dotenv.config();

export const register = async (req, res) => {
  const { email, password } = req.body;

  //input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const users = await readData(USERS_FILE);

  // Check if user already exists

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user object
  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  await writeData(USERS_FILE, users);

  return res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const users = await readData(USERS_FILE);

    const existinguser = await users.find((user) => user.email == email);

    if (!existinguser)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existinguser.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: existinguser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,

      user: {
        id: existinguser.id,
        email: existinguser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err);
  }
};
