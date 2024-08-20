export { addElementsToMainElement, addDataToElements }


const addElementsToMainElement = (mainElement, ...elements) => {
    elements.every(e => mainElement.appendChild(e));
}

const addDataToElements = (dataName, data, ...elements) => {
    elements.every(e => e.dataset['dataName'] = data);
}