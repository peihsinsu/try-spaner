var gcloud = require('google-cloud');
var spanner = gcloud.spanner;
var log = require('nodeutil').simplelog;

var spannerClient = spanner({
  projectId: 'sunny-573'
});

var instance = spannerClient.instance('my-instance');
var database = instance.database('my-database');

// Create a table.
var schema =
  'CREATE TABLE Singers (' +
  '  SingerId INT64 NOT NULL,' +
  '  FirstName STRING(1024),' +
  '  LastName STRING(1024),' +
  '  SingerInfo BYTES(MAX),' +
  ') PRIMARY KEY(SingerId)';

log.info('creating database...');
database.create(function(err, database, operation, apiResponse) {
	if(err) {
		log.error('create database error...');
	}

	log.info('creating table...');
	database.createTable(schema, function(err, table, operation) {
		if (err) {
			log.error('Create table error:', err);
		}

		operation
			.on('error', function(err) {
				log.error('operation error:', err);
			})
			.on('complete', function() {
				log.info('operation done');
				log.info('try to close database...');
				database.close(function(err) {
					log.error('database close error:', err);	
				});
			});
	});
});
