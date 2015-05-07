var mongod = require('mongodb');
var mongoClient = mongod.MongoClient;
var url = 'mongodb://192.168.1.2:27017/rectsdb';
var dbConnector = {};
dbConnector.insertDocuments = function(object,cb) {
	mongoClient.connect(url,function(err,db){
		if(err!=null) {
			console.log(err);
			console.log('error connecting to db');
            cb.call(this,['error connecting to db']);
		}
		else {
			var collection = db.collection('rects');
            console.log(object+" this is object");
            var typeOfObj = typeof(object);
            console.log(typeOfObj);
            if(typeOfObj == "string") {
                object = JSON.parse(object);
            }
			collection.insert(object,function(err,result){
				if(err!=null) {
					cb.call(this,['error in inserting'+err]);
				}	
				else {
					console.log('succesfully inserted the records and result is'+result);
					cb.call(this,['success']);
				}
				db.close();
				//mongoClient.close();			
			});
		}	
	});
};
dbConnector.findDocuments = function(cb) {
	mongoClient.connect(url,function(err,db){
		if(err != null) {
			console.log('error connecting to db');
		}
		else {
			var collection = db.collection('rects');
			collection.find({}).toArray(function(err,result){
				if(err != null) {
					console.log('error fetching data');
				}
				else {
					//console.log(result);
					cb.call(this,[result]);
					db.close();
					//mongoClient.close();
					//return result;
				}
			});
		}
	});
};
dbConnector.updateDocuments = function(criteria,obj,cb) {
	mongoClient.connect(url,function(err,db){
		if(err!=null) {
			
		}
		else {
			var collection = db.collection('rects');
			//console.log(param+" "+val);
			collection.update(criteria,{$set:obj},function(err,result){
				if(err!=null) {
					console.log('error in updating documents');
				}
				else {
					//console.log('successfully connected across servers');
					cb.call(this,[]);
					db.close();
					//mongoClient.close();
				}
			});
		}
	});
};
dbConnector.removeDocuments = function(criteria,cb) {
	mongoClient.remove(criteria,function(err,result){
		if(err!=null) {
			console.log(err);
		}
		else {
			console.log('successfully removed documents');
			cb.call(this,[]);
			db.close();
			//mc.close();
		}
	});
};
module.exports = dbConnector;
