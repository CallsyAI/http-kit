import CustomError, {CustomErrorProps} from "./customError.js"

export default class ForbiddenError extends CustomError {
  public static readonly NAME = "ForbiddenError"

  constructor(props?: CustomErrorProps) {
    super({
      name: ForbiddenError.NAME,
      message: "Access forbidden.",
      title: "Access forbidden",
      description: "You do not have permission to access this resource.",
      httpCode: 403,
      ...props
    })
  }
}

CustomError.register(ForbiddenError)