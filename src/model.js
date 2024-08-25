export { AppModel }

function ToDo(title, dueDate, description, priority, i, pi) {
    let inTitle,
        inDueDate,
        inDescription,
        inPriority,
        checked,
        index,
        projectIndex;

    const getTitle = () => inTitle;
    const setTitle = (t) => {
        if (typeof t === "string") inTitle = t;
    };

    const getDueDate = () => inDueDate;
    const setDueDate = (d) => {
        if (d instanceof Date) inDueDate = d;
    };

    const getDescription = () => inDescription;
    const setDescription = (desc) => {
        if (typeof desc === "string") inDescription = desc;
    };

    const getPriority = () => inPriority;
    const setPriority = (p) => {
        if (typeof p === "number") inPriority = p;
    };

    const getChecked = () => checked;
    const toggleChecked = () => {
        checked = !checked;
    };

    const getIndex = () => index;
    const setIndex = (i) => {
        if(Number.isInteger(i)) index = i;
    }

    const getAssociatedProjectIndex = () => {
        return projectIndex;
    }
    const setAssociatedProjectIndex = (i) => {
        if(Number.isInteger(i)) projectIndex = i;
    }

    setTitle(title), setDueDate(dueDate),
    setDescription(description), setPriority(priority),
    setIndex(i), setAssociatedProjectIndex(pi);

    return {
        getTitle,
        setTitle,
        getDueDate,
        setDueDate,
        getDescription,
        setDescription,
        getPriority,
        setPriority,
        getChecked,
        toggleChecked,
        getIndex,
        setIndex,
        getAssociatedProjectIndex,
        setAssociatedProjectIndex
    };
}


function Project(name, i, toDoArray=[]) {
    let inName = name;
    let index;

    const getIthSubElement = (i) => toDoArray[i%toDoArray.length];
    const addToDo = (title, dueDate, description, priority) => {
        const toDo = ToDo(title,dueDate,description,priority, toDoArray.length, index);
        toDoArray.push(toDo);
    }
    const removeToDo =   (toDo) => {
        delete toDoArray[toDo.getIndex()%toDoArray.length];
    }
    const getNumOfSubElements = () => toDoArray.length;


    const getName = () => inName;
    const setName = (name) => {
        if(typeof name === "string") inName = name;
    }

    const getIndex = () => index;
    const setIndex = (i) => {
        if(Number.isInteger(i)) index = i;
    }

    const getStringifiedToDos = () => {
        const stored = [];
        toDoArray.forEach(toDo =>
            stored[toDo.getIndex()] = {
                title: toDo.getTitle(),
                priority: toDo.getPriority().toString(),
                dueDate: toDo.getDueDate().toString(),
                description: toDo.getDescription(),
                checked: toDo.getChecked(),
                index: toDo.getIndex(),
                projectIndex: toDo.getAssociatedProjectIndex()
            }
        )
        return JSON.stringify(stored);
    }

    setIndex(i);

    return {
        getIthSubElement,
        addToDo,
        removeToDo,
        getName,
        setName,
        getNumOfSubElements,
        getIndex,
        getStringifiedToDos
    };
}

function AppModel(storage) {
    const projects = [];

    const addProject = (name) => {
        projects.push(Project(name, projects.length));
    }
    const removeProject = (project) => {
        delete projects[project.getIndex()%projects.length];
    }

    const addToDoToProject = (project, title, dueDate, description, priority) => {
        project.addToDo(title, dueDate, description, priority);
    };

    const removeToDoFromProject = (project, toDo) => {
        project.removeToDo(toDo);
    }

    const getIthSubElement = (i) => {
        return projects[i%projects.length];
    }

    const getNumOfSubElements = () => projects.length;

    const updateStorage = () => {
        const stored = []
        projects.forEach( project => {
            stored[project.getIndex()] = (
                {
                    name: project.getName(),
                    index: project.getIndex(),
                    toDoArray: project.getStringifiedToDos()
                }
            );
        })
        storage.setItem("projects", JSON.stringify(stored));
    };

    const loadStorage = () => {
        if(!storage.getItem("projects")) return;
        const stored = JSON.parse(storage.getItem("projects"));
        console.log(stored);
        stored.forEach(project => {
            projects[project.index] = Project(
                project.name,
                project.index,
                loadToDosFromJSON(project.toDoArray)
            );
        })
    }

    const loadToDosFromJSON = (stringifiedToDos) => {
        const stored = JSON.parse(stringifiedToDos);
        const result = [];
        stored.forEach(toDo => result[toDo.index] = ToDo(
            toDo.title,
            new Date(toDo.dueDate),
            toDo.description,
            Number.parseInt(toDo.priority),
            Number.parseInt(toDo.index),
            Number.parseInt(toDo.projectIndex)
        ))
        return result;
    }

    return {
        addProject,
        removeProject,
        addToDoToProject,
        removeToDoFromProject,
        getIthSubElement,
        getNumOfSubElements,
        updateStorage,
        loadStorage
    };
}