import nodemailer from 'nodemailer'

export const emailRegister =async (data) => {
    let {email, name, token} = data

    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
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
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
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