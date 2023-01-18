import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Communities = newSeq.define(
  "communities",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    paranoid: true, //soft-delete
  }
);

newSeq
  .sync()
  .then(() => {
    console.log("Communities table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export const getAllCommunities = async () => {
  const communities = await Communities.findAll();

  return communities;
};

export const createCommunity = async (title, description, logo) => {
  const community = await Communities.create({ title, description, logo });

  return community;
};
