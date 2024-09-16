import fs from "node:fs/promises";

function getMessage(logData) {
    if (logData instanceof Error) {
        return `${logData.name}: ${logData.message}`;
    }

    return Array.isArray(logData) ? logData.join("") : logData;
}

export async function log(message) {
    try {
        if (process.env.NODE_ENV === "development") {
            console.warn(message);
        }

        const d = new Date();
        const data = `${d.toLocaleString("ru-RU")}: ${getMessage(message)} \n`;

        const loggerPath =
            process.env.NODE_ENV === "development"
                ? "./log.txt"
                : "./log.txt";
        await fs.writeFile(loggerPath, data, { flag: "a" });
    } catch (error) {
        console.log("Logger error", error);
    }
}