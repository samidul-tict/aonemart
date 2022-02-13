import { Tax } from "../model/tax";

const addTax = async (req: any, res: any, next: any) => {
    try {
        const tax = new Tax(req.body)
        await tax.save()
        res.status(200).json({
            status: 200,
            message: 'Tax Saved Successfully',
            taxDetails: tax
        })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getAllTaxPercentage = async (req: any, res: any, next: any) => {
    try {
        const taxes = await Tax.find({ softDelete: 0 })
        res.status(200).json({ status: 200, data: taxes })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getSingleTaxPercentageById = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    try {
        const tax = await Tax.findById(id);
        res.status(200).send({ status: 200, data: tax })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const editTax = async (req: any, res: any, next: any) => {
    try {
        const editedTax = await Tax.findByIdAndUpdate(req.params.id, { 
            taxPercentage: req.body.tax, 
            appliedOn: req.body.appliedOn, 
            minOrderValue: req.body.minOrderValue,  
            shippingAppliedOn: req.body.shippingAppliedOn,
            shippingCharge: req.body.shippingCharge
        }, { new: true })
        res.status(200).json({ status: 200, message: 'Tax Updated Successfully', data: editedTax })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

const getTaxForWeb = async (req: any, res: any, next: any) => {
    try {
        const taxes = await Tax.find({ softDelete: 0 })
        if (taxes.length === 0) {
            res.status(200).json({status: 200, data: { taxPercentage: 10, appliedOn: 0 }})
            return;
        }
        res.status(200).json({ status: 200, data: taxes })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

export { addTax, getAllTaxPercentage, getSingleTaxPercentageById, editTax, getTaxForWeb }