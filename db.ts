

import {promises as fs} from "fs";

const dbLocation = "./database"

class Database {
    private static async createDatabaseFolder(): Promise<void> {
        await fs.mkdir(dbLocation);
    }

    private static async databaseFolderExistance(): Promise<boolean> {
        try {
            await fs.readFile(dbLocation);

            return true;
        }

        catch(exception) {
            return false
        }
    }

    private static async databaseFolder(): Promise<void> {
        const existance = await this.databaseFolderExistance();
        
        if (existance) return;

        await this.createDatabaseFolder();
    }

    public static async saveFile(fileName: string, file: any): Promise<any> {
        await this.databaseFolder();

        return fs.writeFile(`${dbLocation}/${fileName}`, file);
    }

    public static readFile(file: any): Promise<any> {
        return fs.readFile(`${dbLocation}/${file}`);
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