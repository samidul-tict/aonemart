import {Cart} from '../model/cart';

const addCartController = async (req : any, res : any, next : any) => {
  //  const cart = new Cart(req.body);
    try {
        const cart = new Cart(req.body)
        await cart.save();
        return res.status(200).json({
            message: 'Product Added to Cart',
            cartId: cart._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });
    }
}

const getCartControllerById = async (req : any, res : any, next : any) => {
    try {
       let cartList = await Cart.find({_id : req.params.id}).populate({path :'productId'});  
            res.status(200).json(cartList)
            

    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}
const getCartController = async (req : any, res : any, next : any) => {
    try {
       let cartList = await Cart.find().populate({path :'productId'});  
            res.status(200).json(cartList)
            

    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}
const removeCartController = async (req : any, res : any, next : any) => {
    try {
       await Cart.findByIdAndDelete(req.params.id);  
       return  res.send({ status:200,message: "Removed from Cart"});  
    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}

const cartQuantityAddRemoveControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "quantity": req.body.quantity,
        }
     let updateCart =  await Cart.findByIdAndUpdate(req.body._id,updateData,{new: true});
       res.send({ status:200,message: "Quantity Updated Successfully",cartList : updateCart});
    } catch (error) {
        res.send({ error });
          res.send({ error });

    }

}

const updateCartByCartId = async (req: any, res: any, next: any) => {
    const { cartId, cartlist }  = req.body;
    try {
        await Cart.findByIdAndUpdate(cartId, { products: cartlist })
        res.status(200).json({ status: 200, message: 'Cart Updated Successfully' })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

export {addCartController , getCartController,removeCartController,cartQuantityAddRemoveControllerById,getCartControllerById, updateCartByCartId}  ; 