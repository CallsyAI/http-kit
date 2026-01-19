import CustomError, {CustomErrorProps} from "./customError"

export default class ConflictError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "ConflictError",
      message: "Conflict.",
      title: "Conflict",
      description: "The request conflicts with the current state of the server.",
      httpCode: 409,
      ...props
    })
  }
}