class CurrencyConverter {
    async getUsdEurRate() {
        return fetch('https://free.currencyconverterapi.com/api/v5/convert?q=USD_EUR&compact=y')
            .then(function (response) {
                return response.json();
            })
    }
}

export default new CurrencyConverter();
