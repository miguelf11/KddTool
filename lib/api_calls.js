if (Meteor.isServer) {
	Meteor.methods({
		createHdfsFolderUser: function (userEmail){
			check(userEmail, String);
			// this.unblock();
			try {
				var result = HTTP.call("PUT", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/projects/"+userEmail+"?op=MKDIRS&permission=777&user.name="+cluster_user);
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
				var result = HTTP.call("PUT", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/projects/"+userEmail+"/"+projectName+"?op=MKDIRS&permission=777&user.name="+cluster_user);
				return result;
				
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(e);
				return e;
			}
			
		},
		removeHdfsFolder: function (hdfs_address) {
			check(hdfs_address, String);
			// this.unblock();
			try {
				var result = HTTP.call("DELETE", "http://"+hadoop_host+"/webhdfs/v1"+hdfs_address+"?op=DELETE&recursive=true&user.name="+cluster_user);
				console.log(result);
				return result;
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(e);
				return e;
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
            var response = true;

			localFileStream.pipe(remoteFileStream);

			// Handle errors
			remoteFileStream.on('error', function onError (err) {
			  // Do something with the error
			  console.log(err);
			  return false;
			});
			// Handle finish event
			remoteFileStream.on('finish', function onFinish (res) {
			  // Upload is done
              // console.log(res);
			  console.log('uploaded');
              // response = true;
			  return true;
			});
            // console.log(response);
            return response;
		},

        drill: function (){
            console.log('drill');
            //En query colocamos el query que queremos realizar sobre el .csv en el cluster
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        // "query" : "select columns[0] as `name`, columns[1] as `last_name` from dfs.`/user/hadoop/datasets/test3.csv` limit 200"
                        // "query" : "select * from dfs.`/user/hadoop/datasets/voice.csv` limit 10"
                        // "query" : "use dfs"
                        "query" : "alter session set `store.format`='csv'"
                    }
                });
                // console.log(result.data);
                console.log(result.data.rows[0].ok);///response de use y de alter
                if (result.data.rows[0].ok == 'true'){
                	console.log('ok entonces');
                }
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

        queryDataDrill: function (data_address){
            console.log('drill');
            var queryCopy = "select * from dfs.`"+data_address+"/raw/*` limit 100";
            console.log(queryCopy);
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        "query" : queryCopy
                    }
                });
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

        queryDataDrillOrderBy: function (column,order,data_address){
            // console.log('drill');
            var queryCopy = "select * from dfs.`"+data_address+"/raw/*` order by "+column+" "+order+" limit 100";
            console.log(queryCopy);
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        "query" : queryCopy
                    }
                });
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

        queryDatasetRows: function (data_address){
            // console.log('drill');
            //En query colocamos el query que queremos realizar sobre el .csv en el cluster
            var queryCopy = "select count(1) from dfs.`"+data_address+"`";
            console.log(queryCopy);
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        "query" : queryCopy
                    }
                });
                console.log('queryDatasetRows');
                console.log(result);
                // console.log(result);
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

        queryDatasetColumns: function (data_address){
            // console.log('drill');
            //En query colocamos el query que queremos realizar sobre el .csv en el cluster
            var queryCopy = "select * from dfs.`"+data_address+"` limit 1";
            console.log(queryCopy);
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        "query" : queryCopy
                    }
                });
                console.log(result.data.columns);
                // console.log(result);
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

        copyDatasetInFolderProject: function (folder_project,dataset_address){
            console.log('drill');
            //En query colocamos el query que queremos realizar sobre el .csv en el cluster
            var result = {'error': true};
            try {
                var result0 = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        // "query" : "select columns[0] as `name`, columns[1] as `last_name` from dfs.`/user/hadoop/datasets/test3.csv` limit 200"
                        // "query" : "select * from dfs.`/user/hadoop/datasets/voice.csv` limit 10"
                        "query" : "use dfs"
                    }
                });
                console.log(result0.data.rows[0].ok);
                if (result0.data.rows[0].ok == 'true'){
                	console.log('ok entonces');
                	//query para setear salida en csv
                	var result1 = HTTP.call("POST", "http://localhost:8047/query.json",{ 
                		data: {
	                        "queryType" : "SQL",
	                        "query" : "set `store.format`='csv'"
	                    }
                	}); 

                	if(result1.data.rows[0].ok == 'true'){
                		console.log('ok entonces 2');
                		//query para copiar en carpeta de proyecto
                		var queryCopy = "create table dfs.root.`"+folder_project+"/raw` as select * from dfs.`"+dataset_address+"`";
                		console.log(queryCopy);
                		var result2 = HTTP.call("POST", "http://localhost:8047/query.json",{ 
	                		data: {
		                        "queryType" : "SQL",
		                        "query" : queryCopy
		                    }
                		});

                		console.log(result2.data);

                		result = result2;
                	}
                }

                console.log(result);
                return result;
                
            } catch (e) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                console.log(e);
                return e;
            }
        },

        changeDataType: function (folder_project,data_type){
            console.log('cambiando el tipo de dato a: '+data_type);
            
            // try {
            //     var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
            //             "queryType" : "SQL",
            //             "query" : queryCopy
            //         }
            //     });
            //     console.log(result.data.columns);
            //     // console.log(result);
            //     return result;
                
            // } catch (e) {
            //     // Got a network error, time-out or HTTP error in the 400 or 500 range.
            //     console.log(e);
            //     return e;
            // }
            return true;
        },
	});
}