const animeApp = {};

animeApp.sendInput = ()=>{
    document.querySelector("form").addEventListener( "submit", e => {
        e.preventDefault();
        const userInput = document.querySelector("input");
        const inputValue = userInput.value;
        animeApp.getAnimeData(inputValue);
    })
}

animeApp.getAnimeData = (userInput) => {
    const url = new URL(`https://api.jikan.moe/v4/anime`)
    url.search = new URLSearchParams({
        q: userInput.toString(),
        limit: 4,
    })
    fetch(url)
    .then((res) => res.json())
    .then((animeData) => {
        console.log(animeData);
        animeApp.displayElement(animeData.data);
    })
}

animeApp.displayElement = (dataObjectFromApi) => {

    dataObjectFromApi.forEach(anime => {
        // creating the li element
        const listElement = document.createElement('li')

        // li needs to have an h3 for title, and image
        // creating the title/h3
        const titleElement = document.createElement('h3');
        titleElement.innerText = anime.title;

        const imageElement = document.createElement('img');
        imageElement.src = anime.images.jpg.image_url;
        imageElement.alt =  `image of  ${anime.title}` ;

        // now need to append title and img to the li element
        listElement.appendChild(titleElement);
        listElement.appendChild(imageElement);

        // appending li elements to the ul
        document.querySelector('.results').appendChild(listElement);
    });
}

animeApp.init = ()=>{
    animeApp.sendInput();
    // animeApp.getInput();
};

animeApp.init();


