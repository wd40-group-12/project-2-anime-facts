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
        // console.log(animeData);
    })
}

animeApp.init = ()=>{
    animeApp.sendInput();
    // animeApp.getInput();
};

animeApp.init();
