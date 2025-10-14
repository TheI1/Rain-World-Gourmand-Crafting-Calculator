
var itemsJsonRequest = fetch("items.json");

async function init() {
    var items = await (await itemsJsonRequest).json();
    var selector = document.getElementById("selector");
    items.forEach(item => {
        var element = document.createElement("div");
        element.classList.add("selector-button");
        element.addEventListener("click", () => item_click(item))
        element.addEventListener("contextmenu", evt => {
            evt.preventDefault(); // prevent the context menu from opening
            item_click(item);
        })
        var img = document.createElement("img");
        img.src = item.icon;
        img.classList.add("centered-img");
        element.appendChild(img);
        selector.appendChild(element);
    });
}

function item_click(item_dat) {
    console.log(`clicked ${item_dat["idx"]}: ${item_dat["name"]}`);
}
