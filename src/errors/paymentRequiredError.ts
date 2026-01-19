import CustomError, {CustomErrorProps} from "./customError"

export default class PaymentRequiredError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "PaymentRequiredError",
      message: "Payment required.",
      title: "Payment required",
      description: "Payment is required to access this resource.",
      httpCode: 402,
      ...props
    })
  }
}