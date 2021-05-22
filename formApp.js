const $form = $('form[name=search-songs]');

$form.submit(function (e, theForm) {
    e.preventDefault();
    const $input = $('input[type=text]', theForm);
    const searchTerm = encodeURIComponent($input.val());
    // alert(searchTerm);
    const url = ` https://itunes.apple.com/search?term=${searchTerm}&limit=10`;

    fetch(url)
        .then(function (resp) {
            // console.log(resp);
            return resp.json();
        })
        .then(function (songData) {
            console.log(songData)
            // const html = buildList(songData.results);
            $('#results ul').html(buildList(songData.results));

        })
        .catch(function (err) {
            alert("Error Occured!");
        })
});

function buildList(songs) {
    let rv = '';
    for (let i = 0; i < songs.length; i++) {
        const item = songs[i];
        rv += `
        <li class="song">
            ${item.artistName} - ${item.collectionName}
            <a href="${item.trackViewUrl}" target="_blank" ><img alt="Play" src="${item.artworkUrl30}"
            width=30" height="30"></a>
        </li>
        `
    }
    return rv;
}