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
  }

  const { username, password } = req.body;

  const user = UserSchema({
    username,
  });

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

  res.json(user.serialize());
};
export const check = async (ctx) => {};
export const logout = async (ctx) => {};
