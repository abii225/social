
const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]||null;
    
    if(token){
       jwt.verify(token, 'NEM-111-c4', function(err, decoded) {
      console.log(decoded);
      req.body.userId=decoded.userId;
});
 next();
    }else{
        res.status(200).send({"msg":"You are not authorized, please Login"})
    }
}

module.exports={auth};