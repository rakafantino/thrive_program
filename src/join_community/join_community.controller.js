import { createCommunity } from "../community/community.model.js";
import { userIdGetter } from "../utils/userIdGetter.js";
import { joinCommunity } from "./join_community.model.js";
import * as Cloudinary from "../utils/cloudinary.js";

export const joinACommunity = async (req, res) => {
  const id = await userIdGetter(req);

  const community_id = parseInt(req.params.community_id);

  const respModel = await joinCommunity(id, community_id);

  if (respModel !== "user_id must be unique" && respModel !== "community_id must be unique") {
    return res.status(200).json({
      meta: {
        code: 200,
        message: "Success join community",
      },
      data: {
        id: respModel,
      },
    });
  }

  return res.status(400).json({
    meta: {
      code: 400,
      message: respModel,
    },
  });
};

export const createACommunity = async (req, res) => {
  const user_id = await userIdGetter(req);
  const { title, description } = req.body;

  const uploadImage = await Cloudinary.default.uploader.upload(req.file.path);
  const logo = uploadImage.url;

  if (!title && !description) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const community_id = await createCommunity(title, description, logo);
  const isAdmin = "admin";

  await joinCommunity(user_id, community_id.id, isAdmin);

  return res.status(200).json({
    meta: {
      code: 200,
      message: `Success create community with title ${community_id.title}`,
    },
  });
};
