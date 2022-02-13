
import { Admin } from '../model/admin';
import jwt from 'jsonwebtoken'; 
const loginController = async (req: any, res: any, next: any) => {

    let data = await Admin.findOne({ email: req.body.email });
    console.log(data);
    // let password = await Admin.findOne({password : req.body.password});
    // console.log(password);



    if (data == null) {
        return res.status(400).json({
            message: 'Wrong Credentials',
        })
    }
    else {
        try {
            if (data.email == req.body.email && data.password == req.body.password) {
                let token = await  jwt.sign({ data }, "privateKey",{ expiresIn:   '1h' })
                return res.status(200).json({
                    message: 'Login Successfully',
                })
            }
        } catch (error) {
            console.log(error)
          res.send({ error });

        }
    }
}

// const getProductController = async (req : any, res : any, next : any) => {
//     try {

//         // let adminNew = new Admin({
//         //     "name":"admin",
//         //     "email":"a1mart@gmail.com",
//         //     "phone":"xxxxxxx",
//         //     "password":"a1@2021"
//         // })
//         // adminNew.save()
//        let productList = await Product.find().populate("categories");
//        res.status(200).json(productList)
//     } catch (error) {
//         console.log(error)
//     }

// }

export { loginController };

