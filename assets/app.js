var topics = [
    'Skwisgaar Skwigelf', 'Guitars', 'Abbath', 'Bunnies',
    'GOBLINS', 'Exactly 100 beers', 'SO MANY CHICKENS',
    'All of the unicorns in the galazy', 'YOU DON\'T KNOW ME!',
    'This is the end.'
];

function generateInitialButtons(){
    $('#buttons').empty();

    for (var i = 0; i < topics.length; i++){
        var button = $('<button>');
        button.addClass('gif-button');
        button.attr('data-topic', topics[i]);
        button.text(topics[i]);
        $('#buttons').append(button);
    }
}

$(document).ready(function() {
    $(document).on('click', '.gif-button', function() {
        var searchTopic = $(this).data('topic');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $('#gifs').empty();

        $.ajax({
                url: queryURL,
                method: 'GET'
        }).done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="gif-div">')
                var rating = results[i].rating;
                var paragraph = $('<p>').text("Rating: " + rating);
                var image = $('<img class="gif">');
                var gifUrl = results[i].images.fixed_height.url;

                image.attr('src', gifUrl.replace('.gif', '_s.gif'));
                image.attr('data-still', gifUrl.replace('.gif', '_s.gif'));
                image.attr('data-animate', gifUrl.replace('_s.gif', '.gif'));
                image.attr('data-state', 'still');

                gifDiv.append(paragraph);
                gifDiv.append(image);

                $('#gifs').prepend(gifDiv);
            }
        });
    });

    $('#add-gif').on('click', function(){
        var gifSearch = $('#gif-search').val().trim();

        topics.push(gifSearch);
        $('#add-gif-form')[0].reset();
        generateInitialButtons();
        return false;
    });

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

    generateInitialButtons();
});