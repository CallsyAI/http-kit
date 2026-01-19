import CustomError, {CustomErrorProps} from "./customError"

export default class MaintenanceModeError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "MaintenanceModeError",
      message: "We're currently performing scheduled maintenance. Please try again shortly.",
      title: "Maintenance Mode",
      description: "The application is temporarily unavailable due to scheduled maintenance.",
      httpCode: 503,
      ...props
    })
  }
}
