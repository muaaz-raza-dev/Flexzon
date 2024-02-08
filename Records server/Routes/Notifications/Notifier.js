const Notifications = require("../../models/Notifications")

const Notifier = async(RecieverInfo,Sender,type,message,PostId) => {
    if (RecieverInfo._id!==Sender) {
        if (RecieverInfo.notificationSettings.all&&RecieverInfo.notificationSettings[type]) {
            await Notifications.create({
                Reciever:RecieverInfo._id,
                type,
                message,
                NotificationIncludedUser:Sender,
                NotificationIncludedPost:PostId
            }).catch((Err)=>{
                console.log(err);
            })    
            }
    }

}

module.exports= Notifier
