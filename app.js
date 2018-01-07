$(document).ready(function() {
    $("input[type=search]").keyup(function(event) {
        if (event.which == 27) {
            $(this).val('');
        }
        if ($(this).val() != "" && event.which === 13) {
            getWikiApi();
        }
    });

    // autocomplete Search
    /*  $("#searchInput").autocomplete({
         source: function(request, response) {
             $.ajax({
                 url: "http://en.wikipedia.org/w/api.php",
                 dataType: "jsonp",
                 data: {
                     'action': "opensearch",
                     'format': "json",
                     'formatversion': "2",
                     'search': request.term,
                     'namespace': "0",
                     'limit': "10",
                     'suggest': "true"
                 },
                 success: function(data) {
                     response(data[1]);
                 }
             });
         }
     }); */
    // End of autocomplete search

    // OnClick listner
    $("#searchbtn").on("click", function() {
        getWikiApi();

    }); // End OnClick

    // Close Button section
    $("#closeStyle").on("click", function() {
            $(function() {
                $('#hide').addClass('hidden');
            });
            $('.showing').show('slow');
            $("#searchInput").val('');
            $("#outputresult").empty();
            $('.footer').show('slow');
            $('.logo').show('slow');
        }) // Close of button section
}); // End of document ready


// Get wikipedia search
function getWikiApi() {
    $(function() {
        $('#hide').removeClass('hidden');
    });
    // Show and Hide section
    showHide();
    // Put the value to the variable
    var searchInput = $("#searchInput").val();
    // showing recent search
    $('#search-hint').html(searchInput);
    // wikipedia url
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&limit=20&namespace=0&format=json";
    if (searchInput === "") {
        alert("Please Enter your search");
    }
    $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                console.log(data);
                $("#outputresult").empty();
                $('.footer').hide('slow');
                for (var i = 0; i < data[1].length; i++) {
                    $("#outputresult").prepend("<div class='well'><h1 align='center'><a href=" + data[3][i] + " target='_blank'>" + data[1][i] + "</a></h1><p>" + data[2][i] + "</p></div>");
                }
            }
        })
        .fail(function(e) {
            console.log("error", e);
        })
} // End of wikipedia search


// Hide and show function
function showHide() {
    $('.showing').hide('slow');
    $('.hidden').show('slow');
    $('.logo').hide('slow');
}

// Style function
function styleCss() {
    // Change logo place
    $('.logo').css({
        top: '7%',
        right: '83%',
        position: 'absolute'
    });
    // Fonction exécutée au redimensionnement
    function redimensionnement() {
        if ("matchMedia" in window) { // Détection
            if (window.matchMedia("(min-width:768px)").matches) {
                // $('.logo').css({
                //   'font-size': '2.5em',
                // });
            } else {

            }
        }
    }
    // On lie l'événement resize à la fonction
    window.addEventListener('resize', redimensionnement, false);
}