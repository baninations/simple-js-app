let pokemonRepository = (function(){
    let pokemonList = []
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"

    let pokemonListTitle = document.querySelector(".pokemon-list")
    pokemonListTitle.append("Pokedex")

    function add(pokemon) {
        if(
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            console.log("pokemon is not correct")
        }
    }

    function addListItem(pokemon) {
        let ul = document.querySelector(".pokemon-list")
        let li = document.createElement("li")
        let button = document.createElement("button")
        button.innerText = pokemon.name
        button.classList.add("btn")
        li.append(button)
        ul.append(li)
        button.addEventListener("click", e => {
            showDetails(pokemon)
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) { // there could be something fishy about this line, idk where he got "results"
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon)
                console.log(pokemon)
            })
        }).catch(function (e) {
            console.error(e)
        })
    }
    
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon)
        })
        
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl
        return fetch(url).then(function (response) {
            return response.json()
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default
            item.height = details.height
            item.types = details.types
        }).catch(function (e) {
            console.error(e)
        })
    }

    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        },
        addListItem: function(pokemon) {
            return addListItem(pokemon)
        },
        loadList: loadList, // added this too
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
    })
})