export { createElement, getAllChildrenArray, toggleVisibilityOfElements }


const createElement = (doc, type, optionsObj) => {
    const e = doc.createElement(type);
    if(optionsObj.hidable) optionsObj.hidableElements.push(e);
    if(optionsObj.data) e.dataset[optionsObj.data.name] = optionsObj.data.content;
    if(optionsObj.contentEdit) e.contentEditable = optionsObj.contentEdit;
    if(optionsObj.parent && (!optionsObj.hidable)) optionsObj.parent.appendChild(e);
    if(optionsObj.className) e.classList.add(optionsObj.className);
    return e;
}

const getAllChildrenArray = (element) => {
    return Array.from(element.children);
}

const toggleVisibilityOfElements = (root, hidableElements) => {
    for(let e of hidableElements) {
        if(root.contains(e)) root.removeChild(e);
        else root.appendChild(e);
    }
}