# Setup Instruction

## Database

MySQL is used for this solution. To import database, please execute `./todo-mysql.sql` with MySQL Workbench. For other database, application.propertities and pom.xml shall be modified according to the configuration.

## CORS Issue

Add `@CrossOrigin(origins = "http://localhost:4200") ` in spring boot to accept requests. `Port 4200` is the default port of Angular. And, the port of react application is customized as 4200. 

Add `"Access-Control-Allow-Origin": "*"` into the hearders of axios.

## Others ?

... not found yet :-)