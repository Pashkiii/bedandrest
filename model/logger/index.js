function getMessage(logData) {
    if (logData instanceof Error) {
        return `${logData.name}: ${logData.message}`;
    }

    return Array.isArray(logData) ? logData.join("") : logData;
}

async function log(message) {
    try {
        const d = new Date();
        const data = `${d.toLocaleString("ru-RU")}: ${getMessage(message)} \n`;

        console.log(data);
    } catch (error) {
        console.log("Logger error", error);
    }
}

module.exports = {
    log
};
