class CBR {
    static pad(n) {
        return n < 10 ? '0' + n : n
    }

    async getDaily(date) {
        return fetch('https://www.cbr-xml-daily.ru/archive/' + date.getUTCFullYear() + '/' + CBR.pad(date.getUTCMonth() + 1) + '/' + CBR.pad(date.getUTCDate()) + '/daily_json.js').then(function (response) {
            return response.json();
        })
    }
}

export default new CBR();
