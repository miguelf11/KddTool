require(RJSONIO)
library(sparklyr)
library(dplyr)
library(DBI)
library(ggplot2)
library(tidyr);


test <- function (data) {

	resp = fromJSON(data)
	dataset = paste(resp[[1]]$parametros[[1]][2])
	sc <- spark_connect(master = "local",spark_home = '/usr/local/spark/')
	import_iris <- spark_read_csv(sc, name = "iris", path = dataset, header = TRUE)

	partition_iris <- sdf_partition(import_iris,training=0.5, testing=0.5) 
	sdf_register(partition_iris, c("spark_iris_training","spark_iris_test"))

	tidy_iris <- tbl(sc,"spark_iris_training") %>% select(Species, Petal_Length, Petal_Width)

	model_iris <- tidy_iris %>% ml_decision_tree (response="Species", features=c("Petal_Length","Petal_Width"))

	test_iris <- tbl(sc,"spark_iris_test")

	pred_iris <- sdf_predict(model_iris,  test_iris) %>%collect
	prediction <- pred_iris$prediction

	prediction <- data.frame(prediction)
	colnames(prediction) <- "prediccion"
	toJSON(prediction)

	pred_iris %>% inner_join(data.frame(prediction=0:2, lab=model_iris$model.parameters$labels)) %>% ggplot(aes(Petal_Length, Petal_Width, col=lab)) +geom_point()
	a = filter(iris, Petal.Length > 0.5)
	
	return(toJSON(a))
}