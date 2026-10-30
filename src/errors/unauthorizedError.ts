import CustomError, {CustomErrorProps} from "./customError.js"

export default class UnauthorizedError extends CustomError {
  public static readonly NAME = "UnauthorizedError"

  constructor(props?: CustomErrorProps) {
    super({
      name: UnauthorizedError.NAME,
      message: "Authentication required.",
      title: "Authentication required",
      description: "You must provide valid authentication credentials to access this resource.",
      httpCode: 401,
      // Missing or invalid credentials are a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(UnauthorizedError)
