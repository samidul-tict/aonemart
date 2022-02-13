import jwt from 'jsonwebtoken'; 

export  function  auth(){
        return function (req:any,res:any,next:any) {
         //   console.log('rishi',req.headers);
            
        const authHeader = req.headers["authorization"]
        if( authHeader !== undefined){
            const Bearer = authHeader.split(" ")
            const BearerToken = Bearer[1]
            req.token = BearerToken;
            try{
                let jwtData =   jwt.verify(req.token,"privateKey");
                req.user =jwtData;
                next();
            }catch (ex) {
                res.status(401).send('Unauthorized request.')
            }
        }else{
           res.json({'status':'400','error': 'JsonWebTokenError','message':'invalid signature'});
        
        }
    }
    }


//export default new authguard();
