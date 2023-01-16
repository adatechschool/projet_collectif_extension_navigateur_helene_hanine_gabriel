const gettingBookmarks = chrome.bookmarks.getTree();
console.log(gettingBookmarks)

function getFirtsItemNode () {
    gettingBookmarks.then((bookmarksTree)=>{
        let firtsItemNode = bookmarksTree[0].children;
        let itemNode = [];
        for (let i=0; i<firtsItemNode.length; i++) {
            document.getElementById("title").innerHTML += firtsItemNode[i].title + " ";
            itemNode.push(firtsItemNode[i]);
        };
        console.log(itemNode);
        return itemNode;
    });
};

getFirtsItemNode ()


function getId(item) {
    let arrayID = [];
    for (let i in item) {
        arrayID.push(item[i].id);
    }
    console.log
    return arrayID;
}

