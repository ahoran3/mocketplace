'use strict';

const program = require('commander');

program
    .version('0.0.1')
    .option('-k, --apikey [value]', 'API Key')
    .parse(process.argv);

const quotes = require('./alphavantage')(program.apikey);
const marketplace = require('./market')(quotes);
const interests = require('./config');

if (interests && interests.companies) {
    interests.companies.forEach(company => {
        // getQuote(global(company));
        quotes.intraday(company);
    });
}

// alphavantage.global('LOGI');
marketplace.marketBuy('LOGI', 3);
