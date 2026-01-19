import CustomError, {CustomErrorProps} from "./customError"

interface InvalidInputErrorProps extends CustomErrorProps {
  // A record of invalid fields where keys are field names
  // and values are error messages specific to that field.
  invalidFields?: Record<string, string>
}

export default class InvalidInputError extends CustomError {
  private invalidFields?: Record<string, string> = {}

  constructor(props?: InvalidInputErrorProps) {
    super({
      name: "InvalidInputError",
      message: "Invalid input.",
      title: "Some of the inputs are not correct",
      description: "You have provided information that is not valid. Please check your input and try again.",
      httpCode: 400,
      ...props
    })
    this.invalidFields = props?.invalidFields
  }

  public getInvalidFields(): Record<string, string> {
    return this.invalidFields ?? {}
  }

  public toObject() {
    return {
      ...super.toObject(),
      invalidFields: this.getInvalidFields()
    }
  }
}
