import { userIdGetter } from "../utils/userIdGetter.js";
import { createUser, editUserProfile, getUserbyId } from "./users.model.js";
import * as Cloudinary from "../utils/cloudinary.js";

//Create a new user / register user
export const userCreateRest = async (req, res) => {
  const { name, username, gender, email, password } = req.body;

  if (!(name && username && gender && email && password)) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const respModel = await createUser(name, username, gender, email, password);
  if (respModel !== "email must be unique" && respModel !== "username must be unique") {
    return res.status(200).json({
      meta: {
        code: 200,
        message: "Success add user",
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

//Getting user by id
export const userGetByIDRest = async (req, res) => {
  const id = await userIdGetter(req);

  if (!id) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "user id is not found or undefined",
      },
      data: {},
    });
  }

  const respModel = await getUserbyId(id);

  if (respModel === "user not found") {
    return res.status(404).json({
      meta: {
        code: 404,
        message: respModel,
      },
    });
  }

  return res.status(200).json({
    meta: {
      code: 200,
      message: `Success get user ${respModel.name}.`,
    },
    data: {
      user: respModel,
    },
  });
};

export const editUser = async (req, res) => {
  const id = await userIdGetter(req);

  const { name, username, email, password } = req.body;
  const uploadImage = await Cloudinary.default.uploader.upload(req.file.path);
  const photo = uploadImage.url;
  const respModel = await editUserProfile(id, { name, username, email, password, photo });

  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success edit user profile",
    },
    data: respModel,
  });
};

//Delete User

export const deleteUser = async (req, res) => {
  const id = await userIdGetter(req);
  const respModel = await deleteUser(id);

  return res.status(200).json(`Success delete user ${respModel}`);
};
