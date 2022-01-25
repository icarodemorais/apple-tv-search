var initializeSearch = function() {
    let loginUser = $("body > main > div.nav-header.menu-opening > div > div.nav-header__content > div")
    if (loginUser.length == 0) {
        return setTimeout(initializeSearch, 1000);
    } else {
        console.log("carregou")
            
        let searchInput = createSearchInput()

        $("body > main > div.nav-header.menu-opening > div > div.nav-header__content ").append(searchInput)
    }
}



function createSearchInput() {

    let mainDiv = $("<div>", { id: "search-bar-main-div", "class": "nav-header__buttons-wrapper search-vertical-align" });
    let searchInput = $("<input>", { id: "search-bar-input", "class": "force-ltr form-textbox form-textbox-text search-vertical-align", "list": "search-bar-datalist" });
    let datalist = $("<datalist>", { id: "search-bar-datalist" });

    let shows = getAllShows()

    for (var i = 0; i < shows.length; i++){
        datalist.append($("<option>", { value: shows[i].name, "link": shows[i].link }));
    }

    mainDiv.append(searchInput)
    mainDiv.append(datalist)

    searchInput.on('input',function (e) {
        var val = this.value;
        var selectedOption;
        if ($('#search-bar-datalist option').filter(function () {
                if (this.value.toUpperCase() === val.toUpperCase()) {
                    selectedOption = this
                    return true
                } else {
                    return false
                }
            }).length) {
                redirectToShow($(selectedOption).attr("link"))
            }
        });

    return mainDiv
    
}

function redirectToShow(link) {
    let url = window.location.origin;
    url = url + link
    window.location.href = url;
}

function getAllShows() {

    var allShows = $('body').find('img').map(function () {
        return {
            name: this.alt,
            link: $(this).closest("a").attr("href")
        };
    }).get();

    var uniqueShows = getUniqueListBy(allShows, "name") 

    return uniqueShows.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))


}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}



initializeSearch()