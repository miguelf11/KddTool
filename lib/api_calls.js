if (Meteor.isServer) {
	Meteor.methods({
		createHdfsFolderUser: function (userEmail){
			check(userEmail, String);
			// this.unblock();
			try {
				var result = HTTP.call("PUT", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/projects/"+userEmail+"?op=MKDIRS");
				console.log(result);
				return true;
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				// console.log(result);
				return false;
			}
			// this.unblock();
			// return Meteor.http.call("PUT", "http://"+hadoop_host+"/webhdfs/v1/"+cluster_root+"/"+userEmail+"?op=MKDIRS");
		},
		createHdfsFolderProject: function (userEmail,projectName) {
			check(userEmail, String);
			// this.unblock();
			try {
				var result = HTTP.call("PUT", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/projects/"+userEmail+"/"+projectName+"?op=MKDIRS&user.name=hadoop");
				return result;
				
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(e);
				return e;
			}
			
		},
		removeHdfsFolderProject: function (userEmail,projectName) {
			check(userEmail, String);
			// this.unblock();
			try {
				var result = HTTP.call("DELETE", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/projects/"+userEmail+"/"+projectName+"?op=MKDIRS&recursive=true");
				console.log(result);
				return true;
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(result);
				return false;
			}
		},
		createDatasetInHDFS: function (nameFile,dirLocal,dirHdfs) {
			check(nameFile, String);
			var WebHDFS = require('webhdfs');
			var fs = require('fs');
			var hdfs = WebHDFS.createClient({
				user: 'hadoop',
				host: 'localhost',
				port: 50070
			});
			console.log(nameFile);
			console.log(dirLocal);
			console.log(dirHdfs);
			// var localFileStream = fs.createReadStream('/home/hadoop/Documentos/test_hadoop_rest.txt');
			// var remoteFileStream = hdfs.createWriteStream(cluster_root+"/datasets/test_hadoop_rest4.txt");
			var localFileStream = fs.createReadStream(dirLocal);
			var remoteFileStream = hdfs.createWriteStream(dirHdfs);

			localFileStream.pipe(remoteFileStream);

			// Handle errors
			remoteFileStream.on('error', function onError (err) {
			  // Do something with the error
			  console.log(err);
			  return false;
			});
			// Handle finish event
			remoteFileStream.on('finish', function onFinish () {
			  // Upload is done
			  console.log('uploaded');
			  return true;
			});
		},

        drill: function (){
            console.log('drill');
            //En query colocamos el query que queremos realizar sobre el .csv en el cluster
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        "query" : "select columns[0] as `name`, columns[1] as `last_name` from dfs.`/user/hadoop/datasets/test3.csv` limit 200"
                        // "query" : "select * from dfs.`/user/hadoop/datasets/voice.csv` limit 10"
                    }
                });
                console.log(result.data);
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

		// hiveConnection: function() {
		// 	let options = {};
		// 	let Connection = jshs2.PConnection;
		// 	let Configuration = jshs2.Configuration;
		// 	let config, connect;

		// 	options.auth = "NOSASL";
		// 	options.host = "127.0.0.1";
		// 	options.port = 10000;
		// 	options.timeout = 10000;
		// 	options.username = "APP";
		// 	options.password = "mine";
		// 	options.hiveType = 0;
		// 	options.hiveVer = "1.2.1";
		// 	options.thriftVer = "0.9.3";

		// 	options.maxRows = 100;
		// 	options.nullStr = "NULL";
		// 	options.i64ToString = true;

		// 	config = new Configuration(options);
		// 	config.initialize()
		// 	 .then(() => {
		// 	     connect = new Connection(config);
		// 	     console.log(connect);
		// 	     connect.connect()
		// 	     	.then((err, cursor) => {
		// 	        	console.log("connected");
		// 	        	cursor.execute("show databases", true, function(err, result){
		// 	            console.log(err);
		// 	            console.log(result);
		// 	            cursor.close();
		// 	            connect.close();
		// 	         });
		// 	     });
		// 	 }).catch((err) => {
		// 	     console.log(err);
		// 	 });
		// }
	});
}