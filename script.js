fetch // first api call
        const url = new URL ('https://api.jikan.moe/v4/anime');
        url.search = new URLSearchParams({
            q: 'dragon ball z',
            
        })

        fetch(url)
        .then(Response => Response.json())
        .then(data2 => {
            console.log(data2.data);
            displayElement(data2.data);
        })

        const displayElement = (dataObjectFromApi) => {

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