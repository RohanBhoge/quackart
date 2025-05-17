  import jwt from "jsonwebtoken";
  const adminAuth = async (req, res, next) => {
    try {
      //   getting token from header
      const { token } = req.headers;

      // if not authorized person then generate false responce
      if (!token) {
        return res.json({
          success: false,
          message: "Not Authorized Login Again.",
        });
      }

      // check is athurized email or not.
      const token_decode = jwt.verify(token, process.env.JWT_SECRETE);
      if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({
          success: false,
          message: "Not Authorized Login Again.",
        });
      }
      
      next();
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: message.error,
      });
    }
  };

  export default adminAuth;
