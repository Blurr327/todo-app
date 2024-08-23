import { format } from "date-fns";
import { createElement, toggleVisibilityOfElements } from "./dom-manipulation.js";

export { AppView };

function ToDoView(doc, toDo) {
    const hidableElements = [];
    let commonOptionsObj = {
        hidableElements,
        data: {
            dataName:"index",
            content: toDo.getIndex()
        }
    }
    const toDoDiv = createElement(doc, "div",Object.assign({},commonOptionsObj, {className:"todo"}));
    Object.assign(commonOptionsObj, {parent: toDoDiv});
    const editableOptionsObj = Object.assign({},commonOptionsObj, {contentEdit:true});

    const dateSpan = createElement(doc, "span", Object.assign({}, editableOptionsObj, {className:"date"}));
    const titleDiv = createElement(doc, "div", Object.assign({}, editableOptionsObj, {className:"title"}));
    const priorityDiv = createElement(doc, "div", Object.assign({}, editableOptionsObj, {className:"priority"}));
    const checkDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj, {className:"checkbox"}));
    const descriptionDiv = createElement(doc, "div",Object.assign({}, commonOptionsObj, {hidable:true, className:"description"}));
    const showButton = createElement(doc, "button", editableOptionsObj);
    toDoDiv.classList.add("todo");

    const updateDisplayString = (textElement, text) => {
        if(typeof text !== "string") return;
        textElement.textContent = text;
    }

    const updateDisplayDescription = () => {
        updateDisplayString(descriptionDiv, toDo.getDescription());
    }

    const updateDisplayDueDate = () => {
        dateSpan.textContent = format(toDo.getDueDate(), "yyyy-MM-dd");
    }

    const updateDisplayChecked = () => {
        checkDiv.dataset.checked = toDo.getChecked();
    }

    const updateDisplayTitle = () => {
        updateDisplayString(titleDiv, toDo.getTitle());
    }

    const updateDisplayPriority = () => {
        updateDisplayString(priorityDiv, toDo.getPriority().toString());
    }

    const updateDisplayShowButton = () => {
        showButton.textContent = (showButton.classList.contains("expanded")) ? "V" : "Λ";
    }

    const updateDisplayToDo = () => {
        updateDisplayDescription(), updateDisplayDueDate(),
        updateDisplayChecked(), updateDisplayTitle(),
        updateDisplayPriority(), updateDisplayShowButton();
    }

    const appendToDoDivTo = (containerDiv) => {
        containerDiv.appendChild(toDoDiv);
    }

    const toggleHidableElements  = () => {
        toggleVisibilityOfElements(toDoDiv, hidableElements);
    }

    return {
        updateDisplayToDo,
        toggleHidableElements,
        appendToDoDivTo
    }
}

function ProjectView(doc, project) {
    const hidableElements = [];
    let commonOptionsObj = {
        hidableElements,
        data: {
            dataName:"index",
            content:project.getIndex()
        }
    }
    const projectDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj, {className:"project"}));
    Object.assign(commonOptionsObj, {parent: projectDiv});

    const nameDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj, {className:"title"}));
    const toDosDiv  = createElement(doc, "div", Object.assign({},commonOptionsObj, {hidable:true}));
    const showButton = createElement(doc, "button", commonOptionsObj);

    const updateDisplayToDos = () => {
        toDosDiv.textContent = "";
        for(let i =0;i<project.getNumOfToDos();i++) {
            const toDoView = ToDoView(doc, project.getIthToDo(i));
            toDoView.updateDisplayToDo(); // might be problematic (passing by reference or... ?)
            toDoView.appendToDoDivTo(toDosDiv);
        }
    }

    const updateDisplayName = () => nameDiv.textContent = project.getName();

    const updateDisplayShowButton = () => {
        showButton.textContent = (showButton.classList.contains("expanded")) ? "V" : "Λ";
    }

    const updateDisplayProject = () => {
        updateDisplayToDos(), updateDisplayName(), updateDisplayShowButton();
    }

    const appendProjectDivTo = (containerDiv) => {
        containerDiv.appendChild(projectDiv);
    }

    const toggleHidableElements  = () => {
        toggleVisibilityOfElements(projectDiv, hidableElements);
    }

    return {
        updateDisplayProject,
        toggleHidableElements,
        appendProjectDivTo
    }
}

function AppView(doc, appModel) {
    const projectsDiv = doc.createElement("div");
    const contentDiv = doc.querySelector("#content");

    projectsDiv.classList.add("projects");

    contentDiv.appendChild(projectsDiv);

    const updateDisplayProjects = () => {
        projectsDiv.textContent = "";
        for(let i = 0;i<appModel.getNumOfProjects();i++) {
            const projectView = ProjectView(doc, appModel.getIthProject(i));
            projectView.updateDisplayProject(); // might be problematic (passing by reference or... ?)
            projectView.appendProjectDivTo(projectsDiv);
        }
    }

    return {
        updateDisplayProjects
    };
}