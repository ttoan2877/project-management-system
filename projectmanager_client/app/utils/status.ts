import { Status } from 'models/api/task'
import AppStyles from 'config/styles'
import ApiConfig from 'config/api-config'

export const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.TODO:
      return AppStyles.color.ORANGE
    case Status.DOING:
      return AppStyles.color.PRIMARY
    case Status.DONE:
      return AppStyles.color.GREEN
    case Status.CLOSED:
      return AppStyles.color.DANGER
    default:
      return AppStyles.color.ORANGE
  }
}

export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.TODO:
      return 'Incompleted'
    case Status.DOING:
      return 'In progress'
    case Status.DONE:
      return 'Completed'
    case Status.CLOSED:
      return 'Closed'
    default:
      return 'Incompleted'
  }
}

export const getStatusRoute = (status: Status) => {
  switch (status) {
    case Status.TODO:
      return ApiConfig.STATUS.TODO
    case Status.DOING:
      return ApiConfig.STATUS.DOING
    case Status.DONE:
      return ApiConfig.STATUS.DONE
    case Status.CLOSED:
      return ApiConfig.STATUS.DELETE
  }
}
