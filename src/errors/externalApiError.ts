import CustomError, {CustomErrorProps} from "./customError.js"

export default class ExternalApiError extends CustomError {
  public static readonly NAME = "ExternalApiError"

  constructor(props?: CustomErrorProps) {
    super({
      name: ExternalApiError.NAME,
      message: "An error happened when calling an external api.",
      title: "External system error",
      description: "There was an internal error due to an error from an external API.",
      httpCode: 424,
      ...props
    })
  }
}

CustomError.register(ExternalApiError)
