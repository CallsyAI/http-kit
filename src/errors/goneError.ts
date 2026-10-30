import CustomError, {CustomErrorProps} from "./customError.js"

export default class GoneError extends CustomError {
  public static readonly NAME = "GoneError"

  constructor(props?: CustomErrorProps) {
    super({
      name: GoneError.NAME,
      message: "Resource gone.",
      title: "Resource gone",
      description: "The requested resource is no longer available and will not be available again.",
      httpCode: 410,
      // A permanently removed resource is a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(GoneError)