require(RJSONIO)

# recibir un json y devolver un json
sumTest <- function (input) {
  resp = fromJSON(input)
  resultado = resp$val[1]+resp$val[2]
  #return(toJSON(resp))
  print(toJSON(resultado))
  return(toJSON(resultado));
  #return(resultado)
  #return(resp$val[1]+resp$val[2]);
}
