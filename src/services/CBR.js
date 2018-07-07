class CBR {
    async getDaily() {
        return fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(function (response) {
                return response.json();
            })
    }
}

export default new CBR();
