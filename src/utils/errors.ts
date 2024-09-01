export const buildError = (errorList: string[]): string => {
    return `Validation failed: ${errorList.reduce((errorText, error) => `${errorText}${errorText ? `, ${error}` : error}`, '')}`
}