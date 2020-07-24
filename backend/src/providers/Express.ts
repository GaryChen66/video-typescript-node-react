import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from '../routes';
import Locals from './Local';

class Express {

	public express: express.Application;

	constructor () {
		this.express = express();
	}
  
	/**
	 * Starts the express server
	 */
	public init (): any {
    const port: number = Locals.config().port;
    
    this.express.use(cors());
    this.express.use(
      '/media/', 
      express.static(path.join(__dirname, '../../public/videos')),
      express.static(path.join(__dirname, '../../public/thumbnails')));
      
    this.express.use('/api/v1/', routes);

		// Start the server on the specified port
		this.express.listen(port, (_error: any) => {
			if (_error) {
				return console.log('Error: ', _error);
			}

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running at 'http://localhost:${port}'`);
		});
	}
}

export default new Express();
