// La fonction fetchNews() va réaliser un fetch sur l'api vers newsAPI afin d'obtenir des titres de nouvelles du jour dans certains médias français.
const newsUrl = "https://newsapi.org/v2/top-headlines?country=fr&apiKey=459b0b59249043c583f1317f23d5fbc4"

const fetchNews = async (url) => {
    try {
        const response = await fetch(url, {mode: 'cors'}
        );
        let data = await response.json();
        for (let i = 0; i <= 19; i++){
            if (data.articles[i].urlToImage !== null){
                const li = document.createElement("li");
                li.innerHTML = `<img src = ${data.articles[i].urlToImage} width="200px"> <a href = ${data.articles[i].url} > ${data.articles[i].title} </a>` 
                document.getElementById("newsTitles").appendChild(li);
            }
        }
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}


//fetchNews(newsUrl);
