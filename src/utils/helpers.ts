export const generateAccountNumber = () => {
    const uniqueAccountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return uniqueAccountNumber.toString();
}