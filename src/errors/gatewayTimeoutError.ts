import CustomError, {CustomErrorProps} from "./customError"

export default class GatewayTimeoutError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "GatewayTimeoutError",
      message: "Gateway timeout.",
      title: "Gateway timeout",
      description: "The server did not receive a timely response from an upstream server.",
      httpCode: 504,
      ...props
    })
  }
}