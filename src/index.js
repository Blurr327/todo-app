import { AppModel } from "./model.js"
import { AppView } from "./view.js"
import { AppController } from "./controller.js"
import "./style.css"


const appModel = AppModel(localStorage);

appModel.loadStorage();

appModel.addProject("Finishing this ToDo App");

appModel.addToDoToProject(appModel.getIthSubElement(0), "yah", new Date(2040,10,8), "this is a todo", 1, true);


const appView = AppView(document, appModel);

const appController = AppController(document, appView, appModel);

appView.updateDisplayProjects();
