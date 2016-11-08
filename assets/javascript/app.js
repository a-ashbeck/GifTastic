$(document).ready(function() {
    // Array that holds topics to be searched via buttons
    var topics = [
        'Skwisgaar Skwigelf', 'Guitars', 'Abbath', 'Bunnies',
        'GOBLINS', 'Exactly 100 beers', 'SO MANY CHICKENS',
        'All of the unicorns in the galazy', 'YOU DON\'T KNOW ME!',
        'This is the end.'
    ];

    // This function empties the buttons div, and then populates
    // it with newly created buttons from the topics array
    function generateButtons(){
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++){
            var button = $('<button>');
            button.addClass('gif-button');
            button.attr('data-topic', topics[i]);
            button.text(topics[i]);
            $('#buttons').append(button);
        }
    }

    // Function that pulls data from giphy API once a topic button is clicked
    $(document).on('click', '.gif-button', function() {
        // Variables needed for API interaction
        var searchQ = $(this).data('topic');
        var limit = 10;
        var apiKey = 'dc6zaTOxFJmzC';
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
                        searchQ + '&api_key=' + apiKey + '&limit=' + limit;

        // Empties the previously loaded gifs
        $('#gifs').empty();

        // AJAX call function
        $.ajax({
                url: queryURL,
                method: 'GET'
        }).done(function(response) {
            var results = response.data;

            // For loop to take JSON data and generate HTML to display gifs
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="gif-div">')
                var rating = results[i].rating;
                var paragraph = $('<p>').text('Rating: ' + rating);
                var image = $('<img class="gif">');
                var gifUrl = results[i].images.fixed_height.url;

                // These set the attributes of the images in order to handle
                // pause and animate functionality for click events
                image.attr('src', gifUrl.replace('.gif', '_s.gif'));
                image.attr('data-still', gifUrl.replace('.gif', '_s.gif'));
                image.attr('data-animate', gifUrl.replace('_s.gif', '.gif'));
                image.attr('data-state', 'still');

                // These append the rating and image to the .gif-div
                gifDiv.append(paragraph);
                gifDiv.append(image);

                // Appends the dynamically generated .gif-divs to the div
                // that contains them all.
                $('#gifs').prepend(gifDiv);
            }
        });
    });

    // This allows text entered into the text field to be turned into a
    // search button once the submit button is clicked.
    $('#add-gif').on('click', function(){
        var gifSearch = $('#gif-search').val().trim();

        // Adds the new topic to the topics array
        topics.push(gifSearch);
        // Resets the text entered in the text field
        $('#add-gif-form')[0].reset();
        // Regenerates the buttons on the DOM
        generateButtons();
        return false;
    });

    // This handles the toggling of paused and animated gifs.
    $(document).on('click', '.gif', function() {
        var state = $(this).attr('data-state');
        
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

    // Generates the initial buttons on the DOM
    generateButtons();
});