// La fonction fetchNews() va réaliser un fetch sur l'api vers newsAPI afin d'obtenir des titres de nouvelles du jour dans certains médias français.
const newsUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=459b0b59249043c583f1317f23d5fbc4"


const fetchNews = async (url) => {
    try {
        const response = await fetch(url, {mode: 'cors'}
        );
        let data = await response.json();
        console.log(data);
        showNews(data);
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}

function showNews (data){
    const divActive = document.createElement("div");
    divActive.className = "carousel-item active";
    const imgActive = document.createElement("img");
    imgActive.src = data.articles[0].urlToImage;
    imgActive.className = "d-block w-100";
    imgActive.className = "styleImage"
    const divCaptionActive = document.createElement("div");
    divCaptionActive.className = "carousel-caption d-none d-md-block";
    const pTitleActive = document.createElement("p");
    // pTitleActive.innerHTML = `<a href="${data.articles[0].url}" class="styleTitle" target="_blank">${data.articles[0].title}</a>`
    if (currentHour >= 6 && currentHour < 19){
        pTitleActive.innerHTML = `<a href="${data.articles[0].url}" class="styleTitle" style="color:#0d0d0c;text-decoration: none;" target="_blank" >${data.articles[0].title}</a>`;
    } else {
        pTitleActive.innerHTML = `<a href="${data.articles[0].url}" class="styleTitle" style="color:#ffffff;text-decoration: none;" target="_blank" >${data.articles[0].title}</a>`;
    }
    divCaptionActive.appendChild(pTitleActive);
    divActive.appendChild(imgActive);
    divActive.appendChild(divCaptionActive);
    document.getElementById("carousel-inner").appendChild(divActive);
    for (let i = 1; i < 10; i++){
        if (data.articles[i].urlToImage !== null){
            const div = document.createElement("div");
            div.className = "carousel-item";
            const img = document.createElement("img");
            img.src = data.articles[i].urlToImage;
            img.className = "d-block w-100";
            img.className = "styleImage"
            const divCaption = document.createElement("div");
            divCaption.className = "carousel-caption d-none d-md-block";
            const pTitle = document.createElement("p");
            if (currentHour >= 6 && currentHour < 19){
                pTitle.innerHTML = `<a href="${data.articles[i].url}" class="styleTitle" style="color:#0d0d0c;text-decoration: none;" target="_blank" >${data.articles[i].title}</a>`;
            } else {
                pTitle.innerHTML = `<a href="${data.articles[i].url}" class="styleTitle" style="color:#ffffff;text-decoration: none;" target="_blank" >${data.articles[i].title}</a>`;
            }
            divCaption.appendChild(pTitle);
            div.appendChild(img);
            div.appendChild(divCaption);
            document.getElementById("carousel-inner").appendChild(div);
        }
    }
}

function getUserTime(){
    newDate = new Date();
    newDate.getHours();
    currentDate = newDate.toString();
    currentHour = currentDate[16] + currentDate[17];
    return parseInt(currentHour);  
}

fetchNews(newsUrl);
