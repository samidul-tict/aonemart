import express from 'express';
import {addCartController,getCartController,removeCartController,cartQuantityAddRemoveControllerById,getCartControllerById, updateCartByCartId} from '../controller/cart.controller';
const router = express.Router();
//add category route
router.route("/cart/add-cart").post(addCartController)
router.route("/cart/get-cart-list/:id").get(getCartControllerById)
router.route("/cart/get-cart-list").get(getCartController)

router.route("/cart/remove-cart/:id").delete(removeCartController)
router.route("/cart/quantity-cart").post(cartQuantityAddRemoveControllerById)

router.route("/cart/update-cart").put(updateCartByCartId)

export default router;