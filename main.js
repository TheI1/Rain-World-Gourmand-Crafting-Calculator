
var itemsJsonRequest = fetch("items.json");
var items = [];

class Display {
    constructor() {
        this.items = new Map();
        this.parent = null;
    }

    update(inventory) {
        inventory.forEach((val, key) => {
            if (!this.items.has(key)) {
                var box = create_item_box(items[key]);
                box.appendChild(document.createTextNode(val > 0 ? String(val) : ""));
                this.parent.appendChild(box);
                this.items.set(key, box);
            }
            else {
                this.items.get(key).childNodes[1].nodeValue = val > 0 ? String(val) : "";
            }
        });

        this.items.forEach((val, key) => {
            if (!inventory.has(key)) {
                this.items.get(key).remove();
                this.items.delete(key);
            }
        });
    }
}

class Inventory extends Map {
    constructor(...args) {
        super(...args);
    }

    addItem(item_idx, amount) {
        var current = this.get(item_idx);
        if (current == undefined && amount > 0) {
            this.set(item_idx, amount);
        }
        else {
            current += amount;
            if (current > 0) {
                this.set(item_idx, current);
            }
            else {
                this.delete(item_idx);
            }
        }
    }
}

async function init() {
    items = await (await itemsJsonRequest).json();
    var selector = document.getElementById("selector");
    items.forEach(item => {
        selector.appendChild(create_item_box(item));
    });
}

function create_item_box(item) {
        var element = document.createElement("div");
        element.classList.add("item-box");
        element.addEventListener("click", () => item_click(item))
        element.addEventListener("contextmenu", evt => {
            evt.preventDefault(); // prevent the context menu from opening
            item_click(item);
        })
        var img = document.createElement("img");
        img.src = item.icon;
        img.classList.add("centered-img");
        element.appendChild(img);
        return element;
}

function item_click(item_dat) {
    console.log(`clicked ${item_dat["idx"]}: ${item_dat["name"]}`);
}
