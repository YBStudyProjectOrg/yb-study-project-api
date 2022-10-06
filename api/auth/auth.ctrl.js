// https://expressjs.com/en/api.html#res

import Joi from "joi";
import UserSchema from "@SCHEMA/UserSchema";

const _status = {
  401: { status: "Unauthorized" },
};

export const register = async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json(result).end();
    return;
  }

  const { username, password } = req.body;

  const user = UserSchema({
    username,
  });

  const userExist = await UserSchema.findByUsername(username);
  if (userExist) {
    res.status(400).json({}).end();
    return;
  }

  await user.setPassword(password);
  await user.save();

  const data = user.toJSON();

  res.json(data);
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json(_status[401]).end();
    return;
  }

  const user = await UserSchema.findByUsername(username);

  if (!user) {
    res.status(401).json(_status[401]).end();
    return;
  }

  const valid = await user.checkPassword(password);

  if (!valid) {
    res.status(401).json(_status[401]).end();
    return;
  }

  const token = user.generateToken();
  //res.coo;

  res
    .status(200)
    .cookie("access_token", `Bearer ${token}`, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    })
    .json(user.serialize())
    .end();
};
export const check = async (ctx) => {};
export const logout = async (ctx) => {};
