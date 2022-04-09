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
        letter: userInput.trim().toString(),
        // q doesn't work with order_by or sort
        order_by: "popularity",
        sort: "asc",
        // Remove NSFW materials Note: sfw param not working w/ q
        genres_exclude: 12,
        limit: 12,
    })
    fetch(url)
    .then((res) => res.json())
    .then((animeData) => {
        console.log(animeData);
        animeApp.displayElement(animeData.data);
        animeApp.animeInfo();
        // addSpacer() needs to be add at the bottom
        animeApp.addSpacer();
    })
}

animeApp.displayElement = (dataObjectFromApi) => {
    // Reseting the result at each new entry
    const resultElement = document.querySelector(".results");
    resultElement.innerHTML = "";

    dataObjectFromApi.forEach(anime => {
        // creating the li element
        const listElement = document.createElement('li')

        // creating the a element so we can toggle classes 
        const buttonElement = document.createElement('button');

        // li needs to have an h3 for title, and image
        // creating the title/h3
        const titleElement = document.createElement('h3');
        titleElement.innerText = anime.title;

        const imageElement = document.createElement('img');
        imageElement.src = anime.images.jpg.image_url;
        imageElement.alt =  `image of  ${anime.title}`;

        // now need to append title and img to the a element
        buttonElement.appendChild(titleElement);
        buttonElement.appendChild(imageElement);

        // appending a element to the list element
        listElement.appendChild(buttonElement);
        listElement.classList.add('showMe');

        // appending li elements to the ul
        document.querySelector('.results').appendChild(listElement);
    });
}

// Add a spacer to provide a height foot print to seperate the result section from the footer section
animeApp.addSpacer = ()=>{
    const spacerElement = document.createElement('div');
    spacerElement.classList.add("spacer");
    document.querySelector(".results").appendChild(spacerElement);
}

animeApp.animeInfo = () => {

    // add and event listern to the clicked element
    // remove all the results from the page
    // append to the selected result the anime plot
    console.log("i am from the anime info");

    const selectedResult = document.querySelectorAll('.showMe');
    
    selectedResult.forEach(listItem => {
        listItem.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("i got clicked!");
    })
    })

    
}

animeApp.init = ()=>{
    animeApp.sendInput();
};

animeApp.init();


