import { getAllCommunities } from "./community.model.js";

export const getAllCommunity = async (req, res) => {
  const allCommunities = await getAllCommunities();

  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success getting all community",
    },
    data: {
      id: allCommunities,
    },
  });
};

export const createACommunity = async (req, res) => {
  const { title, description, logo } = req.body;

  if (!title && !description) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  // const community = await createCommunity(title, description, logo);

  return res.status(200).json({
    meta: {
      code: 200,
      message: `Success create community with title ${community}`,
    },
  });
};
