var heroku_url = "https://movies-archive-app.herokuapp.com";

var loadMovie = function () 
{
  fetch(heroku_url + "/movies", { 

    credentials: 'include'
  }).then(function (response) 
  {

  if( response.status == 200){

    var insertdiv = document.querySelector("#insert_div");
    insertdiv.style.display = "none";
    var regdisplay = document.querySelector("#register_div");
    regdisplay.style.display = "none";
    var regdisplay = document.querySelector("#login_div");
    regdisplay.style.display = "none";
    var redisplay = document.querySelector("#edit_div");
    redisplay.style.display = "none";
    var itemlist = document.querySelector("#MovieList");
    itemlist.style.display = "block";
    var itemlist = document.querySelector("#history");
    itemlist.style.display = "block";
    var regdisplay = document.querySelector("#home");
    regdisplay.style.display = "none";
    displaynewmovielist.style.display = "block";
    signupsigninbutton.style.display = "none";

  }else{
    var itemlist = document.querySelector("#MovieList");
    itemlist.style.display = "none";
    return;
  }

  
    response.json().then(function (data) 
    {
      console.log("data received from server:", data);

      
      var historylist = document.querySelector("#history");
      historylist.innerHTML = "";

      data.forEach(function (movie) 
      {

        var newItem = document.createElement("li");
        
        /*var titleheading = document.createElement("h2");
        titleheading.innerHTML = movie.title;
        newItem.appendChild(titleheading);
        */

        var titleheading = document.createElement("h3");
        titleheading.innerHTML = "Title"+ "  " + "Description" +  " " + "Rating" +  " " + "Genre" +  "  " + "Country";
        newItem.appendChild(titleheading);

        var movieDiv = document.createElement("p");  
        movieDiv.innerHTML = movie.title +  "      -    " + movie.description + "       -       " + movie.rating + "     -    " + movie.genre + "     -     " + movie.country;
        newItem.appendChild(movieDiv); 

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";

        deleteButton.onclick = function()
        {

          console.log("Delete Button Clicked", movie.id);
          if(confirm("Are you sure you want to delete " + movie.title + " ? "))
          {
            deleteMovieEvent(movie.id);
          };

        };

        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.onclick = function()
        {
          console.log("Edit Button Clicked", movie.id);
          updateMovieEvent(movie.id,movie.description,movie.title,movie.rating,movie.genre,movie.country);

          

          var redisplay = document.querySelector("#edit_div");
          redisplay.style.display = "block";
          var insertdisplay = document.querySelector("#insert_div");
          insertdisplay.style.display = "none";
          var itemlist = document.querySelector("#MovieList");
          itemlist.style.display = "none";
          
          
          displaynewmovielist.style.display = "none";
         
        }
          newItem.appendChild(deleteButton);
          newItem.appendChild(updateButton);
          historylist.appendChild(newItem); 
      });
    });
  });
}


var deleteMovieEvent = function(movieid)
{

  fetch(heroku_url + "/movies/" + movieid, 
  {

    method: "DELETE",
    credentials: "include"

  }).then(function(){

    loadMovie();

  })

};





var addButton = document.querySelector("#Add");
addButton.onclick = function () {

  var newMovieEventGenre = document.querySelector("#genre_field").value;
  var newMovieEventTitle = document.querySelector("#title_field").value;
  var newMovieEventDescription = document.querySelector("#description_field").value;
  var newMovieEventRating = document.querySelector("#rating_field").value;
  var newMovieEventCountry = document.querySelector("#country_field").value;
 

  var bodyStr = "genre=" + encodeURIComponent(newMovieEventGenre);
  bodyStr += "&title=" + encodeURIComponent(newMovieEventTitle);
  bodyStr += "&description=" + encodeURIComponent(newMovieEventDescription);
  bodyStr += "&rating=" + encodeURIComponent(newMovieEventRating);
  bodyStr += "&country=" + encodeURIComponent(newMovieEventCountry);
  
  clearInputInsert();

  fetch(heroku_url + "/movies", {
    //request parameters:
    method: "POST",
    credentials: 'include',
    body: bodyStr,
    headers: {

      "Content-Type": "application/x-www-form-urlencoded"

    } // this is a dictionary

  }).then(function (response) {
    // handle the response
    console.log("Server responded")
    
    loadMovie()

  });

  var insertdiv = document.querySelector("#insert_div");
  insertdiv.style.display = "none";
  displaynewmovielist.style.display = "block";
  var itemlist = document.querySelector("#MovieList");
  itemlist.style.display = "block";
  
};



var updateMovieEvent = function (movieid,rating,title,description,genre,country) {

  document.querySelector("#edit_genre_field").value = genre;
  document.querySelector("#edit_title_field").value = title;
  document.querySelector("#edit_description_field").value  = description;
  document.querySelector("#edit_rating_field").value = rating;
  document.querySelector("#edit_country_field").value = country;
  

  var saveButton = document.querySelector("#Save");
  saveButton.onclick = function(){

    var newMovieEventGenre = document.querySelector("#edit_genre_field").value;
    var newMovieEventTitle = document.querySelector("#edit_title_field").value;
    var newMovieEventDescription = document.querySelector("#edit_description_field").value;
    var newMovieEventRating = document.querySelector("#edit_rating_field").value;
    var newMovieEventCountry = document.querySelector("#edit_country_field").value;
    

    clearInputUpdate();
    

    console.log(movieid, "was clicked")
    var bodyStr = "genre=" + encodeURIComponent(newMovieEventGenre);
    bodyStr += "&title=" + encodeURIComponent(newMovieEventTitle);
    bodyStr += "&description=" + encodeURIComponent(newMovieEventDescription);
    bodyStr += "&rating=" + encodeURIComponent(newMovieEventRating);
    bodyStr += "&country=" + encodeURIComponent(newMovieEventCountry);
    

    fetch(heroku_url + "/movies/" + movieid ,{
      //request parameters:
      method: "PUT",
      credentials: 'include',
      body: bodyStr,
      headers: {

        "Content-Type": "application/x-www-form-urlencoded"

      } // this is a dictionary

    }).then(function (response) {
      // handle the response
      loadMovie()
      console.log("Server responded")

    });


    var insert_div_container = document.querySelector("#insert_div");
    insert_div_container.style.display = "none";
    var edit_div_container = document.querySelector("#edit_div");
    edit_div_container.style.display = "none";
    var itemlist = document.querySelector("#MovieList");
    itemlist.style.display = "block";
    displaynewmovielist.style.display = "block";
  
  };
};



var displaynewmovielist = document.querySelector("#Add_movie");
  displaynewmovielist.onclick = function (){
    var insert_div_container = document.querySelector("#insert_div");
    insert_div_container.style.display = "block";
    displaynewmovielist.style.display = "block";
    var itemlist = document.querySelector("#MovieList");
    itemlist.style.display = "none";

}

var displayinsertmovielist = document.querySelector("#Back1");
  displayinsertmovielist.onclick = function (){
    var itemlist = document.querySelector("#MovieList");
    itemlist.style.display = "block";
    var insert_div_container = document.querySelector("#insert_div");
    insert_div_container.style.display = "none";
    var movielistbutton = document.querySelector("#Add_movie");
    movielistbutton.style.display = "block";

}

var displayedmovielist = document.querySelector("#Back2");
  displayedmovielist.onclick = function (){
    var itemlist = document.querySelector("#MovieList");
    itemlist.style.display = "block";
    var edit_div_container = document.querySelector("#edit_div");
    edit_div_container.style.display = "none";
    var movielistbutton = document.querySelector("#Add_movie");
    movielistbutton.style.display = "block";

}

var signupsigninbutton = document.querySelector("#signupsignin");
signupsigninbutton.onclick = function()
{

  var regdisplay = document.querySelector("#register_div");
  regdisplay.style.display = "block";
  var regdisplay = document.querySelector("#login_div");
  regdisplay.style.display = "block";
  var regdisplay = document.querySelector("#home");
  regdisplay.style.display = "none";
  var redisplay = document.querySelector("#edit_div");
  redisplay.style.display = "none";
  var insertdisplay = document.querySelector("#insert_div");
  insertdisplay.style.display = "none";
  var itemlist = document.querySelector("#MovieList");
  itemlist.style.display = "none";
  displaynewmovielist.style.display = "none";

};

var cancelbutton = document.querySelector("#cancelbutton");
cancelbutton.onclick = function()
{


  document.querySelector("#reg_email_field").value = "";
  document.querySelector("#fname_field").value = "";
  document.querySelector("#lname_field").value = "";
  document.querySelector("#reg_password").value = "";


  var regdisplay = document.querySelector("#register_div");
  regdisplay.style.display = "none";
  var redisplay = document.querySelector("#edit_div");
  redisplay.style.display = "none";
  var insertdisplay = document.querySelector("#insert_div");
  insertdisplay.style.display = "block";
  var itemlist = document.querySelector("#MovieList");
  itemlist.style.display = "none";
  displaynewmovielist.style.display = "none";
  var homedisplay = document.querySelector("#login_div");
  homedisplay.style.display = "none"
  var homedisplay = document.querySelector("#home");
  homedisplay.style.display = "block";

};

var cancelbutton2 = document.querySelector("#logincancelbutton");
cancelbutton2.onclick = function()
{


  document.querySelector("#login_email_field").value = "";
  document.querySelector("#login_password").value = "";


  var regdisplay = document.querySelector("#register_div");
  regdisplay.style.display = "none";
  var redisplay = document.querySelector("#edit_div");
  redisplay.style.display = "none";
  var insertdisplay = document.querySelector("#insert_div");
  insertdisplay.style.display = "block";
  var itemlist = document.querySelector("#MovieList");
  itemlist.style.display = "none";
  displaynewmovielist.style.display = "none";
  var homedisplay = document.querySelector("#login_div");
  homedisplay.style.display = "none"
  var homedisplay = document.querySelector("#home");
  homedisplay.style.display = "block";

};

var registerButton = document.querySelector("#registerbutton");
registerButton.onclick = function () {


  var newemail = document.querySelector("#reg_email_field").value;
  var newfname = document.querySelector("#fname_field").value;
  var newlname = document.querySelector("#lname_field").value;
  var newhaspasword = document.querySelector("#reg_password").value;


  var bodyStr = "email=" + encodeURIComponent(newemail);
  bodyStr += "&fname=" + encodeURIComponent(newfname);
  bodyStr += "&lname=" + encodeURIComponent(newlname);
  bodyStr += "&password=" + encodeURIComponent(newhaspasword);

  document.querySelector("#reg_email_field").value = "";
  document.querySelector("#fname_field").value = "";
  document.querySelector("#lname_field").value = "";
  document.querySelector("#reg_password").value = "";


fetch(heroku_url + "/users", {
    //request parameters:
    method: "POST",
    credentials:"include",
    body: bodyStr,
    headers: {

      "Content-Type": "application/x-www-form-urlencoded"

    } // this is a dictionary

  }).then(function (response) {
    
    if (response.status == 201){
      alert("You have successfully registered.")
      loadMovie()
      var signinbutton = document.queryElement("#signinsignup");
      signinbutton.style.display = "none";
      var insertdiv = document.querySelector("#insert_div");
      insertdiv.style.display = "block";
      var regdisplay = document.querySelector("#register_div");
      regdisplay.style.display = "none";
      var regdisplay = document.querySelector("#login_div");
      regdisplay.style.display = "none";
      var redisplay = document.querySelector("#edit_div");
      redisplay.style.display = "none";
      var regdisplay = document.querySelector("#home");
      regdisplay.style.display = "block";
      var itemlist = document.querySelector("#MovieList");
      itemlist.style.display = "block";
      var itemlist = document.querySelector("#history");
      itemlist.style.display = "block";
      displaynewmovielist.style.display = "block";
      
    }else if(response.status == 422){
      alert("Email already exists. Use different email.")
      var insertdiv = document.querySelector("#insert_div");
      insertdiv.style.display = "none";
      var regdisplay = document.querySelector("#register_div");
      regdisplay.style.display = "block";
      var regdisplay = document.querySelector("#login_div");
      regdisplay.style.display = "block";
      var redisplay = document.querySelector("#edit_div");
      redisplay.style.display = "none";
      var itemlist = document.querySelector("#MovieList");
      itemlist.style.display = "none";
      var itemlist = document.querySelector("#history");
      itemlist.style.display = "none";
      displaynewmovielist.style.display = "none";
      signupsigninbutton.style.display = "none";
    }
else{
      alert("Unknown error.. Something went wrong.")
    }

  });

};

var loginButton = document.querySelector("#loginbutton");
loginButton.onclick = function (Email) {

  var newemail = document.querySelector("#login_email_field").value;
  var newhaspasword = document.querySelector("#login_password").value;

  var bodyStr = "email=" + encodeURIComponent(newemail);
  bodyStr += "&password=" + encodeURIComponent(newhaspasword);

  document.querySelector("#login_email_field").value = "";
  document.querySelector("#login_password").value = "";

  fetch(heroku_url + "/sessions", {
    //request parameters:
    method: "POST",
    credentials:"include",
    body: bodyStr,
    headers: {

      "Content-Type": "application/x-www-form-urlencoded"

    } // this is a dictionary

  }).then(function (response) {
    
    if (response.status == 201){
      alert("You have successfully logged in.")
      loadMovie()
      //var signinbutton = document.querySelector("#signinsignup");
      //signinbutton.style.display = "none";
      var insertdiv = document.querySelector("#insert_div");
      insertdiv.style.display = "block";
      var regdisplay = document.querySelector("#register_div");
      regdisplay.style.display = "none";
      var regdisplay = document.querySelector("#login_div");
      regdisplay.style.display = "none";
      var redisplay = document.querySelector("#edit_div");
      redisplay.style.display = "none";
      var itemlist = document.querySelector("#MovieList");
      itemlist.style.display = "block";
      var itemlist = document.querySelector("#history");
      itemlist.style.display = "none";
      displaynewmovielist.style.display = "block";
      
    }else if(response.status == 422){ //this status code message could be wrong
      alert("The email or password is incorrect please try again!") //add these messages to the dom preferably 
      var insertdiv = document.querySelector("#insert_div");
      insertdiv.style.display = "none";
      var regdisplay = document.querySelector("#register_div");
      regdisplay.style.display = "block";
      var regdisplay = document.querySelector("#login_div");
      regdisplay.style.display = "block";
      var redisplay = document.querySelector("#edit_div");
      redisplay.style.display = "none";
      var itemlist = document.querySelector("#MovieList");
      itemlist.style.display = "none";
      var itemlist = document.querySelector("#history");
      itemlist.style.display = "none";
      displaynewmovielist.style.display = "none";

    }
    else{
      alert("Error - Please try again!")
    }

  });

};    

var insertdiv = document.querySelector("#insert_div");
insertdiv.style.display = "none";
var regdisplay = document.querySelector("#register_div");
regdisplay.style.display = "none";
var regdisplay = document.querySelector("#login_div");
regdisplay.style.display = "none";
var redisplay = document.querySelector("#edit_div");
redisplay.style.display = "none";
var itemlist = document.querySelector("#MovieList");
itemlist.style.display = "none";
var itemlist = document.querySelector("#history");
itemlist.style.display = "none";
displaynewmovielist.style.display = "none";




var clearInputInsert = function(){

  document.querySelector("#genre_field").value = "";
  document.querySelector("#title_field").value = "";
  document.querySelector("#description_field").value  = "";
  document.querySelector("#rating_field").value = "";
  document.querySelector("#country_field").value = " ";
  
}

var clearInputUpdate = function(){

  document.querySelector("#genre_field").value = "";
  document.querySelector("#title_field").value = "";
  document.querySelector("#description_field").value  = "";
  document.querySelector("#rating_field").value = "";
  document.querySelector("#country_field").value = " ";
  

}

loadMovie();