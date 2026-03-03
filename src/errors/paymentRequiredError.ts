import CustomError, {CustomErrorProps} from "./customError.js"

export default class PaymentRequiredError extends CustomError {
  public static readonly NAME = "PaymentRequiredError"

  constructor(props?: CustomErrorProps) {
    super({
      name: PaymentRequiredError.NAME,
      message: "Payment required.",
      title: "Payment required",
      description: "Payment is required to access this resource.",
      httpCode: 402,
      ...props
    })
  }
}

CustomError.register(PaymentRequiredError)