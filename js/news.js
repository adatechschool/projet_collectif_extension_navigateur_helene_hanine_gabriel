// La fonction fetchNews() va réaliser un fetch sur l'api vers newsAPI afin d'obtenir des titres de nouvelles du jour dans certains médias français.
const newsUrl = "https://newsapi.org/v2/top-headlines?country=fr&apiKey=459b0b59249043c583f1317f23d5fbc4"

const fetchNews = async (url) => {
    try {
        const response = await fetch(url, {mode: 'cors'}
        );
        let data = await response.json()
        document.getElementById("news1").setAttribute("href", data.articles[0].url)
        document.getElementById("news1").innerHTML = data.articles[0].title;
        document.getElementById("news2").setAttribute("href", data.articles[1].url)
        document.getElementById("news2").innerHTML = data.articles[1].title;
        document.getElementById("news3").setAttribute("href", data.articles[2].url)
        document.getElementById("news3").innerHTML = data.articles[2].title;
        document.getElementById("news4").setAttribute("href", data.articles[3].url)
        document.getElementById("news4").innerHTML = data.articles[3].title;
        document.getElementById("news5").setAttribute("href", data.articles[4].url)
        document.getElementById("news5").innerHTML = data.articles[4].title;

        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}


fetchNews(newsUrl);
