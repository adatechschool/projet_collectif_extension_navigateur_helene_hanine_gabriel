document.body.style.backgroundImage = "url('img/background/night.jpg')";

// DisplayBackground() prend en paramètre l'heure en integer et affiche une image correspondant au jour ou à la nuit.
function displayBackground (int){
    let userHour = int;
    if (userHour >= 6 && userHour < 19){
        document.body.style.backgroundImage = "url('img/background/day.jpg')";
        backgroundStyle();
        document.body.style.color = "#0d0d0c";
        document.getElementById("city").style.color = "#0d0d0c";
        document.getElementById("temperature").style.color = "#0d0d0c";
    } else {
        document.body.style.backgroundImage = "url('img/background/night.jpg')";
        backgroundStyle();
        document.body.style.color = "#ffffff";
        document.getElementById("city").style.color = "#ffffff";
        document.getElementById("temperature").style.color = "#ffffff";
    }
}

// Style d'affichage en CSS du background
const backgroundStyle = () => {
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top left";
}

// La fonction getUserTime() rend l'heure de l'utilisateur sous la forme d'Integer.
function getUserTime(){
    newDate = new Date();
    newDate.getHours();
    currentDate = newDate.toString();
    currentHour = currentDate[16] + currentDate[17];
    return parseInt(currentHour);  
}

// Appel de Fonctions
displayBackground(getUserTime());
// displayBackground(21);

