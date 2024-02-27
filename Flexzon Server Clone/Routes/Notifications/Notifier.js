const Notifications = require("../../models/Notifications")

const Notifier = async(RecieverInfo,Sender,type,message,PostId) => {
    if (!message ||  !Sender) {
    }
    else{
        if (RecieverInfo._id.toString()!=Sender.toString()) {
            if (RecieverInfo.notificationSettings.all&&RecieverInfo.notificationSettings[type]) {
                await Notifications.create({
                Reciever:RecieverInfo._id,
                type,
                message,
                NotificationIncludedUser:Sender,
                NotificationIncludedPost:PostId
            }).catch((Err)=>{
                console.log(Err);
            })    
        }
    }
    }

}

module.exports= Notifier
