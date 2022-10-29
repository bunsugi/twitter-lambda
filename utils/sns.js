const REGION = "ap-northeast-1" //e.g. "us-east-1"
const { SNSClient, PublishCommand  } = require("@aws-sdk/client-sns") // npm install @aws-sdk/client-sns が必要

module.exports.sns = async (todayCount, yesterdayCount) => {
  
  const client = new SNSClient({ region: REGION })

  const params = {
    Message: `ツイート数が増えました。今日のカウント数：${todayCount}。昨日のカウント数：${yesterdayCount}` /* required */,
    TopicArn: "arn:aws:sns:ap-northeast-1:299413808364:ay-s-topic-test",
  }
  const command = new PublishCommand(params)

  try {
    const data = await client.send(command)
    // process data.
    console.log(data)
  } catch (error) {
    // error handling.
    console.log(`error: ${error}`)
  } finally {
    // finally.
    console.log("finally")
  }
}


