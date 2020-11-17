var ratingHandler={
    addRating: function(name, type, date, average, serviceRate, cleanRate, foodRate, namerp, noterp){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "insert into rating(name, type, date, average, serviceRate, cleanRate, foodRate, namerp, noterp) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, type, date, average, serviceRate, cleanRate, foodRate, namerp, noterp ],
                function(tx, results){},
                function(tx, error){
                    console.log("add rating error: " + error.message);
                }
            );
        },
        function(error){},
        function(){}
    );
},
loadRating: function(displayListRating){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from rating",
                [],
                function(tx, results){
                    //Do the display
                    displayListRating(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the ratings" + error.message);
                }
            );
        }
    );
},
loadRatingDetail: function(_id , displayDetailRating){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from rating where _id=?",
                [_id],
                function(tx, results){
                    //Do the display
                    displayDetailRating(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the ratings" + error.message);
                }
            );
        }
    );
},
deleteRating:function(_id){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "delete from rating where _id = ?",
                [_id],
                function(tx, results){},
                function(tx, error){//TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                }
            );
        }
    );
},
updateNoteRating: function(_id, newNoterp){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "update rating set noterp=? where _id = ?",
                [ newNoterp , _id],
                function(tx, result){},
                function(tx, error){//TODO: alert/display this message to user
                    console.log("Error updating rating" + error.message);
                }
            );
        }
    );
}
};