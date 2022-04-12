const animeApp = {};

const animeApp_errorMessage = "It appears that the API can not handle that request at this moment. Please check your spelling or try another term."

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
        q: userInput.trim().toString(),
        // Temporary workaround to show the most relevant anime titles as of April 2022. Reason: order_by: "popularity" is not accurate.
        // order_by: "poplarity",
        // order_by: "favorites",
        order_by: "rank",
        sort: "asc",
        // Remove NSFW materials Note: sfw param not working w/ q
        genres_exclude: 12,
        limit: 12,
    })
    fetch(url)
    .then((res) => {
        // error handling for fetch response
            if (!res.ok) {
                throw new Error(`Request error. Status: ${res.status}`);
            } else {
                return res.json();
            }
        })
    .then((animeData) => {
        // console.log(animeData);
        if (animeData.data.length > 0) {
        animeApp.displayElement(animeData.data);
        animeApp.animeInfo();
        // addSpacer() needs to be add at the bottom
        animeApp.addSpacer();
        } else {
            // error handling for API query shortcoming
            animeApp.errorDisplay();
            throw new Error("The API can't query this result. Note: Jika V4 is having trouble with certain English names and loose words are not indexed. Current issue: https://github.com/jikan-me/jikan-rest/issues/189");
        }
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

        // creating the plot element = hidden 
        const plotElement = document.createElement('p')
        plotElement.innerText = anime.synopsis;
        plotElement.classList.add('hidePlot');

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
        buttonElement.appendChild(plotElement);

        // appending a element to the list element
        listElement.appendChild(buttonElement);
        listElement.classList.add('showMe');

        // appending li elements to the ul
        document.querySelector('.results').appendChild(listElement);
    });
}

animeApp.errorDisplay = ()=>{
    const resultElement = document.querySelector(".results");
    resultElement.innerHTML = "";
    const errorMsgElement = document.createElement('p')
    errorMsgElement.innerText = animeApp_errorMessage;
    document.querySelector('.results').appendChild(errorMsgElement);
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
    const selectedResult = document.querySelectorAll('.showMe');
    
    selectedResult.forEach(listItem => {
        listItem.addEventListener('click', function(event) {
            event.preventDefault();
            // this returns the entire list element that got clicked
            const selectedItem = this;
            // console.log(selectedItem);

            // for each to hide all the elements
            selectedResult.forEach(li => {
                li.classList.toggle('hideMe')
                li.classList.toggle('showMe')
            })

            // then we turn on the one that got clicked agian
            selectedItem.classList.toggle('hideMe')
            selectedItem.classList.toggle('showMe')

            selectedItem.firstChild.children.item(2).classList.toggle('hidePlot');
            selectedItem.firstChild.children.item(2).classList.toggle('showPlot');
        })
    })   
}

animeApp.toggleTheme = ()=>{
    const toggleElement = document.querySelector(".themeToggle");
    toggleElement.addEventListener("click", (e)=>{
        document.body.classList.toggle("darkTheme");
    })
}

animeApp.init = ()=>{
    animeApp.sendInput();
    animeApp.toggleTheme();
};

animeApp.init();


