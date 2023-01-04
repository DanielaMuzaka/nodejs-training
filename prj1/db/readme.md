#  Would be  better to have a usecase using H2 in memory db

Sequalize cannot use it. 

https://stackabuse.com/integrating-h2-with-node-express/

java -cp ./db/h2-2.1.214.jar org.h2.tools.Server -tcp -tcpAllowOthers -tcpPort 5234 -baseDir ./ -ifNotExists