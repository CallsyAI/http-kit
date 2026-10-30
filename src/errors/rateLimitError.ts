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
      // An exceeded rate limit is a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(RateLimitError)
