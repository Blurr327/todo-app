export { AppModel }

function ToDo(title, dueDate, description, priority, checked, i) {
    let inTitle,
        inDueDate,
        inDescription,
        inPriority,
        inChecked,
        index;

    setTitle(title), setDueDate(dueDate),
    setDescription(description), setPriority(priority),
    setChecked(checked), setIndex(i);

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
    const setChecked = (c) => {
        if (typeof c === "boolean") inChecked = c;
    };

    const getIndex = () => index;
    const setIndex = (i) => {
        if(Number.isInteger(i)) index = i;
    }

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
        setChecked,
        getIndex,
        setIndex
    };
}


function Project(name, i) {
    let inName = name;
    let index;
    const toDoArray = [];

    setIndex(i);

    const getIthToDo = (i) => toDoArray[i%toDoArray.length];
    const addToDo = (title, dueDate, description, priority, checked) => {
        toDoArray.push(ToDo(title,dueDate,description,priority,checked, toDoArray.length));
    }
    const removeToDo =   (toDo) => {
        if(getIndex in toDo) delete toDoArray[toDo.getIndex()%toDoArray.length];
    }


    const getName = () => inName;
    const setName = (name) => {
        if(typeof name === "string") inName = name;
    }

    return {
        getIthToDo,
        addToDo,
        removeToDo,
        getName,
        setName
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

    const addToDoToProject = (project, dueDate, description, priority, checked) => {
        if(addToDo in project) project.addToDo(dueDate, description, priority, checked);
    };

    const removeToDoFromProject = (project, toDo) => {
        if(removeToDo in project) project.removeToDo(toDo);
    }

    return {
        addProject,
        removeProject,
        addToDoToProject,
        removeToDoFromProject
    };
}