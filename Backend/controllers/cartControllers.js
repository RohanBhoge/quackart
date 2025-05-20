import userModel from "../models/useModel.js";

// Add products to user Cart.
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    if (!userId || !itemId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    // Update quantity for the given itemId
    if (cartData[itemId]) {
      cartData[itemId].quantity = quantity;
    } else {
      cartData[itemId] = { quantity };
    }

    // Save updated cartData
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add products to user Cart.
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    if (!userId || !itemId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Find the user's cart data
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (!cartData) {
      cartData = {};
    }

    if (quantity === 0) {
      // Remove the item if quantity is 0
      delete cartData[itemId];
    } else {
      // Otherwise, update the quantity
      cartData[itemId] = { quantity };
    }

    // Save the updated cart data to the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data.
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
     
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userData = await userModel.findById(userId);

    const cartData = await userData.cartData;
    
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };
