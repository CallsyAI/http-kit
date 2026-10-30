import CustomError, {CustomErrorProps} from "./customError.js"

export default class RequestTimeoutError extends CustomError {
  public static readonly NAME = "RequestTimeoutError"

  constructor(props?: CustomErrorProps) {
    super({
      name: RequestTimeoutError.NAME,
      message: "Request timeout.",
      title: "Request timeout",
      description: "The server timed out waiting for the request.",
      httpCode: 408,
      // A request sent too slowly is a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(RequestTimeoutError)