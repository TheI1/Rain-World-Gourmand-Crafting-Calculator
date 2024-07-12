
function init() {
    var selector = document.getElementById("selector")
    items.forEach(item => {
        var element = document.createElement("div");
        element.classList.add("selector-button");
        var img = document.createElement("img");
        img.src = item.icon;
        img.classList.add("centered-img");
        element.appendChild(img);
        selector.appendChild(element);
    });
}
