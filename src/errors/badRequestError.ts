import CustomError, {CustomErrorProps} from "./customError.js"

export default class BadRequestError extends CustomError {
  public static readonly NAME = "BadRequestError"

  constructor(props?: CustomErrorProps) {
    super({
      name: BadRequestError.NAME,
      message: "Bad request.",
      title: "Bad request",
      description: "The server cannot process the request due to a client error.",
      httpCode: 400,
      ...props
    })
  }
}

CustomError.register(BadRequestError)