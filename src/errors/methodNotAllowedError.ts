import CustomError, {CustomErrorProps} from "./customError.js"

export default class MethodNotAllowedError extends CustomError {
  public static readonly NAME = "MethodNotAllowedError"

  constructor(props?: CustomErrorProps) {
    super({
      name: MethodNotAllowedError.NAME,
      message: "Method not allowed.",
      title: "Method not allowed",
      description: "The HTTP method used is not supported for this resource.",
      httpCode: 405,
      // An unsupported HTTP method is a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(MethodNotAllowedError)