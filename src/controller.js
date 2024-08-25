import { AppModel } from "./model.js";
import { AppView } from "./view.js";

export { AppController };

const isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

function AppController(doc, appView, appModel) {

    const showButtonClickHandler = (e, model, view) => {
        const subElement = model.getIthSubElement(e.target.dataset.index);
        const subView = view.getSubElementView(subElement);
        subView.toggleHidableElements();
    }

    doc.addEventListener('click', (e) => {
        const classes = e.target.classList;
        if(classes.contains("show") && classes.contains("project-button")) {
            showButtonClickHandler(e, appModel, appView);
            appView.updateDisplayProjects();
        } else if(classes.contains("show") && classes.contains("todo-button")) {
            const model = appModel.getIthSubElement(e.target.dataset.projectIndex);
            const view = appView.getSubElementView(model);
            showButtonClickHandler(e, model, view);
            appView.updateDisplayProjects();
        } else if(e.target.id == "project-add") {
            appView.dialogObj.updateContent({"text":["name"]});
            appView.dialogObj.setId("project-add");
            appView.dialogObj.showModal();
        } else if(e.target.id == "todo-add") {
            appView.dialogObj.updateContent({"text":["title", "description"], "date":["due date"], "number":["priority"]});
            appView.dialogObj.setId("todo-add");
            appView.dialogObj.setIndex(e.target.dataset.index);
            appView.dialogObj.showModal();
        } else if(e.target.id == "remove-project") {
            console.log(appModel.getIthSubElement(e.target.dataset.index));
            appModel.removeProject(appModel.getIthSubElement(e.target.dataset.index));
            appView.updateDisplayProjects();
        } else if(e.target.id =="remove-todo") {
            const p = appModel.getIthSubElement(e.target.dataset.projectIndex);
            appModel.removeToDoFromProject(p, p.getIthSubElement(e.target.dataset.index));
            appView.getSubElementView(p).updateDisplayProject();
        } else if(classes.contains("checkbox")) {
            appModel.getIthSubElement(e.target.dataset.projectIndex)
            .getIthSubElement(e.target.dataset.index)
            .toggleChecked();
            appView.getSubElementView(appModel.getIthSubElement(e.target.dataset.projectIndex))
            .updateDisplayProject();
        }
        appModel.updateStorage();
    })

    doc.addEventListener("submit", e => {
        if(e.submitter.id == "confirmBtn") {
            if(appView.dialogObj.getId() == "project-add") {
                appModel.addProject(e.target.name.value);
                appView.updateDisplayProjects();
                e.preventDefault();
            } else if (appView.dialogObj.getId() == "todo-add") {
                appModel.addToDoToProject(
                    appModel.getIthSubElement(appView.dialogObj.getIndex()),
                    e.target.title.value,
                    new Date(e.target["due date"].value),
                    e.target.description.value,
                    Number.parseInt(e.target.priority.value)
                );
                const v = appView.getSubElementView(appModel.getIthSubElement(appView.dialogObj.getIndex()));
                v.updateDisplayProject();
                e.preventDefault();
            }
        }
        appModel.updateStorage();
    });

    doc.addEventListener("input" , e => {
        const classes = e.target.classList;
        const input = e.target.textContent;
        const data = e.target.dataset;
        if(classes.contains("name")) {
            appModel.getIthSubElement(data.index).setName(input);
        } else if(classes.contains("date")) {
            if(isDate(input)){
                appModel.getIthSubElement(data.projectIndex)
                .getIthSubElement(data.index).setDueDate(new Date(input));
            }
        } else if(classes.contains("title")) {
            appModel.getIthSubElement(data.projectIndex)
                .getIthSubElement(data.index).setTitle(input);
        } else if(classes.contains("description")) {
            appModel.getIthSubElement(data.projectIndex)
                .getIthSubElement(data.index).setDescription(input);
        } else if(classes.contains("priority")) {
            if(Number.isInteger(Number.parseInt(input))) {
                appModel.getIthSubElement(data.projectIndex)
                .getIthSubElement(data.index).setPriority(Number.parseInt(input));
            }
        }
        appModel.updateStorage();
    })
}