import { createProject } from "./commands/CreateProject.js";
import { deleteProject } from "./commands/DeleteProject.js";
import { updateProject } from "./commands/UpdateProject.js";
import { getAllProject } from "./queries/GetAllProject.js";

export const ProjectRepository = {
    commands: {
        createProject,
        deleteProject,
        updateProject
    },
    queries: {
        getAllProject
    }
}