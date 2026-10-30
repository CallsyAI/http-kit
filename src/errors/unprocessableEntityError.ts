import CustomError, {CustomErrorProps} from "./customError.js"

export default class UnprocessableEntityError extends CustomError {
  public static readonly NAME = "UnprocessableEntityError"

  constructor(props?: CustomErrorProps) {
    super({
      name: UnprocessableEntityError.NAME,
      message: "Unprocessable entity.",
      title: "Unprocessable entity",
      description: "The request was well-formed but contains semantic errors.",
      httpCode: 422,
      // A semantically invalid request is a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(UnprocessableEntityError)