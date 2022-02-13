import {Location} from '../model/location';

const addLocationController = async (req : any, res : any, next : any) => {
    const location = new Location(req.body)
    console.log(location);
    try {
        await location.save();
        return res.status(200).json({
            message: 'Address Added Successfully',
          locationId: location._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });

    }
}
const getLocationController = async (req : any, res : any, next : any) => {
    try {
     
       let locationList = await Location.find({softDelete:0,customerId : req.params.id})   
       res.status(200).json(locationList)
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}
const updateLocationControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "customerId": req.body.customerId,
            "addressName": req.body.addressName,
            "state": req.body.state,
            "district": req.body.district,
            "city": req.body.city,
            "pincode": req.body.pincode,
            "addressType": req.body.addressType,
            "houseNo": req.body.houseNo,
            "street": req.body.street,
            "customerEmail": req.body.customerEmail,
            "customerPhone": req.body.customerPhone
        }
     let updateLocation =  await Location.findByIdAndUpdate(req.body._id,updateData,{new: true});
        res.send({ status:200,message: "Address Updated Successfully",locationtList : updateLocation});
    } catch (error) {
        res.send({ error });
          res.send({ error });

    }




}
const publicationLocationControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "isActive": req.body.isActive,
        }
     let updateLocation =  await Location.findByIdAndUpdate(req.body._id,updateData,{new: true});
     if(updateLocation.isActive == 1){
        res.send({ status:200,message: "Location Published Successfully",locationList : updateLocation});
     }
     else if(updateLocation.isActive == 0){
        res.send({ status:200,message: "Location Unpublished Successfully",locationList : updateLocation});
     }
    } catch (error) {
        res.send({ error });
          res.send({ error });

    }

}

const deleteLocationControllerById = async (req : any, res : any, next : any) => {
    try {
        console.log(req.body);
        let updateData = {
            "softDelete": req.body.softDelete,
        }
     let updateLocation =  await Location.findByIdAndUpdate(req.body._id,updateData,{new: true});
     res.send({ status:200,message: "Location Deleted Successfully"});


    } catch (error) {
        res.send({ error });
          res.send({ error });
     
    }

}
export {addLocationController , getLocationController,publicationLocationControllerById,deleteLocationControllerById,updateLocationControllerById}  ; 
