import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  const token = req?.cookies?.access_token;
  console.log(1111, token);
  // return;
  next();
};

export default jwtMiddleware;
