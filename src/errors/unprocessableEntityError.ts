import CustomError, {CustomErrorProps} from "./customError"

export default class UnprocessableEntityError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "UnprocessableEntityError",
      message: "Unprocessable entity.",
      title: "Unprocessable entity",
      description: "The request was well-formed but contains semantic errors.",
      httpCode: 422,
      ...props
    })
  }
}