'use strict';

const config = require('config');
import { connect, set, connection as db } from 'mongoose';
import { Users } from './models';

// fetch data from config file
const MONGO_URL = config.get('MONGO_URI')


export class BootClass {
	private static DAO_PSQL: any;
	static async Boot() {
		console.log('In Boot Class');
		await BootClass.connectMongoDb();
	}

	private static async connectMongoDb() {
		try {

			set('debug', true)
			set('useFindAndModify', false)
			db.on('error', err => { console.error('%s', err) })
				.on('close', (error) => {

				})
			connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async function (err) {
				if (err) {
					return Promise.reject(err)
				}
				else {
					console.info(`Connected to ${MONGO_URL}`)
					await BootClass.loadDataBase()
				}
			})

			return {}

		} catch (error) {
			console.log("error in mongo connection", error);
		}

	}

	private static async loadDataBase() {
		try {

			// check on server start if data if there in db else if will create redundant data
			let checkDatabase = await Users.find({}).lean().exec()

			// if no data is presend then load data
			if (checkDatabase && checkDatabase.length == 0) {
				const https = require('https');

				https.get('https://jsonplaceholder.typicode.com/comments', (resp: any) => {
					let data = '';

					// A chunk of data has been received.
					resp.on('data', (chunk: any) => {
						data += chunk;
					});

					// The whole response has been received. Print out the result.
					resp.on('end', async () => {

						let parsedData = JSON.parse(data)
						console.log(typeof parsedData);
						await Users.insertMany(parsedData)

					});

				}).on("error", (err: any) => {
					console.log("Error: " + err.message);
				});
			}

		} catch (error) {
			console.log("error in loading data", error);
		}

	}

}