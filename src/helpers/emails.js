import nodemailer from 'nodemailer'

export const emailRegister =async (data) => {
    console.log('Datos: ',data)

    let {email, name, token} = data

    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "96363c40d40b66",
            pass: "4af715e04d471d"
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