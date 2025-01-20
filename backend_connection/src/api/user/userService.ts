import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "./userRepository";
import { User } from "./userModel";

const secretKey = "yourSecretKey";

export const signUp = async (user: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  return userRepository.createUser(newUser);
};

export const login = async ({
  emailOrUsername,
  password,
}: {
  emailOrUsername: string;
  password: string;
}): Promise<string> => {
  const user = await userRepository.getUserByEmailOrUsername(emailOrUsername);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
};

export default { signUp, login };
