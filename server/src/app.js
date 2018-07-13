const os = require('os');
const userName = os.userInfo().username;

const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const querystring = require('querystring');
const _ = require('lodash');
const sqlite3 = require('sqlite3').verbose();
const config = require('../config/config.' + userName + '.json');

const db = new sqlite3.Database('data/database.sqlite');

db.serialize(function () {
    db.run("CREATE TABLE if not exists user_info (user_id INTEGER PRIMARY KEY ASC)");
});

const router = express.Router({});
const app = express();

app.use('/api', router);

router.put('/notifications/:userId', (request, response) => {
    let userId = request.params.userId;
    db.run("INSERT INTO user_info VALUES (?)", userId, error => {
        if (error) {
            console.error(error);
            response.status(500).send({error: 'Something failed!'});
        } else {
            response.json({
                status: 1
            });
        }
    });
});

router.delete('/notifications/:userId', (request, response) => {
    let userId = request.params.userId;
    db.run("DELETE FROM user_info WHERE user_id = ?", userId, error => {
        if (error) {
            console.error(error);
            response.status(500).send({error: 'Something failed!'});
        } else {
            response.json({
                status: 1
            });
        }
    });
});

function pad(n) {
    return n < 10 ? '0' + n : n
}

function getPrettyCurrency(symbol, currency) {
    let isMore = currency.Value > currency.Previous;
    let arrow = isMore ? '↑' : '↓';

    return symbol + ' ' + currency.Value + '₽ ' + arrow;
}

cron.schedule("*/10 * * * * *", function () {
    let date = new Date();
    axios.get('https://www.cbr-xml-daily.ru/archive/' + date.getUTCFullYear() + '/' + pad(date.getUTCMonth() + 1) + '/' + pad(date.getUTCDate()) + '/daily_json.js')
        .then(response => {
            let currencies = _.keyBy(response.data.Valute, (currency) => currency.CharCode);
            let message = 'ЦБ РФ: ' + getPrettyCurrency('$', currencies['USD']) + ', ' + getPrettyCurrency('€', currencies['EUR']);

            let userIds = [];
            let maxUserId = 0;

            do {
                userIds = [];
                db.all("SELECT user_id FROM user_info WHERE user_id > ? LIMIT 100", maxUserId, function (error, rows) {
                    if (error) {
                        console.error(error);
                    } else {
                        rows.forEach((row) => {
                            let userId = row.user_id;
                            userIds.push(userId);
                            if (userId > maxUserId) {
                                maxUserId = userId;
                            }
                        });

                        if (userIds.length > 0) {
                            axios.post('https://api.vk.com/method/notifications.sendMessage',
                                querystring.stringify({
                                    'access_token': config.serviceAccessToken,
                                    'user_ids': userIds.join(','),
                                    'message': message,
                                    'v': '5.80'
                                }))
                                .then(response => {
                                    console.log(response.data);
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    }
                });
            } while (userIds.length >= 100);
        })
        .catch(error => {
            console.log(error);
        });
}, true);

let server = app.listen(3000, function () {
    console.log('App running on port:', server.address().port);
});
