const fs = require("fs");
const path = require("path");

let fileList = fs.readdirSync("./").map((item) => {
    return "./" + item;
})

fileList = fileList.filter(item => {
    var stat = fs.statSync(item);
    return item.toUpperCase().endsWith(".JSON") && stat && !stat.isDirectory();
})

let templateList = fileList.map((item) => {
    let rawdata = fs.readFileSync(item);
    let templateObj = JSON.parse(rawdata);
    return {
        name: templateObj.name,
        description: templateObj.description,
        tags: templateObj.tags,
        file: path.basename(item),
    }
})

fs.writeFileSync("./template.meta", JSON.stringify(templateList, undefined, 4));