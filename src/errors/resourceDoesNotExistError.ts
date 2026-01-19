import CustomError, {CustomErrorProps} from "./customError"

export default class ResourceDoesNotExistError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "ResourceDoesNotExistError",
      message: "Resource does not exist.",
      title: "The requested resource could not be found",
      description: "You just requested a resource that is not (or no longer) in the system. Maybe it was recently deleted?",
      httpCode: 404,
      ...props
    })
  }
}
