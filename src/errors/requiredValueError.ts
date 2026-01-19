import CustomError, {CustomErrorProps} from "./customError"

/**
 * An error that explicitly tells that some given value was
 * not supposed to be null / undefined or falsy in general.
 */
export default class RequiredValueError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "RequiredValueError",
      message: "Value can not be empty.",
      title: "Provided value is empty",
      description: "The provided value was empty, but it can not be empty. Please check your input and try again.",
      httpCode: 400,
      ...props
    })
  }
}
