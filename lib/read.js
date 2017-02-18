var gcloud = require('google-cloud');
var spanner = gcloud.spanner;

var spannerClient = spanner({
  projectId: 'sunny-573'
});

var instance = spannerClient.instance('my-instance');
var database = instance.database('my-database');
var max = 10;
var i = 0;
function doit() {
	i++;
	var ts = new Date().getTime();
	// Run a query as a readable object stream.
	database.runStream('SELECT * FROM Singers')
		.on('error', function(err) {})
		.on('data', function(row) {
			var diff = new Date().getTime() - ts;
			// row.toJSON() = {
			//   SingerId: 10,
			//   FirstName: 'Eddie',
			//   LastName: 'Wilson'
			// }
			console.log('%s>>>>', diff, row);
		})
		.on('end', function() {
			// All results retrieved.
			if(i < max)
				doit();
		});
}

doit();
