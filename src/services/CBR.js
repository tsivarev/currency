class CBR {
    static pad(n) {
        return n < 10 ? '0' + n : n
    }

    async getDaily(date) {
        let cacheDate = date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getFullYear();
        return fetch('https://www.cbr-xml-daily.ru/daily_json.js?' + cacheDate).then(function (response) {
            return response.json();
        })
    }
}

export default new CBR();
