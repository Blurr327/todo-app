export { createElement, getAllChildrenArray, toggleVisibilityOfElements, updateDisplayShowButton }


const createElement = (doc, type, optionsObj) => {
    const e = doc.createElement(type);
    if(optionsObj.hidable) optionsObj.hidableElements.push(e);
    if(optionsObj.data) e.dataset[optionsObj.data.name] = optionsObj.data.content;
    if(optionsObj.contentEdit) e.contentEditable = optionsObj.contentEdit;
    if(optionsObj.parent && (!optionsObj.hidable)) optionsObj.parent.appendChild(e);
    if(optionsObj.classes) optionsObj.classes.forEach(c => e.classList.add(c));
    return e;
}

const getAllChildrenArray = (element) => {
    return Array.from(element.children);
}

const updateDisplayShowButton = (showButton) => {
    showButton.textContent = (showButton.classList.contains("expanded")) ? "V" : "Λ";
}

const toggleVisibilityOfElements = (root, hidableElements, showButton) => {
    for(let e of hidableElements) {
        if(root.contains(e)) root.removeChild(e);
        else root.appendChild(e);
    }
    showButton.classList.toggle("expanded");
    updateDisplayShowButton(showButton);
}