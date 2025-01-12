
import fs from "fs";

export default class filesManager{

    static readFiles=(path)=>
    {
        try{
            const file = fs.readFileSync(path, "utf-8");
            return file;
        }
        catch(error)
        {
            console.log(error)
        }

    }

    static writeFiles = (path,newContent)=>
    {
        try{
            fs.writeFileSync(path,newContent);
            return true;
        }
        catch(error)
        {
            console.log(error)
        }
    }

    static appendFiles = (path, newContent) => {
        try {
            fs.appendFileSync(path,newContent);
            return true;
        }
        catch (error) {
            console.log(error)
        }
    }



    static getDate = (pathFile) => {
        try {
            let count = 0;
            const intervalId = setInterval(() => {
                const date = new Date().toLocaleTimeString();
                if (fs.existsSync(pathFile)) {
                    this.appendFiles(pathFile, "\n" + date)
                } else {
                    this.writeFiles(pathFile, "\n" + date);
                }
                count++;
                if (count === 10) {
                    clearInterval(intervalId);
                }
            }, 1000);

            
        } catch (error) {
            console.error(error);
        }
    };




    static verifyLogFile = async (logPath) => {
        try {
            await fs.promises.access(logPath, fs.constants.F_OK);
            return true;
        } catch (error) {
            return false;
        }
    };

    static registerLogs = async (logPath,typeLog, msgLog) => {
        const timestamp = new Date().toISOString();
        const logMsg = `[${timestamp}]  ${typeLog}:  ${msgLog}\n`;

        try {
            const logExists = await this.verifyLogFile(logPath);
            if (logExists) {
                // añadirle info al archivo existente
                await fs.promises.appendFile(logPath, logMsg);
            } else {
                // crear el archivo
                await fs.promises.writeFile(logPath, logMsg);
            }
        } catch (error) {
            console.error("Error al registrar el log");
        }
    };
}


