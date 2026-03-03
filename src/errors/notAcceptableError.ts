import CustomError, {CustomErrorProps} from "./customError.js"

export default class NotAcceptableError extends CustomError {
  public static readonly NAME = "NotAcceptableError"

  constructor(props?: CustomErrorProps) {
    super({
      name: NotAcceptableError.NAME,
      message: "Not acceptable.",
      title: "Not acceptable",
      description: "The server cannot produce a response matching the list of acceptable values defined in the request headers.",
      httpCode: 406,
      ...props
    })
  }
}

CustomError.register(NotAcceptableError)