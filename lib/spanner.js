var gcloud = require('google-cloud');
var spanner = gcloud.spanner;

var spannerClient = spanner({
  projectId: 'sunny-573'
});

var instance = spannerClient.instance('my-instance');
var database = instance.database('my-database');

// Insert data into the table.
var table = database.table('Singers');

exports.createSingerTable = function(cb){
	// Create a table.
	var schema =
		'CREATE TABLE Singers (' +
		'  SingerId INT64 NOT NULL,' +
		'  FirstName STRING(1024),' +
		'  LastName STRING(1024),' +
		'  SingerInfo BYTES(MAX),' +
		') PRIMARY KEY(SingerId)';

	database.createTable(schema, function(err, table, operation) {
		if (err) {
			// Error handling omitted.
		}

		operation
			.on('error', function(err) {})
			.on('complete', function() {
				// Table created successfully.
			});
	});
}

exports.addSigner = function(id, data, cb) {

	table.insert({
		SingerId: id,
		FirstName: data.firstname,
		LastName: data.lastname
	}, function(err) {
		if (!err) {
			return cb(err);
		}

		cb(null, {msg:'insert success'});
	});
}

exports.listAllSingers = function(cb) {
	var result = [];
	// Run a query as a readable object stream.
	database.runStream('SELECT * FROM Singers')
		.on('error', function(err) {
			return cb(err);
		})
		.on('data', function(row) {
			// row.toJSON() = {
			//   SingerId: 10,
			//   FirstName: 'Eddie',
			//   LastName: 'Wilson'
			// }
			console.log('data>>>>', row);
			result.push(row);
		})
		.on('end', function() {
			// All results retrieved.
			console.log('end...');
			return cb(null, {result: result});
		});

}
