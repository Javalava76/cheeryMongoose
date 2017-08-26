$(".btn-large").on("click", function () {
  console.log("it clicked");
  $(".headline").hide();
  getNews();
});


function getNews() {

  // Grab the news as a json
  $.getJSON("/news", function (data) {
    // For each one
    console.log(data);
    for (var i = 0; i < 21; i++) {
      // Display the apropos information on the page
      $("#news").append("<h4 data-id='" + data[i]._id + "'>" + data[i].title + "</h4>");
      $("#news").append("<p><b><a href= 'http:/'" + data[i].link + "'></b></p>http:/" + data[i].link + "<br><br>");
      $("#news").append('<a id="teal" class="btn-floating btn-medium waves-effect waves-light teal"><i class="material-icons">check</i></a>');
      $("#news").append('  ' + '  ');
      $("#news").append('<a class="btn-floating btn-medium waves-effect waves-light brown"><i class="material-icons">edit</i></a>');
      $("#news").append('<br><br>');

    }
  });
  console.log("grabbed news");
};



// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the#comments from the comment section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

})

;
// // $("#teal").on("click", function () {
// //   console.log("add button clicked");
// //   addComment();
// // });

// // function addComment() {

// //   $("#comments").empty();
// //   // Save the id from the p tag
// //   var thisId = $(this).attr("data-id");

  // Now make an ajax call for the News
  // $.ajax({
  //     method: "GET",
  //     url: "/news/" + thisId
  //   })
//     // With that done, add the comment information to the page
//     .done(function (data) {
//       console.log(data);
//       // The title of the news article
//       $("#comments").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#comments").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new comment body
//       $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new comment, with the id of the news article saved to it
//       $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

//       // If there's a comment in the news article
//       if (data.comment) {
//         // Place the title of the comment in the title input
//         $("#titleinput").val(data.comment.title);
//         // Place the body of the comment in the body textarea
//         $("#bodyinput").val(data.comment.body);
//       }
//     });


//   // When you click the savenote button
//   $(document).on("click", "#savecomment", function () {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");

//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//         method: "POST",
//         url: "/news/" + thisId,
//         data: {
//           // Value taken from title input
//           title: $("#titleinput").val(),
//           // Value taken from note textarea
//           body: $("#bodyinput").val()
//         }
//       })
//       // With that done
//       .done(function (data) {
//         // Log the response
//         console.log(data);
//         // Empty the#comments section
//         $("#comments").empty();
//       });

//     // Also, remove the values entered in the input and textarea for comment entry
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
//   });

// });