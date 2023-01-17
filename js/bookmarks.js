document.getElementById("bookmarks").addEventListener("click", getBookmarks);

// getBookmarks() récupère l'intégralite l'arborescence des marques pages de chrome et à partir du noeud principal rècupère les descendants
console.log(chrome.bookmarks.getTree());

function getBookmarks() {
    // arborescence principale
    chrome.bookmarks.getTree((bookmarksTree)=>{
        //descendants
        chrome.bookmarks.getChildren(bookmarksTree[0].id, showBookmarks);
    });
};

// showBookmarks() est une fonction recursive qui affiche les favoris sur la page HTML et parcours l'arborescence des favoris

function showBookmarks(bookmarksTree) {
    document.getElementById("bookmarks").removeEventListener("click", getBookmarks);
    const mainFolder = document.createElement("ul");
    //Parcours l'arborescence
    for(let i=0; i<bookmarksTree.length; i++) {
        // Si Url existante = affichage
        if (bookmarksTree[i].url != null) {
            const fileLi = document.createElement("li");
            const aLink = document.createElement("a");
            const aLinkText = document.createTextNode(bookmarksTree[i].title);
            aLink.href = bookmarksTree[i].url;
            aLink.appendChild(aLinkText);
            fileLi.appendChild(aLink);
            mainFolder.appendChild(fileLi);
        }
        // Sinon c'est un folder = affichage du folder + recursivité pour trouver l'Url
        else {
            const subFolder = document.createElement("li");
            const openButton = document.createElement("button");
            const folderImg = document.createElement("img");
            const fileLiText = document.createTextNode(bookmarksTree[i].title);
            folderImg.src = "img/folderIcon/folder.png";
            subFolder.id = "level"+bookmarksTree[i].id;
            openButton.id = "button"+bookmarksTree[i].id;
            openButton.appendChild(folderImg);
            openButton.appendChild(fileLiText);
            subFolder.appendChild(openButton);
            mainFolder.appendChild(subFolder);
            // Recursivité pour parcourrir le folder en question
            
            //document.getElementById(`button${bookmarksTree[i].id}`).addEventListener("click", () => {})
            chrome.bookmarks.getChildren(bookmarksTree[i].id, showBookmarks);
        }; 
        const parent = document.getElementById("level"+bookmarksTree[i].parentId);
        parent.appendChild(mainFolder);
    };
};