export { createElement, getAllChildrenArray, toggleVisibilityOfElements, updateDisplayShowButton, Dialog }


const createElement = (doc, type, optionsObj) => {
    const e = doc.createElement(type);
    if(optionsObj.hidable) optionsObj.hidableElements.push(e);
    if(optionsObj.data) {
        console.log(optionsObj.data);
        optionsObj.data.forEach( d => {
            console.log(d.name);
            console.log(d.content);
            e.dataset[d.name] = d.content;
        });
    }
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

const Dialog = (doc) => {
    const initiateDialog = () => {
        const dialog = doc.createElement("dialog");
        dialog.classList.add("add-dialog");
        // Create the form element
        const form = doc.createElement("form");
        const controls = doc.createElement("p");
        controls.id = "controls";

        // Append the controls paragraph to the form
        form.appendChild(controls);

        // Create the div container for the buttons
        const buttonDiv = doc.createElement("div");

        // Create the Cancel button
        const cancelButton = doc.createElement("button");
        cancelButton.value = "cancel";
        cancelButton.setAttribute("formmethod", "dialog");
        cancelButton.textContent = "Cancel";

        // Create the Confirm button
        const confirmButton = doc.createElement("button");
        confirmButton.id = "confirmBtn";
        confirmButton.value = "default";
        confirmButton.textContent = "Confirm";

        // Append the buttons to the div
        buttonDiv.appendChild(cancelButton);
        buttonDiv.appendChild(confirmButton);

        // Append the button div to the form
        form.appendChild(buttonDiv);

        // Append the form to the dialog
        dialog.appendChild(form);

        doc.querySelector("body").appendChild(dialog);
        return {dialog, controls};
    }

    const {dialog, controls} = initiateDialog();

    const showModal = () => {
        dialog.showModal();
    }

    const closeModal = () => {
        dialog.close();
    }

    const updateContent = (inp) => {
        controls.textContent ="";

        for(let type in inp){
            inp[type].forEach(field => {
                // Create a label for each field
                const label = doc.createElement('label');
                label.setAttribute('for', field);
                label.textContent = field.charAt(0).toUpperCase() + field.slice(1);

                // Create an input for each field
                const input = doc.createElement('input');
                input.setAttribute('type', type); // You can modify the type if needed
                input.setAttribute('name', field);
                input.setAttribute('id', field);

                // Append the label and input to the form
                controls.appendChild(label);
                controls.appendChild(input);

                // Add a line break for readability
                controls.appendChild(doc.createElement('br'));
            });
        }
    }

    const getReturnValue = () => {
        return dialog.returnValue;
    }

    const getId = () => {
        return dialog.id;
    }

    const setId = (id) => {
        dialog.id = id;
    }

    const setData = (dataName, dataContent) => {
        dialog.dataset[dataName]=dataContent;
    }

    const setIndex = (i) => {
        setData("index", i);
    }

    const getIndex = () => {
        return dialog.dataset.index;
    }
    return {
        showModal,
        closeModal,
        updateContent,
        getReturnValue,
        getId,
        setId,
        setIndex,
        getIndex
    }
}