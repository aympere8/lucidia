const mg= require('mongoose');

const user = mg.Schema(
    {
        u_name: {
            type: String,
            required: true,
        },
        u_mail:
        {
            type: String,
            required: true,

        },

        u_pass:{
            type: String,
            required: true,

        }
        
    }
)

module.exports= mg.model('usermod', user);