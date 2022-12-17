export const generateId = () => {
    let random = Math.random().toString(32).substring(2)
    let date = Date.now().toString()
    return random + date
}