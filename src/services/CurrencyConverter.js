class CurrencyConverter {
    async getUsdEurRate() {
        return fetch('https://free.currencyconverterapi.com/api/v5/convert?q=USD_EUR&compact=y&apiKey=88bb8bbba9a29716dfd5')
            .then(function (response) {
                return response.json();
            })
    }
}

export default new CurrencyConverter();
