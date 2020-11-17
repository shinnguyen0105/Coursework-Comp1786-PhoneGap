$(document).on("ready", function(){
    databaseHandler.createDatabase();
});

function addRating(){
    var name = $("#txtName").val();
    var type = $("#RestaurantType :radio:checked").val();
    var date = $("#date").val();
    var average = $("#txtAverage").val();
    var serviceRate = $("#ServiceRate :radio:checked").val();
    var cleanRate = $("#CleanRate :radio:checked").val();
    var foodRate = $("#FoodRate :radio:checked").val();
    var namerp = $("#txtNamerp").val();
    var noterp = $("#txtNotes").val();
    if(!name){
        alert("Name is required");
    } else if (!type){
        alert("Restaurant type is required");
    }
    else if (!date){
        alert("Date time is required");
    }
    else if (!average){
        alert("Average meal price per person is required");
    }
    else if (!serviceRate){
        alert("Service rating is required");
    }
    else if (!cleanRate){
        alert("Cleanliness rating is required");
    }
    else if (!foodRate){
        alert("Food quality rating is required");
    }
    else if (!namerp){
        alert("Name of reporter is required");
    }else{
        var r = confirm("Name: " + name + "\n" + "Restaurant Type: " + type  + "\n" + "Date time: " + date  + "\n" + "Average meal price per person: " + average + "\n" + "Service rating: " + serviceRate  + "\n" + "Cleanliness rating: " + cleanRate + "\n" + "Food quality rating: " + foodRate + "\n" + "Name of reporter: " + namerp + "\n" + "Notes: " + noterp);
        if(r==true){
            ratingHandler.addRating(name, type, date, average, serviceRate, cleanRate, foodRate, namerp, noterp);
            $("#txtName").val("");
            $("#RestaurantType").removeAttr('checked');
            $("#date").val("");
            $("#txtAverage").val("");
            $("#ServiceRate").removeAttr('checked');
            $("#CleanRate").removeAttr('checked');
            $("#FoodRate").removeAttr('checked');
            $("#txtNamerp").val("");
            $("#txtNotes").val("");
        }
    }
}

    var rateMessageState={
    id: -1,
    name: "",
    type: "",
    date: "",
    average: -1,
    serviceRate: "",
    cleanRate: "",
    foodRate: "",
    namerp: "",
    noterp: ""
    }

function average(data) {
    switch (data){
        case 'Need to improve':
            return 1;
        case 'OKAY':
            return 2;
        case 'Good':
            return 3;
        case 'Excellent':
            return 4;
    }
}

function displayListRating(results){
    var length = results.rows.length;
    var lstRatings = $("#lstRatings");
    lstRatings.empty();
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a href='#updatedialog' />");
        var h3 = $("<h3 />").text("Restaurant Name: ");
        var h41 = $("<h4 />").text("Restaurant Type: ");
        var h444 = $("<h4 />").text("Average rating: ");
        var h47 = $("<h4 />").text("Name of reporter: ");
        var p = $("<h2 />").text("Id: ");

        var averageRate = ((average(item.serviceRate) + average(item.cleanRate) + average(item.foodRate))/3).toFixed(2);
        var spanName = $("<span />").text(item.name);
        spanName.attr("name", "name");
        var spandType = $("<span />").text(item.type);
        spandType.attr("name", "type");
        var spandAverageRate = $("<span />").text(averageRate);
        var spandNamerp = $("<span />").text(item.namerp);
        spandNamerp.attr("name", "namerp");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");

        h3.append(spanName);
        h41.append(spandType);
        h444.append(spandAverageRate)
        h47.append(spandNamerp);
        p.append(spanId);

        a.append(p);
        a.append(h3);
        a.append(h41);
        a.append(h444);
        a.append(h47);
        
        var li = $("<li/>");
        li.attr("data-filtertext", item.type);
        li.append(a);
        lstRatings.append(li);
    }
    lstRatings.listview("refresh");
    lstRatings.on("tap", "li", function(){
        rateMessageState.id = $(this).find("[name='_id']").text();

        ratingHandler.loadRatingDetail(rateMessageState.id , displayDetailRating);
    });
}

function displayDetailRating(results) {
    console.log(results);
    rateMessageState.name = results.rows[0].name;
    rateMessageState.namerp = results.rows[0].namerp;
    $("#txtNameU").text(results.rows[0].name).val();
    $("#txtTypeU").text(results.rows[0].type).val();
    $("#txtdateU").text(results.rows[0].date).val();
    $("#txtAverageU").text(results.rows[0].average).val();
    var averageRate = ((average(results.rows[0].serviceRate) + average(results.rows[0].cleanRate) + average(results.rows[0].foodRate))/3).toFixed(2);
    $("#txtAverageRatingU").text(averageRate).val();
    $("#txtServiceU").text(results.rows[0].serviceRate).val();
    $("#txtCleanlinessU").text(results.rows[0].cleanRate).val();
    $("#txtFoodU").text(results.rows[0].foodRate).val();
    $("#txtNamerpU").text(results.rows[0].namerp).val();
    $("#txtNewNotes").val(results.rows[0].noterp);
    //  rateMessageState.date = results.rows[0].date;
    //  rateMessageState.noterp = results.rows[0].noterp;
}

$(document).on("pagebeforeshow", "#listrate", function(){
    ratingHandler.loadRating(displayListRating);
});
function deleteRating(){
    var r = confirm("Delete Rating\nName: "+ rateMessageState.name +
                    "\nName of Reporter: " +  rateMessageState.namerp);
    if(r==true){
        ratingHandler.deleteRating(rateMessageState.id);
        ratingHandler.loadRating(displayListRating);
    }
    window.history.back();
}
// $(document).on("pagebeforeshow", "#updatedialog", function(){
//     $("#txtNewName").val(rateMessageState.name);
//     $("#txtNewNotes").val(rateMessageState.noterp);

// });
function updateNoteRating(){
    var newNoterp = $("#txtNewNotes").val();
    ratingHandler.updateNoteRating(rateMessageState.id, newNoterp );
    window.history.back();
}