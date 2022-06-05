const axios = require("axios");
require("dotenv").config();

module.exports.setDateTime = (datetime, day = 0, minute = 0) => {
    return new Date(
        datetime.getFullYear(),
        datetime.getMonth(),
        datetime.getDate() - day,
        datetime.getHours(),
        datetime.getMinutes() - minute,
        datetime.getSeconds(),
        datetime.getMilliseconds()
    );
};

module.exports.getTweetCount = async (startTime, endTime, query) => {
    const url = "https://api.twitter.com/2/tweets/counts/recent";
    // const startTime = "2022-05-12T22:00:00.000Z";
    // const endTime = "2022-05-13T00:00:00.000Z";
    // const query = "池袋線";
    const granularity = "day";
    const token = process.env.TOKEN;

    const req = encodeURI(
        `${url}?query=${query}&start_time=${startTime}&end_time=${endTime}&granularity=${granularity}`
    );

    try {
        const res = await axios.get(req, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
    } catch (error) {
        console.log(error);
    }

};
