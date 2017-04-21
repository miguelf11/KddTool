require(RJSONIO)
library(sparklyr)
library(dplyr)
library(DBI)
library(ggplot2)
library(tidyr);


test <- function (data) {

	setwd("/home/vit/Restudio")
	resp = fromJSON(data)
	dataset = paste(resp[[1]]$parametros[[1]][2])
	json = toJSON(resp, pretty=TRUE)
	print(json)
	write(json, "test.json")
	
	return(toJSON(8+5))
} 