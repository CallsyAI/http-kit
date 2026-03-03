import CustomError, {CustomErrorProps} from "./customError.js"

export default class ConflictError extends CustomError {
  public static readonly NAME = "ConflictError"

  constructor(props?: CustomErrorProps) {
    super({
      name: ConflictError.NAME,
      message: "Conflict.",
      title: "Conflict",
      description: "The request conflicts with the current state of the server.",
      httpCode: 409,
      ...props
    })
  }
}

CustomError.register(ConflictError)