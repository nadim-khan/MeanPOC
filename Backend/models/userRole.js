const mongoose=require('mongoose');

var UserRole=mongoose.model('UserRole',{
    role_name: {type: String},
    sys_role: {type: String},
    role_desc: {type: String},
    role_c_date: {type: Date},
    role_u_date: {type: Date},
})

module.exports={UserRole};