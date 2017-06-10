'use strict';

function getRandomTTM() {
    var fiveMins = 1000 * 60 * 5;
    var tenSeconds = 1000 * 10;
    return Math.floor(Math.random() * fiveMins ) + tenSeconds;
}

module.exports = (quotes) => {
    return {
        marketBuy(company, numShares) {
            console.log(`\nSENDING MARKET BUY REQUEST:\n\t${numShares} shares of ${company}.`);
            setTimeout(() => {
                quotes.global(company).then(data => {
                    var pricePerShare = data['Realtime Global Securities Quote']['03. Latest Price'];
                    var totalSpent = numShares * pricePerShare;
                    console.log(`SUCCESSFULL PURCHASE:\n\t${numShares} shares of ${company} at $${pricePerShare}.\n\t$${totalSpent}.`);
                });
            }, 1000);//getRandomTTM());
        },
        limitBuy(company, price, numShares) {
            console.log(`\nSENDING LIMIT BUY REQUEST:\n\t${numShares} shares of ${company}.`);

        },
        marketSell(company, numShares) {
            console.log(`\nSENDING MARKET SELL REQUEST:\n\t${numShares} shares of ${company}.`);

        },
        limitSell(company, price, numShares) {
            console.log(`\nSENDING LIMIT SELL REQUEST:\n\t${numShares} shares of ${company}.`);

        }
    };
};
