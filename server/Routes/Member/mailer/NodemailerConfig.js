

const nodemailer = require('nodemailer')

let otpGenerator = () =>{
    let random = Math.random().toString().slice(2,6)
    return random
}
const SendOTP = async(email) => {
    let number =   otpGenerator()

    const transporter = await nodemailer.createTransport({
        host:"smtp.gmail.com",
        service:"Gmail",
        port:465,
        secure:true,
        auth:{
            user:"yourssharky@gmail.com",
            pass:"dkys npac fhxy wmwa"
        }
    })
    let mailOptions={
        from:"Records <yourssharky@gmail.com>",
        to:email,
        subject:"OTP Verification for Your Records account",
        html:`	
        <h1>
        Hi Dear,
        </h1>	

<p>We hope this message finds you in good spirits. As part of our commitment to ensuring the security of your account with The Records , we are initiating an OTP (One-Time Password) verification process.<p/>

<b>Your OTP code is: ${number}</b>

<p>Please enter this code on the verification page to complete the process and enhance the security of your account. If you did not initiate this request or have any concerns, please contact our support team immediately.</p>

<h5>Thank you for choosing The Records . We appreciate your commitment to maintaining a secure online environment.</h5>

<i>Best regards</i>,
<b>Records .inc </b>
        `
        ,
        
    }
 let info ;
 await transporter.sendMail(mailOptions,(err,info)=>{
if (!err) {
    info = info.response
}
    })
    
    return {info,number}
}

module.exports =  SendOTP