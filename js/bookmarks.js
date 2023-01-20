document.getElementById("bookmarks").addEventListener("click", ()=>showBookmarks("level0"));

getBookmarks()
function showBookmarks (divId) {
    const myDiv = document.getElementById(divId)
    if (myDiv.style.display==="none") {
        myDiv.style.display = "block"
    }
    else {
        myDiv.style.display ="none"
    }
}

// getBookmarks() récupère l'intégralite l'arborescence des marques pages de chrome et à partir du noeud principal rècupère les descendants
function getBookmarks() {
    // arborescence principale
    chrome.bookmarks.getTree((bookmarksTree)=>{
        //descendants
        chrome.bookmarks.getChildren(bookmarksTree[0].id, createBookmarks);
    });
    document.getElementById("level0").style.display = "none"
    
};

// createBookmarks() est une fonction recursive qui affiche les favoris sur la page HTML et parcours l'arborescence des favoris
function createBookmarks(bookmarksTree) {
    //Parcours l'arborescence
    for(let i=0; i<bookmarksTree.length; i++) {
        const mainFolder = document.createElement("div");
        // Si Url existante = affichage
        if (bookmarksTree[i].url != null) {
            const ul = document.createElement("ul");
            const fileLi = document.createElement("li");
            const aLink = document.createElement("a");
            fileLi.className = "no-bullets";
            const aLinkText = document.createTextNode(bookmarksTree[i].title);
            aLink.href = bookmarksTree[i].url;
            aLink.appendChild(aLinkText);
            fileLi.appendChild(aLink);
            ul.appendChild(fileLi);
            const parent = document.getElementById("level"+bookmarksTree[i].parentId);
            parent.appendChild(ul);
        }
        // Sinon c'est un folder = affichage du folder + recursivité pour trouver l'Url
        else {
            const subFolder = document.createElement("div");
            const openButton = document.createElement("button");
            const folderImg = document.createElement("img");
            const fileLiText = document.createTextNode(bookmarksTree[i].title);
            const myDiv = document.createElement("div")
            myDiv.id = "level"+bookmarksTree[i].id;
            myDiv.style.display = "none";  
            folderImg.src = "img/folderIcon/bookmark (1).png";
            folderImg.style.width = "48px"
            openButton.className = "child-bookmarks";
            openButton.id = "button"+bookmarksTree[i].id;
            console.log(openButton.id);
            //openButton.style.float = "left";
            openButton.appendChild(folderImg);
            openButton.appendChild(fileLiText);
            subFolder.appendChild(openButton);
            subFolder.appendChild(myDiv);
            mainFolder.appendChild(subFolder);
            const parent = document.getElementById("level"+bookmarksTree[i].parentId);
            parent.appendChild(mainFolder);    
            // Recursivité pour parcourrir le folder en question
            document.getElementById(`button${bookmarksTree[i].id}`).addEventListener("click", () => showBookmarks(myDiv.id));
            chrome.bookmarks.getChildren(bookmarksTree[i].id, createBookmarks);
        }; 
        
    };
};