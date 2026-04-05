const AWS = require("aws-sdk");

let sns = null;
async function connectToSNS(){
    try{
        if (sns){
        return sns;
        }

        AWS.config.update({ region: "us-east-1" });
        sns = new AWS.SNS();

        console.log("AWS: Connected to SNS");
        return sns;
    }
    catch(error){
        console.log(`Issue in connecting to AWS SNS: ${error.message}`);
    }
    
}

async function addSubscriber(email) {
  try {
    const topicArn = "arn:aws:sns:us-east-1:942453882347:sdcProjectSNS";
    const sns_sdk = await connectToSNS();

    const params = {
      Protocol: "email",  // for email notifications
      TopicArn: topicArn,
      Endpoint: email,      // the email you want to subscribe
       Attributes: {
        FilterPolicy: JSON.stringify({
            email: [email]   // Only messages with this email attribute will go to this subscriber
        })
    }
    };

    const result = await sns_sdk.subscribe(params).promise();
    console.log("AWS SNS: Subscription request sent:", result);

    // AWS will send a confirmation email to the user
    return result;
  } catch (err) {
    console.error("AWS SNS: Error subscribing email:", err);
    throw err;
  }
}

async function sendNotification(targetSubscriberEmail, subject, message) {
  try{
    const topicArn = "arn:aws:sns:us-east-1:942453882347:sdcProjectSNS";
    const sns_sdk = await connectToSNS();

    const params = {
        Message: message,
        TopicArn: topicArn,
        Subject: subject,
        MessageAttributes: {
            "email": {
                DataType: "String",
                StringValue: targetSubscriberEmail
            }
        }
    };

    await sns_sdk.publish(params).promise();
    console.log("AWS SNS: Notification sent!");
  }
  catch(error){
    console.log(`SNS.js -> sendNotification: ${error.message}`);
  }
}


module.exports = {addSubscriber, sendNotification};


