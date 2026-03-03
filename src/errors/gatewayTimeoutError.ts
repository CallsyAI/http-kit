import CustomError, {CustomErrorProps} from "./customError.js"

export default class GatewayTimeoutError extends CustomError {
  public static readonly NAME = "GatewayTimeoutError"

  constructor(props?: CustomErrorProps) {
    super({
      name: GatewayTimeoutError.NAME,
      message: "Gateway timeout.",
      title: "Gateway timeout",
      description: "The server did not receive a timely response from an upstream server.",
      httpCode: 504,
      ...props
    })
  }
}

CustomError.register(GatewayTimeoutError)