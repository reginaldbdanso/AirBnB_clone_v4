$(document).ready(function () {
    const amenities = {};
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        const amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: '{}',
        success: function (data) {
            $.each(data, function (index, place) {
                const article = $('<article>');
                const title = $('<div class="title">').append($('<h2>').text(place.name));
                const price = $('<div class="price_by_night">').text('$' + place.price_by_night);
                const info = $('<div class="information">').append($('<div class="max_guest">').append($('<i class="fa fa-users fa-3x" aria-hidden="true"></i>')).append($('<br>')).append(place.max_guest + ' Guests')).append($('<div class="number_rooms">').append($('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>')).append($('<br>')).append(place.number_rooms + ' Bedrooms')).append($('<div class="number_bathrooms">').append($('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>')).append($('<br>')).append(place.number_bathrooms + ' Bathroom'));
                const description = $('<div class="description">').text(place.description);
                article.append(title).append(price).append(info).append(description);
                $('section.places').append(article);
            });
        }
    });
});
