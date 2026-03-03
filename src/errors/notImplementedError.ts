import CustomError, {CustomErrorProps} from "./customError.js"

export default class NotImplementedError extends CustomError {
  public static readonly NAME = "NotImplementedError"

  constructor(props?: CustomErrorProps) {
    super({
      name: NotImplementedError.NAME,
      message: "Not implemented.",
      title: "Not implemented",
      description: "The server does not support the functionality required to fulfill the request.",
      httpCode: 501,
      ...props
    })
  }
}

CustomError.register(NotImplementedError)