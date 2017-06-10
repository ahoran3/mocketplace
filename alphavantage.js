'use strict';
const request = require('request-promise');

function getQuote (qOptions) {
    return request(qOptions)
        .then((response) => {
            console.log(`\n***** Quotes for ${qOptions.qs.symbol} ******`);
            console.log(response);
            return response;
        })
        .error(err => {
            console.log(`\n***** Quotes for ${qOptions.qs.symbol} ******`);
            console.log('errored');
            return err;
        });
}

module.exports = (apiKey) => {
    return {
        global (company, interval='1min') {
            return getQuote({
                uri: 'http://www.alphavantage.co/query',
                qs: {
                    function: 'GLOBAL_QUOTE',
                    interval: interval,
                    symbol: company,
                    apikey: apiKey
                },
                headers: {
                    accept: 'application/json'
                },
                json: true
            });
        },
        intraday (company, interval='1min', size='compact') {
            return getQuote({
                uri: 'http://www.alphavantage.co/query',
                qs: {
                    function: 'TIME_SERIES_INTRADAY',
                    interval: interval,
                    outputsize: size,
                    symbol: company,
                    apikey: apiKey
                },
                headers: {
                    accept: 'application/json'
                },
                json: true
            });
        }
    };
};
