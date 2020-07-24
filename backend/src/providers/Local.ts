import path from 'path';
import dotenv from 'dotenv';

class Local {
	public static config(): any {
    const port = process.env.PORT || 4040;
    const dbName = process.env.DB_NAME;
    const dbUsername = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
		return {
      port,
      dbName,
      dbUsername,
      dbPassword,
      dbHost
		};
	}

	public static init (): void {
    dotenv.config({ path: path.join(__dirname, '../../.env') });
	}
}

Local.init();

export default Local;
