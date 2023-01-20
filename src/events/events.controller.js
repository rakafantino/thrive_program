import { getUserRole } from "../join_community/join_community.model.js";
import { userIdGetter } from "../utils/userIdGetter.js";
import { createEvent } from "./events.model.js";

export const createAnEvent = async (req, res) => {
  const user_id = await userIdGetter(req);
  const community_id = req.params.id;

  const isAdmin = await getUserRole(user_id, community_id);

  if (isAdmin === "admin") {
    const event = await createEvent(req.body, community_id);

    return res.status(200).json({
      meta: {
        status: "success",
        message: "successfully create an event",
      },
      data: {
        event,
      },
    });
  }

  return res.status(400).json({
    meta: {
      status: "bad request",
      message: "Only admin can create an event",
    },
  });
};
