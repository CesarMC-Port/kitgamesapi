const templates = {
    PASSWORD_TEMPLATE: {
        subject: () => `Cambia tu contraseña de GESLORD`,
        body: (token:string) =>  `
            <!DOCTYPE html>
            <html lang="es">
            
            <body style="margin: 0; padding: 0;">
            <style>
                body {
                    font-family: 'Lato', sans-serif;
                    background-color: #eee;
                }
            
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
            
                td img+div {
                    display: none;
                }
            </style>
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="500"
                style="border-collapse: collapse; text-align: left">
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="#297F87">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="#297F87">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="#297F87">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr bgColor="#297F87" align="center" style="padding: 40px 0 30px 0;">
                <td>
                    <h1 style="color: white; font-size: 50px; letter-spacing: 5px;">Geslord</h1>
                </td>
                </tr>
                <tr border="0" bgColor="#297F87">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="#297F87">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="#297F87">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="white">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr bgColor="white" style="padding: 0 60px;">
                <td style="padding: 30px 60px; color: grey; font-size: 1.5em; padding-bottom: 5px;">
                    <b>Estas a pocos pasos de cambiar tu contraseña.</b>
                </td>
                </tr>
                <tr bgColor="white" style="padding: 20px 60px;">
                    <td style="padding: 30px 60px; color: grey; font-size: 1rem">
                    <a href="${process.env.URL_WEB || 'http://localhost:8081/'}/recoverypasswordurl/${token}"
                        style="cursor: pointer; text-decoration: none; display: inline-block; background: #e51818; color: white; padding: 1rem; border-radius: 5px"
                    >
                        recupera tu contraseña
                    </a>
                    </td>
                </tr>
                <tr border="0" bgColor="white">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="white">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="white">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" bgColor="white">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
            </table>
            </body>
            
            </html>
        `
    },
    CODIGO_TEMPLATE: {
        subject: () => `Código de verificación de correo`,
        body: (numero1:string,numero2:string,numero3:string,numero4:string) => `
            <!DOCTYPE html>
            <html lang="es">
            
            <body style="margin: 0; padding: 0;">
            <style>
                body {
                font-family: 'Lato', sans-serif;
                background-color: #eee;
                }
            
                @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
            
                td img+div {
                display: none;
                }
            </style>
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="500px"
                style="border-collapse: collapse; text-align: center">
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="font-size: 0; line-height: 0;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0" colspan="8">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87 ; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" style="padding: 40px 0 30px 0;">
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="background:#297F87; width: 480px; " colspan="6">
                        <h1 style="color: white; font-size: 50px; letter-spacing: 5px; margin: 25px;">Geslord</h1>
                    </td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" style="padding: 40px 0 30px 0;">
                    <td style="line-height: 0; width:10px; background:#297F87;" border="0">&nbsp;</td>
                    <td style="background:#297F87; width: 480px;" colspan="6">
                    <h4 style="color: white; font-size: 25px; letter-spacing: 1px; margin: 0px; padding: 0px 10px 0px 10px;">Tu codigo de seguridad es:</h4>
                    </td>
                    <td style="line-height: 0; width:10px; background:#297F87;" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 50px;" height="10" border="0">&nbsp;</td>
                    <td style="background:#297F87; width: 45px;" align="center" colspan="4">
                        <h1 style="color: white; font-size: 50px; text-align: center;">${numero1}${numero2}${numero3}${numero4}</h1>
                    </td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 50px;" height="10" border="0">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0" >
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                    <td style="font-size: 0;  line-height: 0; background:#297F87; width: 480px;" height="10" border="0" colspan="6">&nbsp;</td>
                    <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0">&nbsp;</td>
                </tr>
                <tr border="0">
                <td style="line-height: 0; width:10px; background:#297F87;" height="10" border="0" colspan="8">&nbsp;</td>
                </tr>
            </table>
            </body>
            
            </html>
        `
    }
}

export default templates