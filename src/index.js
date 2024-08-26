import { AppModel } from "./model.js"
import { AppView } from "./view.js"
import { AppController } from "./controller.js"
import "./style.css"


const appModel = AppModel(localStorage);

appModel.loadStorage();

const appView = AppView(document, appModel);

const appController = AppController(document, appView, appModel);

appView.updateDisplayProjects();
