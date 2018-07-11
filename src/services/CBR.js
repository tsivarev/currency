class CBR {
    async getDaily() {
        return fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
            cache: "no-cache"
        })
            .then(function (response) {
                return response.json();
            })
    }
}

export default new CBR();
