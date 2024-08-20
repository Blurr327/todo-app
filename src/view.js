import { format } from "date-fns";
import { addElementsToMainElement, addDataToElements } from "dom-manipulation";

function ToDoView(doc, toDo) {
    const toDoDiv = doc.createElement("div");
    const dateSpan = doc.createElement("span");
    const titleDiv = doc.createElement("div");
    const priorityButton = doc.createElement("button");
    const checkDiv = doc.createElement("div");
    const descriptionDiv = doc.createElement("div");
    toDoDiv.classList.add("todo");

    addElementsToMainElement(toDoDiv ,dateSpan, titleDiv, priorityButton, checkDiv);
    addDataToAllElements("index", toDo.getIndex());

    const displayString = (textElement, text, className) => {
        if(typeof text !== "string" && typeof className !== "string") return;
        textElement.classList.add(className);
        textElement.textContent = text;
    }

    const displayDescription = () => {
        displayString(descriptionDiv, toDo.getDescription(), "description");
    }

    const displayDueDate = () => {
        dateSpan.classList.add("date");
        dateSpan.textContent = format(toDo.getDueDate(), "yyyy-MM-dd");
    }

    const displayChecked = () => {
        checkDiv.classList.add("checkbox");
        checkDiv.dataset.checked = toDo.getChecked();
    }

    const displayTitle = () => {
        displayString(titleDiv, toDo.getTitle(), "title");
    }

    const displayPriority = () => {
        displayString(priorityButton, toDo.getPriority().toString(), "priority");
    }

    const displayToDo = (containerDiv) => {
        displayDescription(), displayDueDate(),
        displayChecked(), displayTitle(),
        displayPriority();
        containerDiv.appendChild(toDoView);
    }

    const addDataToAllElements = (dataName, data) => {
        addDataToElements(dataName, data, toDoDiv, titleDiv,
            descriptionDiv, dateSpan, checkDiv, priorityButton);
    }

    return {
        displayToDo
    }
}

function ProjectView(doc, project) {
    const projectDiv = doc.createElement("div");
    const nameDiv = doc.createElement("div");
    const toDosDiv  = doc.createElment("div");

    addElementsToMainElement(projectDiv, nameDiv, toDosDiv);


    const displayToDos = () => {
        toDosDiv.textContent = "";
        for(let i =0;i<project.getNumOfToDos();i++) {
            const todoview = ToDoView(doc, project.getIthToDo(i));
            todoview.displayToDo(toDosDiv); // might be problematic (passing by reference or... ?)
        }
    }

    const displayName = () => nameDiv.textContent = project.getName();

    const displayProject = (containerDiv) => {
        displayToDos(), displayName();
        containerDiv.appendChild(projectDiv);
    }

    return {
        displayProject
    }
}

function AppView(doc, appModel) {
    const projectsDiv = doc.createElment("div");


    const displayProjects = () => {
        projectsDiv.textContent = "";
        for(let i = 0;i<appModel.getNumOfProjects();i++) {
            const projectView = ProjectView(doc, appModel.getIthProject(i));
            projectView.displayProject(projectsDiv); // might be problematic (passing by reference or... ?)
        }
    }

    return {
        displayProjects
    };
}