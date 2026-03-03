import CustomError, {CustomErrorProps} from "./customError.js"

export default class MaintenanceModeError extends CustomError {
  public static readonly NAME = "MaintenanceModeError"

  constructor(props?: CustomErrorProps) {
    super({
      name: MaintenanceModeError.NAME,
      message: "We're currently performing scheduled maintenance. Please try again shortly.",
      title: "Maintenance Mode",
      description: "The application is temporarily unavailable due to scheduled maintenance.",
      httpCode: 503,
      ...props
    })
  }
}

CustomError.register(MaintenanceModeError)
