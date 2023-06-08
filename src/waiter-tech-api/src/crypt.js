import bcrypt from 'bcrypt'

export function encrypt(password)
{
    const saltRounds = 10
    return bcrypt.hashSync(password, saltRounds);
}

export function comparePasswords(passwordAttempt, userHash)
{
    return bcrypt.compareSync(passwordAttempt, userHash)
}