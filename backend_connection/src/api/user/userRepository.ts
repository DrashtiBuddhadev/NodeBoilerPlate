import { Pool } from "mysql2/promise";
import { User } from "./userModel";
import db from "../../config/index";

export const createUser = async (user: User): Promise<User> => {
  const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
  const [result] = await db.execute(query, [user.email, user.username, user.password]);
  return { id: (result as any).insertId, ...user };
};

export const getUserByEmailOrUsername = async (emailOrUsername: string): Promise<User | null> => {
  const query = `SELECT * FROM users WHERE email = ? OR username = ?`;
  const [rows] = await db.execute(query, [emailOrUsername, emailOrUsername]);
  return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
};

export default { createUser, getUserByEmailOrUsername };
