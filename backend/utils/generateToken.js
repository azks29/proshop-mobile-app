import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  const decode = jwt.decode(token);
  const exp = decode.exp;
  const tokenexp = {
    token,
    exp,
  };
  return tokenexp;
};

export default generateToken;
