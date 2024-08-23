import { AppModel } from "./model.js"
import { AppView } from "./view.js"
import "./style.css"


const appModel = AppModel();

appModel.addProject("Finishing this ToDo App");

appModel.addToDoToProject(appModel.getIthProject(0), "yah", new Date(2040,10,8), "this is a todo", 1, true);

const appView = AppView(document, appModel);

appView.updateDisplayProjects();
