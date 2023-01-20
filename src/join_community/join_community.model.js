import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const JoinCommunity = newSeq.define(
  "join_community",
  {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Member",
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

export const joinCommunity = async (user_id, community_id, role) => {
  try {
    const communities = await JoinCommunity.create({ user_id, community_id, role });
    return communities;
  } catch (error) {
    const errorMessage = error.errors[0].message;
    return errorMessage;
  }
};

export const getUserRole = async (user_id, community_id) => {
  const getRole = await JoinCommunity.findOne({ where: { user_id, community_id, role: "admin" } });

  return getRole.role;
};
