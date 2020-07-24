import { Sequelize } from 'sequelize';
import Local from './Local';

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.init();
  }

  public init(): void {
    const { dbName, dbUsername, dbPassword, dbHost } = Local.config();
    const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
      host: dbHost,
      dialect: 'postgres',
      logging: false
    });
    this.sequelize = sequelize;
  }

  public async sync(): Promise<void> {
    await this.sequelize.sync();
  }
}

export default new Database;
