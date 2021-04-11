import express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { BootClass } from './databaseConnection';


export class App extends BootClass {
	private static instance: App;
	private app: express.Express;
	private server: any;

	private constructor() {
		super();
		this.app = express();
	}

	static getInstance() {
		if (!App.instance) {
			App.instance = new App();
		}
		return App.instance;
	}

	async init() {
		try {

			await this.loadMiddlewares();
			await App.Boot()
			this.app.use('/users', require('./routes/user.route'))
			await this.start();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	private async loadMiddlewares() {
		// parse application/json
		this.app.use(bodyParser.json({ limit: '50mb' }));
		// parse application/x-www-form-urlencoded
		this.app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

		this.app.use(function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			// res.header("Access-Control-Allow-Credentials", "true");
			res.header(
				'Access-Control-Allow-Headers',
				'Origin,User-Agent, X-Requested-With, content-type,Content-Type, authtoken, access_token, access-token, Accept, authorization'
			);
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
			console.log('--------------------------------request Details----------------------------------------');
			console.log('end point', req.originalUrl);
			console.log('Req Type', req.method);
			console.log('Header', req.headers);
			console.log('auth-token', req.headers['auth-token']);
			console.log('authorization', req.headers['authorization']);
			console.log('user-agent', req.headers['user-agent']);
			console.log('Host', req.headers['host']);
			console.log('Req Body', req.body);
			console.log('Req Params', req.params);
			console.log('Req Query', req.query);
			console.log('-----------------------------------------ENDS------------------------------------------');

			if ('OPTIONS' === req.method) {
				res.send(200);
			} else {
				next();
			}
		});

	}

	private async start() {
		this.server = await this.app.listen(9000, () => {
			console.log(`Server running on ${9000}`);
		});
	}
}
