import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Query
export const allUsers = async (parent, args, { User }) => {
  return await User.find();
};

export const createUser = async (parent, args, { User }) => {
  try {
    const existingUser = await User.findOne({ dni: args.userInput.dni });
    if (existingUser) {
      throw new Error("User exists already.");
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

    const user = new User({
      dni: args.userInput.dni,
      email: args.userInput.email,
      password: hashedPassword,
    });

    const result = await user.save();

    // return { ...result._doc, password: null, _id: result._id };
    return {
      dni: result.dni,
      email: result.email,
      password: null,
      _id: result._id,
    };
  } catch (err) {
    throw err;
  }
};

export const login = async (parent, { dni, password }, { User }) => {
  const user = await User.findOne({ dni: dni });
  if (!user) {
    throw new Error("User does not exist!");
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error("Password is incorrect!");
  }
  const token = jwt.sign({ userId: user.id, dni: user.dni }, "tremendosecreto");
  return { userId: user.id, token: token };
};

export const editUser = async (_, args, ctx) => {
  return await ctx.User.findByIdAndUpdate(
    args._id,
    { $push: args.input },
    { new: true }
  );
};

export const deleteUser = async (_, args, ctx) => {
  return await ctx.User.findByIdAndDelete(args._id);
};
