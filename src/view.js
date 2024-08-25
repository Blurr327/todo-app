import { format } from "date-fns";
import { createElement, toggleVisibilityOfElements, updateDisplayShowButton, Dialog } from "./dom-manipulation.js";

export { AppView };

function ToDoView(doc, toDo) {
    const hidableElements = [];
    let commonOptionsObj = {
        hidableElements,
        data: [
            {
            name:"index",
            content: toDo.getIndex()
        },
        {
            name:"projectIndex",
            content: toDo.getAssociatedProjectIndex()
        }
        ]
    }
    const toDoDiv = createElement(doc, "div",Object.assign({},commonOptionsObj, {classes:["todo"], data:undefined}));
    Object.assign(commonOptionsObj, {parent: toDoDiv});
    const editableOptionsObj = Object.assign({},commonOptionsObj, {contentEdit:true});

    const dateSpan = createElement(doc, "span", Object.assign({}, editableOptionsObj, {classes:["date"]}));
    const titleDiv = createElement(doc, "div", Object.assign({}, editableOptionsObj, {classes:["title"]}));
    const priorityDiv = createElement(doc, "div", Object.assign({}, editableOptionsObj, {classes:["priority"]}));
    const checkDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj, {classes: ["checkbox"]}));
    const descriptionDiv = createElement(doc, "div",Object.assign({}, editableOptionsObj, {hidable:true, classes:["description"]}));
    const showButton = createElement(doc, "button", Object.assign({}, commonOptionsObj, {classes:["show", "todo-button"]}));
    const removeToDo = createElement(doc, "button", Object.assign({},commonOptionsObj,{classes:["add"],parent:toDoDiv}));
    removeToDo.textContent = "Remove Todo";
    removeToDo.id = "remove-todo";

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

    const updateDisplayToDo = () => {
        updateDisplayDescription(), updateDisplayDueDate(),
        updateDisplayChecked(), updateDisplayTitle(),
        updateDisplayPriority();
        updateDisplayShowButton(showButton);
    }

    const appendToDoDivTo = (containerDiv) => {
        containerDiv.appendChild(toDoDiv);
    }

    const toggleHidableElements  = () => {
        toggleVisibilityOfElements(toDoDiv, hidableElements, showButton);
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
        data: [
            {
            name: "index",
            content: project.getIndex()
            }
        ]
    }
    const projectDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj, {classes:["project"]}));
    Object.assign(commonOptionsObj, {parent: projectDiv});

    const nameDiv = createElement(doc, "div", Object.assign({}, commonOptionsObj, {classes:["title"], contentEdit:true}));
    const toDosDiv  = createElement(doc, "div", Object.assign({},commonOptionsObj, {hidable:true}));
    const showButton = createElement(doc, "button", Object.assign({}, commonOptionsObj, {classes:["project-button", "show"]}));
    const addToDo = createElement(doc, "button", Object.assign({},commonOptionsObj,{classes:["add"],parent:projectDiv}));
    addToDo.textContent = "Add ToDo";
    addToDo.id ="todo-add";
    const removeProject = createElement(doc, "button", Object.assign({},commonOptionsObj,{classes:["add"],parent:projectDiv}));
    removeProject.textContent = "Remove Project";
    removeProject.id = "remove-project";

    const toDoViewsMap = new Map();

    const updateDisplayToDos = () => {
        toDosDiv.textContent = "";
        for(let i =0;i<project.getNumOfSubElements();i++) {
            if(!project.getIthSubElement(i)) continue;
            if(!toDoViewsMap.has(project.getIthSubElement(i))) toDoViewsMap.set(project.getIthSubElement(i),
            ToDoView(doc, project.getIthSubElement(i)));
            let toDoView = toDoViewsMap.get(project.getIthSubElement(i));
            toDoView.updateDisplayToDo();
            toDoView.appendToDoDivTo(toDosDiv);
        }
    }

    const updateDisplayName = () => nameDiv.textContent = project.getName();

    const updateDisplayProject = () => {
        updateDisplayToDos(), updateDisplayName();
        updateDisplayShowButton(showButton);
    }

    const appendProjectDivTo = (containerDiv) => {
        containerDiv.appendChild(projectDiv);
    }

    const toggleHidableElements  = () => {
        toggleVisibilityOfElements(projectDiv, hidableElements, showButton);
    }

    const getSubElementView = (toDo) => {
        return toDoViewsMap.get(toDo);
    }

    return {
        updateDisplayProject,
        toggleHidableElements,
        appendProjectDivTo,
        getSubElementView
    }
}

function AppView(doc, appModel) {
    const projectsDiv = doc.createElement("div");
    const contentDiv = doc.querySelector("#content");
    const projectViewsMap = new Map();
    const addProjectButton = createElement(doc, "button", {classes:["add"],parent:contentDiv});
    addProjectButton.textContent = "Add Project";
    addProjectButton.id ="project-add";

    const dialogObj = Dialog(doc);
    projectsDiv.classList.add("projects");

    contentDiv.appendChild(projectsDiv);

    const updateDisplayProjects = () => {
        projectsDiv.textContent = "";
        for(let i = 0;i<appModel.getNumOfSubElements();i++) {
            if(!appModel.getIthSubElement(i)) continue;
            let projectView;
            if(!projectViewsMap.has(appModel.getIthSubElement(i))) projectViewsMap.set(appModel.getIthSubElement(i),
        ProjectView(doc, appModel.getIthSubElement(i)));
            projectView = projectViewsMap.get(appModel.getIthSubElement(i))
            projectView.updateDisplayProject();
            projectView.appendProjectDivTo(projectsDiv);
        }
    }


    const getSubElementView = (project) => {
        return projectViewsMap.get(project);
    }

    return {
        updateDisplayProjects,
        getSubElementView,
        dialogObj
    };
}