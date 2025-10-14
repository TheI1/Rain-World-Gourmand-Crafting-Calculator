import json
from typing import Any

with open("data_collection/crafting_table.txt") as file:
    crafting_table = [line.strip("\n") for line in file.readlines()]
with open("data_collection/foodvals.txt") as file:
    foodvals = [eval(line.strip("\n")) for line in file.readlines()]
with open("data_collection/wiki_items.txt") as file:
    items = [line.strip("\n") for line in file.readlines()]
with open("data_collection/wiki_icons.txt") as file:
    icons = [line.strip("\n") for line in file.readlines()]
with open("data_collection/wiki_names.txt") as file:
    names = [line.strip("\n") for line in file.readlines()]

output = [{"id": id} for id in items]

for i in range(len(items)):
    item: dict[str, Any] = output[i]
    item["food"] = foodvals[i]
    item["name"] = names[i]
    item["icon"] = icons[i]
    
    if i < len(crafting_table):
        crafting_row = [int(craft) for craft in crafting_table[i].split("|")[1:]]
        item["crafts_into"] = crafting_row
    
    crafts_from = []
    for l in range(1, len(crafting_table)):
        row = crafting_table[l]
        idx = row.find("|" + str(i) + " " * (2 - len(str(i))), l * 3) + 1
        while idx > 0:
            crafts_from.append((int(idx/3), l))
            idx = row.find("|" + str(i), idx) + 1
    
    item["crafts_from"] = crafts_from
    print(crafts_from)


with open("items.json", "w") as file:
    json.dump(output, file, indent=2)
