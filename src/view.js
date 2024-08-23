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
    const toDoDiv = createElement(doc, "div",Object.assign({},commonOptionsObj));
    commonOptionsObj = Object.assign(commonOptionsObj, {parent: toDoDiv});
    const editableOptionsObj = Object.assign({},commonOptionsObj, {contentEdit:true});

    const dateSpan = createElement(doc, "span", editableOptionsObj);
    const titleDiv = createElement(doc, "div", editableOptionsObj);
    const priorityDiv = createElement(doc, "div", editableOptionsObj);
    const checkDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj));
    const descriptionDiv = createElement(doc, "div",Object.assign({}, commonOptionsObj, {hidable:true}));
    const showButton = createElement(doc, "button", editableOptionsObj);
    toDoDiv.classList.add("todo");

    const updateDisplayString = (textElement, text, className) => {
        if(typeof text !== "string" && typeof className !== "string") return;
        textElement.classList.add(className);
        textElement.textContent = text;
    }

    const updateDisplayDescription = () => {
        updateDisplayString(descriptionDiv, toDo.getDescription(), "description");
    }

    const updateDisplayDueDate = () => {
        dateSpan.classList.add("date");
        dateSpan.textContent = format(toDo.getDueDate(), "yyyy-MM-dd");
    }

    const updateDisplayChecked = () => {
        checkDiv.classList.add("checkbox");
        checkDiv.dataset.checked = toDo.getChecked();
    }

    const updateDisplayTitle = () => {
        updateDisplayString(titleDiv, toDo.getTitle(), "title");
    }

    const updateDisplayPriority = () => {
        updateDisplayString(priorityDiv, toDo.getPriority().toString(), "priority");
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
    const projectDiv = createElement(doc, "div", commonOptionsObj);
    commonOptionsObj = Object.assign(commonOptionsObj, {parent: projectDiv});

    const nameDiv = createElement(doc, "div", commonOptionsObj);
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