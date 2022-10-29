const { sns } = require("./utils/sns"); // ロール設定忘れずに。
const { setDateTime, getTweetCount } = require("./utils/utils");

const index = async () => {
    const now = new Date();
    const now1mAgo = setDateTime(now, 0, 1);
    const yesterday = setDateTime(now, 1, 1);
    const now30mAgo = setDateTime(now, 0, 31);
    const yesterday30mAgo = setDateTime(now, 1, 31);

    const todayData = await getTweetCount(
        now30mAgo.toISOString(),
        now1mAgo.toISOString(),
        "池袋線"
    );
    const yesterdayData = await getTweetCount(
        yesterday30mAgo.toISOString(),
        yesterday.toISOString(),
        "池袋線"
    );

    const todayCount = todayData.data[0].tweet_count;
    const yesterdayCount = yesterdayData.data[0].tweet_count;

    
    console.log(`今日のカウント：${todayCount}`);
    console.log(`昨日のカウント：${yesterdayCount}`);

    if (yesterdayCount !== 0) {
        const growthRate = todayCount / yesterdayCount;
        if (growthRate > 5) {
            await sns(todayCount, yesterdayCount);
        }
        return growthRate;
    } else {
        return 0;
    }
};

module.exports.handler = index;

