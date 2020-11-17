var databaseHandler = {
db: null,
createDatabase: function(){
    this.db = window.openDatabase(
        "ratings.db",
        "1.0",
        "rating database",
        1000000);
    this.db.transaction(
        function(tx){
            //Run sql here using tx
            tx.executeSql(
                "create table if not exists rating(_id integer primary key, name text, type text, date text , average integer, serviceRate text, cleanRate text, foodRate text , noterp text, namerp text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table: " + error.message);
                }
            );
        },
        function(error){
            console.log("Transaction error: " + error.message);
        },
        function(){
            console.log("Create DB transaction completed successfully");
        }
    );

}
}