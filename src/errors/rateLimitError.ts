import CustomError, {CustomErrorProps} from "./customError.js"

export default class RateLimitError extends CustomError {
  public static readonly NAME = "RateLimitError"

  constructor(props?: CustomErrorProps) {
    super({
      name: RateLimitError.NAME,
      message: "Rate limit reached. Please try again later.",
      title: "Too many requests",
      description: "You tried to do this action too many times. Please wait and try again later.",
      httpCode: 429,
      ...props
    })
  }
}

CustomError.register(RateLimitError)
