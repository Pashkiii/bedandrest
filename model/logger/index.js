const fs = require("node:fs/promises");

function getMessage(logData) {
    if (logData instanceof Error) {
        return `${logData.name}: ${logData.message}`;
    }

    return Array.isArray(logData) ? logData.join("") : logData;
}

async function log(message) {
    try {
        if (process.env.NODE_ENV === "development") {
            console.warn(message);
        }

        const d = new Date();
        const data = `${d.toLocaleString("ru-RU")}: ${getMessage(message)} \n`;

        console.log(data);
        const loggerPath =
            process.env.NODE_ENV === "development"
                ? "./log.txt"
                : "./log.txt";
        await fs.writeFile(loggerPath, data, { flag: "a" });
    } catch (error) {
        console.log("Logger error", error);
    }
}

module.exports = {
    log
};
