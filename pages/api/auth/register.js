import checkAuth from "../../../src/middlewares/check-auth";
import RegisterUser from "../_services/RegisterUser";

const handler = async (req, res) => {
  console.log("gfdfdfdfdfgdgfdgdg")
  const registerUser = new RegisterUser(req.body, req.headers.authorization, res);
  await registerUser.init();
};

export default checkAuth(handler);
