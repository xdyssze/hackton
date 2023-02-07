

import {promises as fs} from "fs";

class Database {
    public static saveFile(fileName: string, file: any): Promise<any> {
        return fs.writeFile(`./database/${fileName}`, file);
    }

    public static readFile(file: any): Promise<any> {
        return fs.readFile(`./database/${file}`);
    }

    public static async fileExists(fileName: string): Promise<boolean> {
        try {
            await this.readFile(fileName);

            return true;
        }

        catch(exception) {
            return false;
        }
    }
}

export default Database;