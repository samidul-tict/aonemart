import { Customer } from '../model/customer';
import * as  _ from 'lodash';
import jwt from 'jsonwebtoken';
import { Favorite } from '../model/fav';
import { Cart } from '../model/cart';
import mongoose from 'mongoose'
import { Location } from '../model/location';

let ObjectId = mongoose.Types.ObjectId

const addCustomerController = async (req: any, res: any, next: any) => {

    try {
        let uniqueid = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        console.log(uniqueid);

        let customerData = await Customer.find({ customerPhone: req.body.customerPhone });
        console.log('s', customerData);

        if (customerData.length == 0) {
            let customerDatas = {
                "customerPhone": req.body.customerPhone,
                "customerOTP": uniqueid
            }
            const customer = new Customer(customerDatas);
            await customer.save();
            return res.send({ status: 200, message: "OTP Sent to " + req.body.customerPhone, OTP: uniqueid, customerDetails: customer });
        }
        else {

            let customerDatas = {
                "customerOTP": uniqueid
            }
            let cust = await Customer.findByIdAndUpdate(customerData[0]._id, customerDatas, { new: true });
            console.log('a', cust);
            return res.send({ status: 200, message: "OTP Sent to " + req.body.customerPhone, OTP: cust.customerOTP, customerDetails: cust });
        }

    } catch (error) {
        console.log(error)
        res.send({ error });
    }
}
const verifyOTPControllerById = async (req: any, res: any, next: any) => {
    const { cartlist, wishlist, customerId } = req.body //destructure the data from the body
    //create the query object for the cart  
    const cartObj = {
        products: cartlist,
        customerId: customerId
    }
    //create the query obj for the wishlist
    const wishObj = {
        products: wishlist,
        customerId: customerId
    }
    let cartId = null;
    let wishId = null;
    let cartValue: any = []; //final cartlist that will be stored in db
    let wishValue: any = []; //final wishlist that will be stored in db
    try {
        let customerCart = await Cart.find({ customerId: new ObjectId(customerId) }); //look for the cart with the customer id
        let customerWish = await Favorite.find({ customerId: new ObjectId(customerId) }); // look for the wishlist with the curtomer id
        let verifyResult = await Customer.findOne({ customerPhone: req.body.customerPhone, customerOTP: req.body.customerOTP });
        if (verifyResult == null) {
            res.send({ status: 404, message: "Wrong OTP!!" });
        }
        else {
            //   var privateKey = fs.readFileSync('/private.key')
            let token = await jwt.sign({ verifyResult }, "privateKey", { expiresIn: '1h' })

            //if customerId is new or no document is found with that curtomerId
            if (customerCart.length === 0) {
                // save that customer cartdata
                let cart = new Cart(cartObj)
                await cart.save()
                cartValue = cart
            } else {
                // customer already exists then just update the cart document
                cartId = customerCart[0]._id
                let cartProducts = customerCart[0].products;
                // if previously products were already added in cartlist then concat the new prodcts db will automatically filter the duplicate objectIds
                let arr = cartObj.products.concat(cartProducts) 
                cartObj.products = arr;
                cartValue = await Cart.findByIdAndUpdate(cartId, cartObj)
            }

            //same procedure for wishlist as cartlist 
            if (customerWish.length === 0) {
                let wish = new Favorite(wishObj)
                await wish.save()
                wishValue = wish;
            } else {
                wishId = customerWish[0]._id;
                let wishProducts = customerWish[0].products;
                let arr = wishObj.products.concat(wishProducts)
                wishObj.products = arr;
                wishValue = await Favorite.findByIdAndUpdate(wishId, wishObj)
            }
            res.send({ status: 200, 
                message: "Welcome " + req.body.customerPhone, 
                token: token,
                 _id: req.body._id, 
                 cart: cartValue, 
                 wishlist: wishValue });
        }
    } catch (error) {
        console.log(error)
        res.send({ error });

    }

}

const getAllCustomersForAdmin = async (req: any, res: any, next: any) => {
    try {
        let customerlist = await Customer.aggregate([
            { $match: { softDelete: 0 } },
            {
                $lookup: {
                    from: 'locations',
                    localField: '_id',
                    foreignField: 'customerId',
                    as: 'customerAddress'
                }
            }
        ])
        res.status(200).json(customerlist)
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const customerEditForAdmin = async (req: any, res: any, next: any) => {
    const { addressId } = req.body
    const { id } = req.params
    const updateCustomer = {
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail
    }

    const updateAddress = {
        addressName: req.body.addressName,
        addressType: req.body.addressType,
        city: req.body.city,
        customerPhone: '',
        district: '',
        houseNo: req.body.houseNo,
        pincode: req.body.pincode,
        state: '',
        street: req.body.street,
    }

    try {
        let address;
        let customer;
        if (addressId === '') {
            customer = await Customer.findByIdAndUpdate( new ObjectId(id) , updateCustomer, { new: true });
        } else {
             address = await Location.findByIdAndUpdate( new ObjectId(addressId) , updateAddress, { new: true });
             customer = await Customer.findByIdAndUpdate( new ObjectId(id) , updateCustomer, { new: true });
        }        

        res.status(200).json({ status: 200, address: address, customer: customer, message: 'Customer Updated Successfully' })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getCustomerById = async (req: any, res: any, next: any) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(new ObjectId(id));
        res.status(200).json({ status: 200, data: customer })

    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getAddressByCustomerId = async (req: any, res: any, next: any) => {
    const { id } = req.params;

    try {
        const address = await Location.find({ softDelete: 0, customerId: id });
        res.status(200).json({ status: 200, data: address })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}




export { addCustomerController, verifyOTPControllerById, getAllCustomersForAdmin, customerEditForAdmin, getCustomerById, getAddressByCustomerId };


