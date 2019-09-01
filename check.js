const level = require("level");
const msgpack = require("msgpack5");

const pack = msgpack();
const [databasePath] = process.argv.slice(2);

(async () => {
    console.log("Opening database", databasePath, "...");
    const database = level(databasePath, { valueEncoding: pack });
    const stream = database.createReadStream();

    const candlesticks = [];
    for await (const candlestick of stream) {
        candlesticks.push(candlestick);
    }

    console.info("Candlestick count:", candlesticks.length);
})();
