import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'waiter-tech@outlook.com',
        pass: '@WaiterTech01245'

    }
})

export const sendMail = (id, to) =>
{
    try {
        transport.sendMail({
            from: 'WaiterTech Support <waiter-tech@outlook.com>',
            to: to,
            subject: 'Recuperação de senha',
            html: `<p>Olá. Abaixo, está o link para recuperação de sua senha!</p><br><a href="https://waiter-tech.netlify.app/password-recovery?id=${id}">Link para Recuperação de Senha</a>`
        })
    } catch (err) {
        console.log(err)
    }
}