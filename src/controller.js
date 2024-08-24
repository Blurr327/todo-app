import { AppModel } from "./model.js";
import { AppView } from "./view.js";

export { AppController };

function ToDoController() {

    // listener handler for editable text content

    // listener handler for check box
}

function ProjectController(appView, appModel) {

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
            const model = appModel.getIthSubElement(e.target.parentNode.dataset.index);
            const view = appView.getSubElementView(model);
            showButtonClickHandler(e, model, view);
            appView.updateDisplayProjects();
        }
    })
}