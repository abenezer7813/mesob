const USERS_KEY = 'mesob_users'

export function registerUser(user) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || []

    const exists = users.some((u) => u.email === user.email)
    if (exists) {
        throw new Error('An account With this email is Already Exists')
    }

    users.push(user)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
export function login(user) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || []
    const exist = users.find((u) => u.email === user.email)
    if (!exist) throw new Error('Invalid Email')
    if (exist.password !== user.password) throw new Error('Invalid Password')

    return exist


}