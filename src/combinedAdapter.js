const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'eu-north-1' });
const SQSURL = 'https://sqs.eu-north-1.amazonaws.com/000251184253/miniSamApp-GreetingsQueue-CC5zGMwxMRgu';

exports.apiHandler = async (event, context) => {
    console.log('ADAPTER API...');
    const queueUrl = SQSURL;
    function buildResponse(message) {
        const responseBody = {
            message: message
        };
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        };
        console.log('response: ' + JSON.stringify(response));
        return response;
    }
    let name;
    if (event.queryStringParameters) {
        name = event.queryStringParameters.name;
    }
    // Send a message to SQS
    const params = {
        MessageBody:"archit is sending message at..."+Date(),
        QueueUrl: queueUrl
    };

    try {
        await sqs.sendMessage(params).promise();
        console.log('::::::::::::::::: Message sent to SQS ::::::::::::::');
       

        const paramsReceiveMsg = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10, // Maximum number of messages to retrieve (adjust as needed)
            VisibilityTimeout: 10, // The duration (in seconds) that the received messages are hidden from subsequent retrieve requests
            WaitTimeSeconds: 0 // The duration (in seconds) for which the call waits for a message to arrive in the queue before returning
        };

        const data = await sqs.receiveMessage(paramsReceiveMsg).promise();

        if (data.Messages) {
            // Process received messages
            for (const message of data.Messages) {

                console.log('Received Message INSIDE ITSELF:::::::::::', message);

                // Delete the message from the queue (if processed successfully)
                /* await sqs.deleteMessage({
                    QueueUrl: queueUrl,
                    ReceiptHandle: message.ReceiptHandle
                }).promise();
                console.log('Message deleted from the queue'); */
            }
        } else {
            console.log('No messages available in the queue');
        }

        return {
            statusCode: 200,
            body: JSON.stringify('Messages processed successfully')
        };

    } catch (error) {
        console.error('Error sending message to SQS:', error);
        // Handle the error or throw an exception
        return buildResponse('Error sending message to SQS');
    }
    //return buildResponse(Greetings.greetingsFor(name));
};