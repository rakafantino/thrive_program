export const userIdGetter = async (req) => {
  const jwt = await req.headers["authorization"];
  const decode = await JSON.parse(atob(jwt.split(".")[1]));
  const { id } = decode;

  return id;
};
