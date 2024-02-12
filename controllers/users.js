import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const salt = 10;

export const registerUser = (req, res) => {
  const q =
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json(err);
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      hash,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data);
    });
  });
};

export const loginUser = (req, res) => {
  const q = "SELECT * FROM users WHERE email=?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (error, response) => {
          if (error) return res.json({Error: "Password compare error"});
          if(response) {
            const name = data[0].name;
            const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d"});
            res.cookie('token', token);
            return res.status(200).json({Status: "Success"});
          } else {
            return res.status(200).json({Error: "Password not matched"});
          }
        }
      );
    } else {
      return res.json({ Status: "Email não encontrado" });
    }
  });
};
