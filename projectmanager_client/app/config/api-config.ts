const ApiConfig = {
  BASE_URL: 'https://project-management-bak.herokuapp.com/api',
  AUTH: 'user/login',
  USER: {
    UPDATE: 'user/update-info',
    BY_ID: 'user/get-by-id',
    FETCH_PROJECT: 'user/search-project',
    FETCH_ALL_USER: 'user/search-user',
  },
  PROJECT: {
    CREATE: 'project/create',
    UPDATE: 'project/update-info',
    BY_ID: 'project/get-by-id',
    ADD_USER: 'project/add-user',
    REMOVE_USER: 'project/remove-user',
    FETCH_USER: 'project/search-user',
    FETCH_TASK: 'project/search-task',
    FETCH_USER_TASK: 'project/search-user-task',
  },
  TASK: {
    CREATE: 'task/create',
    UPDATE: 'task/update-info',
    BY_ID: 'task/get-by-id',
    ASSIGN: 'task/assign',
    UNASSIGN: 'task/unassign',
    FETCH_USER: 'task/search-user',
  },
  SUBTASK: {
    CREATE: 'task/create-subtask',
    UPDATE: 'task/update-subtask',
  },
  STATUS: {
    TODO: 'task/set-todo',
    DOING: 'task/set-doing',
    DONE: 'task/set-done',
    DELETE: 'task/set-delete',
  },
}

export default ApiConfig
