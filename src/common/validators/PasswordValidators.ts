export interface PasswordTestResult {
    message: string
    isValid: boolean
}

export const isPasswordValid = ( password: string ): PasswordTestResult => {

    const PasswordTestResult: PasswordTestResult = {
        message: "",
        isValid: true
    }

    if ( password.length < 8 ) {
        PasswordTestResult.message = "Password must be at least 8 characters"
        PasswordTestResult.isValid = false
        return PasswordTestResult
    }

    const strongPassword = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    )

    if (!strongPassword.test(password)) {
        PasswordTestResult.message = "Password must contain at least 1 special character, 1 cap letter, and 1 number";
        PasswordTestResult.isValid = false
    }

    return PasswordTestResult
}