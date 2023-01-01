import nodemailer from 'nodemailer'

export const emailRegister =async (data) => {
    let {email, name, token} = data

    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: '96363c40d40b66',
            pass: '4af715e04d471d'
        }
    })

    //Informacion del email
    let info =  await transport.sendMail({
        from: '"Manager Tasker - Administrador de proyectos <cuentas@uptask.com>"',
        to: email,
        subject: "Up tasks - Comprueba tu cuenta",
        text: 'Comprueba tu cuenta en Manager Tasker',
        html: `
            <p>Hola ${name} Comprueba tu cuenta.</p>
            <a href="http://localhost:5173/confirmar/${token}">Comprobar Cuenta</a>
        `
    })
}

export const emailForgetPassWord =async (data) => {
    let {email, name, token} = data
    //TODO: mover a varibles de entorno
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: '96363c40d40b66',
            pass: '4af715e04d471d'
        }
    })

    //Informacion del email
    let info =  await transport.sendMail({
        from: '"Manager Tasker - Restablece tu clave (password) <cuentas@uptask.com>"',
        to: email,
        subject: "Up tasks - Comprueba tu cuenta",
        text: 'Restablece tu password',
        html: `
            <p>Hola ${name} Restablece tu password.</p>
            <a href="http://localhost:5173/olvide-password/${token}">
                Restablecer Password
            </a>
        `
    })
}