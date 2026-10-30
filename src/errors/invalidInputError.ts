import CustomError, {CustomErrorProps} from "./customError.js"

interface InvalidInputErrorProps extends CustomErrorProps {
  // A record of invalid fields where keys are field names
  // and values are error messages specific to that field.
  invalidFields?: Record<string, string>
}

export default class InvalidInputError extends CustomError {
  public static readonly NAME = "InvalidInputError"

  private invalidFields?: Record<string, string> = {}

  constructor(props?: InvalidInputErrorProps) {
    super({
      name: InvalidInputError.NAME,
      message: "Invalid input.",
      title: "Some of the inputs are not correct",
      description: "You have provided information that is not valid. Please check your input and try again.",
      httpCode: 400,
      // Invalid input is a refusal the caller can resolve, not a fault.
      isCritical: false,
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

CustomError.register(InvalidInputError)
