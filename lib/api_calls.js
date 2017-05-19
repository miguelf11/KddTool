var rio = require("rio");
var path = require("path");
var fs = require("fs");

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
				user: cluster_user,
				host: host,
				port: port
			});
			console.log(nameFile);
			console.log(dirLocal);
			console.log(dirHdfs);

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
						"query" : "alter session set `store.format`='parquet'"
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
			var queryCopy = "select * from dfs.`"+data_address+"/*`";
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

		queryDataDrillMaxValue: function (field,data_type,data_address){
			// console.log('drill');
			var queryCopy = "select max(cast("+field+" as "+data_type+")) from dfs.`"+data_address+"/*` limit 1";
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

		queryDataDrillMinValue: function (field,data_type,data_address){
			// console.log('drill');
			var queryCopy = "select min(cast("+field+" as "+data_type+")) from dfs.`"+data_address+"/*` limit 1";
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

		queryDataDrillAVGValue: function (field,data_type,data_address){
			// console.log('drill');
			var queryCopy = "select avg(cast("+field+" as "+data_type+")) from dfs.`"+data_address+"/*` limit 1";
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

		queryDataDrillOrderBy: function (column,data_type,order,data_address){
			// console.log('drill');
			if (order == 'asc'){
				var queryCopy = "select * from dfs.`"+data_address+"/*` order by (case when "+column+" = '' then CAST(NULL AS "+data_type+") else CAST("+column+" AS "+data_type+") end) "+order+" nulls first";
			}else{
				var queryCopy = "select * from dfs.`"+data_address+"/*` order by (case when "+column+" = '' then CAST(NULL AS "+data_type+") else CAST("+column+" AS "+data_type+") end) "+order+" nulls last";
			}

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

		queryDataDrillFilterBy: function (new_version_address,old_version_address,column,filter,value) {
			var queryCopy = "create table dfs.root.`"+new_version_address+"` as select * from dfs.`"+old_version_address+"/*` where "+column+" "+filter+" "+value+"";
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

		queryDatasetColumnsLimited: function (data_address, limit) {
			var queryCopy = "select * from dfs.`"+data_address+"` limit "+limit;
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

		removeRows: function (new_version_address,old_version_address,rows_to_remove){
			var queryCopy = "create table dfs.root.`"+new_version_address+"` as select * from dfs.`"+old_version_address+"` where row_num not in ("+rows_to_remove+")";
			console.log(queryCopy);
			try {
				var result = HTTP.call("POST", "http://localhost:8047/query.json",{ 
					data: {
						"queryType" : "SQL",
						"query" : queryCopy
					}
				});

				console.log(result);

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
							"query" : "alter session set `store.format`='parquet'"
						}
					});

					if(result1.data.rows[0].ok == 'true'){
						console.log('ok entonces 2');
						//query para copiar en carpeta de proyecto
						var queryCopy = "create table dfs.root.`"+folder_project+"/raw` as select row_number() over(partition by 1) as row_num,* from dfs.`"+dataset_address+"`";
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

		queryExploreString: function (column,project_address){
			var queryCopy = "select "+column+", count(*) as Cantidad from dfs.`"+project_address+"` group by "+column+" order by Cantidad desc limit 30";
			console.log(queryCopy);
			try {
				var result = HTTP.call("POST", "http://localhost:8047/query.json",{ 
					data: {
						"queryType" : "SQL",
						"query" : queryCopy
					}
				});

				console.log(result);

				return result;
				
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(e);
				return e;
			}
		},

		test: function (project_address, dataset_address) {

			var result1 = HTTP.call("POST", "http://localhost:8047/query.json",{ 
				data: {
					"queryType" : "SQL",
					"query" : "alter session set `store.format`='csv'" //el que ellos necesiten
				}
			});

			var result1 = HTTP.call("DELETE", "http://"+hadoop_host+"/webhdfs/v1"+project_address+"/vista_minable?op=delete&recursive=true&user.name="+cluster_user);
			console.log(result1);
			if(result1.statusCode == 200){
				var queryCopy = "create table dfs.root.`"+project_address+"/vista_minable` as select * from dfs.`"+dataset_address+"`";
				console.log(queryCopy);
				try {
					var result = HTTP.call("POST", "http://localhost:8047/query.json",{ 
						data: {
							"queryType" : "SQL",
							"query" : queryCopy
						}
					});

					console.log(result);

					return result;

				} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(e);
				return e;
			}
		}
		return true;
	},

	removeField: function (new_version_address,old_version_address,fields){
		var queryCopy = "create table dfs.root.`"+new_version_address+"` as select "+fields+" from dfs.`"+old_version_address+"`";
		console.log(queryCopy);
		try {
			var result = HTTP.call("POST", "http://localhost:8047/query.json",{ 
				data: {
					"queryType" : "SQL",
					"query" : queryCopy
				}
			});

			console.log(result);

			return result;

		} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				console.log(e);
				return e;
			}
		},

		recoverPwd: (id,to) => {
			// process.env.MAIL_URL = "smtp://username:pwd@host:port";
			Accounts.emailTemplates.siteName = "KDD Tool";
			Accounts.emailTemplates.resetPassword = {
				from: () => {
					return "info@kddtool.com"
				},
				subject: (user) =>  {
					return "Reiniciar contraseña"
				},
				text: (user, url) => {
					return `Hey ${user.profile.name}! Reinicie su contraseña haciendo click en el siguiente enlace: ${url}`;
				}
			};
			Accounts.sendResetPasswordEmail(id, to);
			return 1;
		},

		replaceValues: (new_version_address,old_version_address, column, initVal, postVal, order) => {
			try	{

				var queryCopy = "select * from dfs.`"+old_version_address+"`";

				var result = HTTP.call("POST", "http://localhost:8047/query.json",{ 
					data: {
						"queryType" : "SQL",
						"query" : queryCopy
					}
				});
				
				var rows = result.data.rows;
				for (let i in rows){
					if (rows[i][column] == initVal) {
						rows[i][column] = postVal;
					}
				}

				result = HTTP.call("PUT", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/tmp/0_0_0.json?op=CREATE&overwrite=true&user.name="+cluster_user);
				result = HTTP.call("PUT", result.headers.location);
				result = HTTP.call("POST", "http://"+hadoop_host+"/webhdfs/v1"+cluster_root+"/tmp/0_0_0.json?op=APPEND&user.name="+cluster_user);
				result = HTTP.call("POST", result.headers.location, {data: rows});


				queryCopy = "create table dfs.root.`"+new_version_address+"` as  select "+order+" from dfs.`"+cluster_root+"/tmp/0_0_0.json`";

				result = HTTP.call("POST", "http://localhost:8047/query.json",{ 
					data: {
						"queryType" : "SQL",
						"query" : queryCopy
					}
				});

				// console.log(result);

				return result;

			} catch (e){
				console.log(e);

				return e;
			}
		},

		example10: async function(input){
                const promisedResult = rio.$e({
                    filename: route + "example10.R",
                    entrypoint: "test",
                    data: input
                })
                .then(function (res) {
                    fs.writeFile(routeImg+"test.png", res, {encoding: "binary"}, (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                    });
                    return JSON.parse(res);
                })
                .catch(function (err) {
                    console.log("resultado malo: "+err);
                    return (err);
                });
                return promisedResult;
        },

        example: async function(input){
                const promisedResult = rio.$e({
                    filename: route + "example.R",
                    entrypoint: "test",
                    data: input
                })
                .then(function (res) {
                    console.log("resultado bueno: "+res);
                    console.log("resultado bueno json parse : "+JSON.parse(res));
                    return JSON.parse(res);
                })
                .catch(function (err) {
                    console.log("resultado malo: "+err);
                    return (err);
                });
                return promisedResult;
        },

        queryPrueba: function (datasetAdress){
            var queryCopy = "select * from dfs.`"+datasetAdress+"`";
            // /user/hadoop/projects/miguel@gmail.com/Iris1494697308555vista_minable/0_0_0.parquet
            console.log(queryCopy);
            try {
                var result = HTTP.call("POST", "http://localhost:8047/query.json",{ data: {
                        "queryType" : "SQL",
                        "query" : queryCopy
                    }
                });
                console.log("RESUTADO");
                return result;
            } catch (e) {
                console.log(e);
                return e;
            }
        }
	});
}