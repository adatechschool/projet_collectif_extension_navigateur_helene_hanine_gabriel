document.getElementById("bookmarks").addEventListener("click", getBookmarks);
document.getElementById("bookmarks").addEventListener("mouseover", () => showBookmarks("level0"));

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
console.log(chrome.bookmarks.getTree());

function getBookmarks() {
    // arborescence principale
    chrome.bookmarks.getTree((bookmarksTree)=>{
        //descendants
        chrome.bookmarks.getChildren(bookmarksTree[0].id, createBookmarks);
    });
};

// createBookmarks() est une fonction recursive qui affiche les favoris sur la page HTML et parcours l'arborescence des favoris

function createBookmarks(bookmarksTree) {
    document.getElementById("bookmarks").removeEventListener("click", getBookmarks);
    //Parcours l'arborescence
    for(let i=0; i<bookmarksTree.length; i++) {
        const mainFolder = document.createElement("ul");
        // Si Url existante = affichage
        if (bookmarksTree[i].url != null) {
            const fileLi = document.createElement("li");
            const aLink = document.createElement("a");
            const aLinkText = document.createTextNode(bookmarksTree[i].title);
            aLink.href = bookmarksTree[i].url;
            aLink.appendChild(aLinkText);
            fileLi.appendChild(aLink);
            mainFolder.appendChild(fileLi);
            const parent = document.getElementById("level"+bookmarksTree[i].parentId);
            parent.appendChild(mainFolder);
        }
        // Sinon c'est un folder = affichage du folder + recursivité pour trouver l'Url
        else {
            const subFolder = document.createElement("li");
            const openButton = document.createElement("button");
            const folderImg = document.createElement("img");
            const fileLiText = document.createTextNode(bookmarksTree[i].title);
            const myDiv = document.createElement("div")
            myDiv.id = "level"+bookmarksTree[i].id;
            folderImg.src = "img/folderIcon/folder.png";
            openButton.id = "button"+bookmarksTree[i].id;
            openButton.appendChild(folderImg);
            openButton.appendChild(fileLiText);
            subFolder.appendChild(openButton);
            subFolder.appendChild(myDiv);
            mainFolder.appendChild(subFolder);
            
            //console.log(myDiv.id)
            const parent = document.getElementById("level"+bookmarksTree[i].parentId);
            parent.appendChild(mainFolder);
            
            
            
            // Recursivité pour parcourrir le folder en question
            document.getElementById(`button${bookmarksTree[i].id}`).addEventListener("click", () => {
                chrome.bookmarks.getChildren(bookmarksTree[i].id, createBookmarks);
            });
            document.getElementById(`button${bookmarksTree[i].id}`).addEventListener("mouseover", () => showBookmarks(myDiv.id))
        }; 
        
    };
};