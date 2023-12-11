
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name :String,
email :String,
gender :String,
password :String
},{
    versionKey:false
});
// 

const UserModel=mongoose.model("social-users",userSchema);

module.exports={
    UserModel
}