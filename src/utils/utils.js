const axios  = require("axios");

function formatList(contestList){
    const arr = [];
    const objectsArr = contestList.objects;

    for(const obj of objectsArr){
        // console.log(obj);
        let currObj = {};
        currObj.event = obj.event;
        currObj.duration = obj.duration;
        currObj.link = obj.href;
        currObj.host = obj.host;
        currObj.startTime = obj.start;

        // console.log(currObj);
        arr.push(currObj);
    }

    return arr;
}

async function getTodayContest() {
    try {
        const now = new Date();
        const currDateStartTime = now.toISOString();
        const currDateEndTime = currDateStartTime.substring(0,11) + "23:59:59.000Z";

        const response = await axios.get("https://clist.by/api/v4/contest/",{
            headers: {
                Authorization: `ApiKey ${process.env.API_USERNAME}:${process.env.API_KEY}`
            },
            params:{
                format_time : 'true',
                start__gte : currDateStartTime,
                end__lte : currDateEndTime,
                total_count : 'true'
            }
        });
        const contestList = response.data;
        const result = formatList(contestList);
        return result;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTodayContest 
}