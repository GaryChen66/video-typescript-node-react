import Express from './Express';
import Database from './Database';

class App {

	// Loads your Server
	public loadServer (): void {
    console.log('Loading server...');
    this.loadDatabase();
    Express.init();
  }
  

	// Loads the Database Pool
	public loadDatabase (): void {
		console.log('Loading database...');
    Database.sync();
	}
}

export default new App;
