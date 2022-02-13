import {Payment} from '../model/payment';

const addPaymentController = async (req : any, res : any, next : any) => {
    const misc = new Payment(req.body)
    console.log('a',misc);
    try {
        await misc.save();
        return res.status(200).json({
            message: 'Payment Mode Added Successfully',
          miscId: misc._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });

    }
}
const getPaymentController = async (req : any, res : any, next : any) => {
    try {
     
       let paymentModeList = await Payment.find({softDelete:0})   
       res.status(200).json(paymentModeList)
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}
const updatePaymentControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "paymentMode": req.body.paymentMode,
            "paymentModeName":req.body.paymentModeName
        }
   await Payment.findByIdAndUpdate(req.body._id,updateData,{new: true});
        res.send({ status:200,message: "Payment Mode Updated Successfully"});
    } catch (error) {
        res.send({ error });
          res.send({ error });

    }




}


const deletePaymentControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "softDelete": req.body.softDelete,
        }
  await Payment.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Payment Mode Deleted Successfully"});
    } catch (error) {
        res.send({ error });
    }

}
export {addPaymentController , getPaymentController,updatePaymentControllerById,deletePaymentControllerById}  ; 
