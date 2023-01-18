import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Users = newSeq.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    paranoid: true, //soft-delete
  }
);

newSeq
  .sync()
  .then(() => {
    console.log("Users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export const createUser = async (name, username, gender, email, password, status) => {
  try {
    const create = await Users.create({
      name,
      username,
      gender,
      email,
      password,
      status,
    });

    return `Successfully created user with username: ${create.username}`;
  } catch (error) {
    const errorMessage = error.errors[0].message;
    return errorMessage;
  }
};

export const getUserbyId = async (id) => {
  const user = await Users.findByPk(id);
  if (user === null) {
    return "user not found";
  }
  return user.name;
};

export const getUserbyUsername = async (username) => {
  const allUser = await Users.findOne({
    where: {
      username,
    },
  });
  return allUser;
};

export const editUserProfile = async (id, req) => {
  const editedUser = await Users.update(req, { where: { id } });
  return editedUser;
};

export const deleteUser = (id) => {
  Users.destroy({
    where: {
      id,
    },
  });

  return Users.username;
};

export default Users;
