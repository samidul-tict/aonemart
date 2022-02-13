
import { Product } from "../model/product";
import { Discount } from "../model/discount";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export interface IProduct {
    price: number,
    discountFlag: number,
    discountedPrice: number,
    discount: number,
    _id: string,
}

const addDiscount = async (req: any, res: any, next: any) => {
    const prIds = req.body.products;
    let discounts = await Discount.find({ softDelete: 0, categoryId: req.body.categoryId });
    prIds.map((el: any) => {
        el = new ObjectId(el);
        return el
    })    
    const discountObj = {
        discountPercentage: req.body.percentage,
        categoryId: new ObjectId(req.body.categoryId),
        products: prIds,
    }
    if (discounts.length > 0) {
        res.status(400).json({status: 400, message: 'Discount already applied to this category. Please select another category' })
        return;
    }
    try {
        const discount = new Discount(discountObj);
        await discount.save();
        for (let id of discountObj.products) {
            let product: IProduct = await Product.findById(id)
            let newPrice = product.price - (product.price * (discountObj.discountPercentage) / 100);
            let obj = {
                discount: discountObj.discountPercentage,
                discountFlag: 1,
                discountedPrice: newPrice.toFixed(2)
            };
            await Product.findByIdAndUpdate(id, obj)
        }
        res.status(200).json({status: 200, message: 'Discount Added Successfully'})
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getAllDiscountList = async (req: any, res: any, next: any) => {
    try {
        let discounts = await Discount.aggregate([
            { $match: { softDelete: 0 } },
            { 
                $lookup: {
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'proucts'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' }
        ])
        res.status(200).json({ status: 200, data: discounts })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getDiscountById = async (req: any, res: any, next: any) => {
    let { id } = req.params;
    try {
        let discount = await Discount.findById(id).populate('products');
        res.status(200).json({ status: 200, data: discount })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const editDiscount = async (req: any, res: any, next: any) => {
    const prIds = req.body.products;
    let { id } = req.params;
    prIds.map((el: any) => {
        el = new ObjectId(el);
        return el
    })    
    const discountObj = {
        discountPercentage: req.body.percentage,
        categoryId: new ObjectId(req.body.categoryId),
        products: prIds,
    }
    try {
        await Discount.findByIdAndUpdate(id, discountObj)
        for (let id of discountObj.products) {
            let product: IProduct = await Product.findById(id)
            let newPrice = product.price - (product.price * (discountObj.discountPercentage) / 100);
            let obj = {
                discount: discountObj.discountPercentage,
                discountFlag: 1,
                discountedPrice: newPrice.toFixed(2)
            };
            await Product.findByIdAndUpdate(id, obj)
        }
        res.status(200).json({status: 200, message: 'Discount Updated Successfully'})
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const deleteDiscount = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const prIds = req.body.products;
    prIds.map((el: any) => {
        el = new ObjectId(el);
        return el
    }) 
    const discountObj = {
        discountPercentage: req.body.percentage,
        categoryId: new ObjectId(req.body.categoryId),
        products: prIds,
    }
    try {
        await Discount.findByIdAndUpdate(id, { softDelete: 1 })
        for (let id of discountObj.products) {
            let product: IProduct = await Product.findById(id)
            let newPrice = product.price
            let obj = {
                discount: 0,
                discountFlag: 0,
                discountedPrice: newPrice
            };
            await Product.findByIdAndUpdate(id, obj)
        }
        res.status(200).json({ status: 200, message: 'Discount deleted successfully' })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}




export { addDiscount, getAllDiscountList, getDiscountById, editDiscount, deleteDiscount }