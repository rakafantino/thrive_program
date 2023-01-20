import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Events = newSeq.define(
  "events",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
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

export const createEvent = async (req, community_id) => {
  const { title, description, price, date, location } = req;
  const event = await Events.create({ title, description, price, date, location, community_id });

  return event;
};
