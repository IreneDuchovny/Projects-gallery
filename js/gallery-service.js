'use strict'


function getProjects(){
    return gProjects
}


function getProjectById(projectId){
    var project = gProjects.find(project => project.id === projectId)
    return project
}