import CustomError, {CustomErrorProps} from "./customError"

export default class NotAcceptableError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "NotAcceptableError",
      message: "Not acceptable.",
      title: "Not acceptable",
      description: "The server cannot produce a response matching the list of acceptable values defined in the request headers.",
      httpCode: 406,
      ...props
    })
  }
}