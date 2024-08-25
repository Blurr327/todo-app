export { AppModel }

function ToDo(title, dueDate, description, priority, i) {
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
    setIndex(i);

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


function Project(name, i) {
    let inName = name;
    let index;
    const toDoArray = [];

    const getIthSubElement = (i) => toDoArray[i%toDoArray.length];
    const addToDo = (title, dueDate, description, priority) => {
        const toDo = ToDo(title,dueDate,description,priority, toDoArray.length);
        toDo.setAssociatedProjectIndex(index);
        toDoArray.push(toDo);
    }
    const removeToDo =   (toDo) => {
        if(getIndex in toDo) delete toDoArray[toDo.getIndex()%toDoArray.length];
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

    setIndex(i);

    return {
        getIthSubElement,
        addToDo,
        removeToDo,
        getName,
        setName,
        getNumOfSubElements,
        getIndex
    };
}

function AppModel() {
    const projects = [];

    const addProject = (name) => {
        projects.push(Project(name, projects.length));
    }
    const removeProject = (project) => {
        if(getIndex in project) delete toDoArray[project.getIndex()%projects.length]
    }

    const addToDoToProject = (project, title, dueDate, description, priority) => {
        project.addToDo(title, dueDate, description, priority);
    };

    const removeToDoFromProject = (project, toDo) => {
        if(removeToDo in project) project.removeToDo(toDo);
    }

    const getIthSubElement = (i) => {
        return projects[i%projects.length];
    }

    const getNumOfSubElements = () => projects.length;

    return {
        addProject,
        removeProject,
        addToDoToProject,
        removeToDoFromProject,
        getIthSubElement,
        getNumOfSubElements,
    };
}