export class LoginModel {
  static MIN_PASS_LENGH = 4
  static MAX_PASS_LENGH = 72
  static MESSAGE_PASSWORD = "Senha deve ter entre 4 e 72 dígitos"

  static validatePassword(password) {
    if (password.length < LoginModel.MIN_PASS_LENGH || password.length > LoginModel.MAX_PASS_LENGH) {
      return {
        valid: false,
        text: LoginModel.MESSAGE_PASSWORD
      }
    }

    return { valid: true, text: "" }
  }
}