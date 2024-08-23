export { AppModel }

function ToDo(title, dueDate, description, priority, checked, i) {
    let inTitle,
        inDueDate,
        inDescription,
        inPriority,
        inChecked,
        index;

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

    const getChecked = () => inChecked;
    const toggleChecked = () => {
        inChecked = !inChecked;
    };

    const getIndex = () => index;
    const setIndex = (i) => {
        if(Number.isInteger(i)) index = i;
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
        setIndex
    };
}


function Project(name, i) {
    let inName = name;
    let index;
    const toDoArray = [];

    const getIthToDo = (i) => toDoArray[i%toDoArray.length];
    const addToDo = (title, dueDate, description, priority) => {
        toDoArray.push(ToDo(title,dueDate,description,priority, toDoArray.length));
    }
    const removeToDo =   (toDo) => {
        if(getIndex in toDo) delete toDoArray[toDo.getIndex()%toDoArray.length];
    }
    const getNumOfToDos = () => toDoArray.length;


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
        getIthToDo,
        addToDo,
        removeToDo,
        getName,
        setName,
        getNumOfToDos,
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

    const getIthProject = (i) => {
        if(Number.isInteger(i)) return projects[i%projects.length];
    }

    const getNumOfProjects = () => projects.length;

    return {
        addProject,
        removeProject,
        addToDoToProject,
        removeToDoFromProject,
        getIthProject,
        getNumOfProjects
    };
}