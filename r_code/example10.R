library(sparklyr)
library(dplyr)
library(ggplot2)
require(RJSONIO)

Sys.setenv("JAVA_HOME" = "/usr/local/jdk1.8.0_131")
Sys.setenv(HADOOP_HOME="/usr/local/hadoop")
Sys.setenv(SPARK_HOME="/usr/local/spark")


test <- function (data) {

	
	resp = fromJSON(data)
	Sys.setenv("JAVA_HOME" = "/usr/local/jdk1.8.0_131")
	Sys.setenv(HADOOP_HOME="/usr/local/hadoop")
	Sys.setenv(SPARK_HOME="/usr/local/spark")

	sc <- spark_connect(master = "local")
	print("hola2")
	ruta.base = "hdfs://127.0.1.1:40010"

	for(i in resp ) {

	  if(i$label == "datos") {
	    ruta = paste(i$parametros[[1]][2])
	    ruta = paste(ruta.base,ruta,sep="")
	    print(paste("ruta: ",ruta))
	    import_data <- spark_read_csv(sc, name = "data", path = ruta, header = TRUE)
	    print("chua")
	  }

	  if(i$label == "split"){
	    print("Iniciosplit")
	    testing = i$parametros[[1]][2]
	    training = i$parametros[[2]][2]
	    partition_data <- sdf_partition(import_data,training=0.5, testing=0.5)
	    sdf_register(partition_data, c("spark_data_training","spark_data_test"))
	    print("Finsplit")
	  }

	  if(i$label == "seleccionar") {
	    print("Inicioseleccion")
	    features.select = i$properties
	    tidy_data <- tbl(sc,"spark_data_training") %>% select(one_of(features.select))
	    print("Finseleccion")
	  }

	  if(i$label == "arbol de decision"){
	    print("InicioArbol")
	    features = i$properties
	    model_data <- tidy_data %>% ml_decision_tree (response="Species", features=features)
	    print("FinArbol")
	  }

	  if(i$label == "comparar"){
	    print("InicioComparar")
	    test_data <- tbl(sc,"spark_data_test")
	    pred_data <- sdf_predict(model_data,  test_data) %>%collect
	    prediction <- pred_data$prediction
	    prediction <- data.frame(prediction)
	    colnames(prediction) <- "prediccion"
	    print("FinComparar")
	  }

	  if(i$label == "visualizar"){
	    png(filename="testeo.png", width = 480, height = 480)
	    p <- pred_data %>% inner_join(data.frame(prediction=0:2, lab=model_data$model.parameters$labels)) %>% ggplot(aes(PetalLength, PetalWidth, col=lab)) +geom_point()
	    print(p)
	  }
	}
}