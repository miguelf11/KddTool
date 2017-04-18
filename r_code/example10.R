require(RJSONIO)
library(sparklyr)
library(dplyr)
library(DBI)
library(ggplot2)
library(tidyr);

test <- function (data) {

	# sc <- spark_connect(master = "local",spark_home = '/usr/local/spark/')
	# import_iris <- spark_read_csv(sc, name = "iris", path = "hdfs:////user/hadoop/datasets/iris1491518914745.csv", header = TRUE)
	# partition_iris <- sdf_partition(import_iris,training=0.5, testing=0.5) 
	# sdf_register(partition_iris, c("spark_iris_training","spark_iris_test"))
	# tidy_iris <- tbl(sc,"spark_iris_training") %>% select(Species, Petal_Length, Petal_Width)
	# model_iris <- tidy_iris %>% ml_decision_tree (response="Species", features=c("Petal_Length","Petal_Width"))
	# test_iris <- tbl(sc,"spark_iris_test")
	# pred_iris <- sdf_predict(model_iris,  test_iris) %>%collect

	# prediction <- pred_iris$prediction
	# prediction <- data.frame(prediction)
	# colnames(prediction) <- "prediccion"

	resp = fromJSON(data)
	dataset = resp[[1]]$parametros[[1]][2]
	print(dataset)
	print(typeof(dataset))
	print("***resp****")
	typeof(resp)
	print(typeof(resp))
	print("***DATA****")
	typeof(data)
	print(typeof(data))

	# print("hola")
	print("***resp[1][1]****")
	print(resp[1][1])
	print("***resp[1][2]****")
	print(resp[1][2])

	return(toJSON(5+8))
}