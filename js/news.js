// La fonction fetchNews() va réaliser un fetch sur l'api vers newsAPI afin d'obtenir des titres de nouvelles du jour dans certains médias français.
const newsUrl = "https://newsapi.org/v2/top-headlines?country=fr&apiKey=459b0b59249043c583f1317f23d5fbc4"

const fetchNews = async (url) => {
    try {
        const response = await fetch(url, {mode: 'cors'}
        );
        let data = await response.json();
        for (let i = 0; i <= 10; i++){
            if (data.articles[i].urlToImage !== null){
                const div = document.createElement("div");
                div.className = "slide";
                div.innerHTML = `<a href="${data.articles[i].url}"><img class="imgnews" src = ${data.articles[i].urlToImage}></a><p><a href="${data.articles[i].url}">${data.articles[i].title}</a></p>`
                document.getElementById("newsTitles").appendChild(div);
            }
        }
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}


//fetchNews(newsUrl);
