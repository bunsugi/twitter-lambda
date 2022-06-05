const REGION = "ap-northeast-1" //e.g. "us-east-1"
const { SNSClient, AddPermissionCommand, PublishCommand  } = require("@aws-sdk/client-sns") // npm install @aws-sdk/client-sns が必要

// タイムアウトの設定を変える。
// エラー
// 2022-05-24T02:26:07.159Z a41cb1d6-6789-4eb4-a7ef-396aec805f78 Task timed out after 3.05 seconds

module.exports.sns = async (todayCount, yesterdayCount) => {
  console.log("sns()")
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


// console.log("sns()")
// const client = new SNSClient({ region: REGION })

// const params = {
//   Message: "AY-S-テスト配信" /* required */,
//   TopicArn: "arn:aws:sns:ap-northeast-1:299413808364:ay-s-topic-test",
// }
// const command = new AddPermissionCommand(params)

// try {
//   const data = await client.send(command)
//   // process data.
//   console.log(data)
// } catch (error) {
//   // error handling.
//   console.log(`error: ${error}`)
// } finally {
//   // finally.
//   console.log("finally")
// }


// const params = {
//   Message: "AY-S-テスト配信" /* required */,
//   TopicArn: "arn:aws:sns:ap-northeast-1:299413808364:ay-s-topic-test",
// }

// module.exports.snsRun = async () => {
//   try {
//     const data = await snsClient.send(new PublishCommand(params))
//     console.log("Success.", data)
//     return data // ユニットテスト用
//   } catch (err) {
//     console.log("Error", err.stack)
//   }
// }
