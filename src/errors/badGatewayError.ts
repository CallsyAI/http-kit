import CustomError, {CustomErrorProps} from "./customError.js"

export default class BadGatewayError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "BadGatewayError",
      message: "Bad gateway.",
      title: "Bad gateway",
      description: "The server received an invalid response from an upstream server.",
      httpCode: 502,
      ...props
    })
  }
}