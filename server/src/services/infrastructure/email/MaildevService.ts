import nodemailer from 'nodemailer'
import { type IEmailService } from './IEmailService.js'

export class MaildevService implements IEmailService{
    private transporter: nodemailer.Transporter;
    constructor(
        private readonly _host: string, 
        private readonly _port: number,
        private readonly _base_url_client: string
    ) {
        this.transporter = nodemailer.createTransport({
            host: this._host,
            port: this._port,
            ignoreTLS: true
        })
    }

    async send(to: string, subject: string, body: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: '"Matrix ERP" <no-reply@matrix.omc>',
                to,
                subject,
                html: body
            })            
        } catch (error) {
            throw new Error('No se pudo enviar el correo electrónico');
        }
    }  
    
    async sendPasswordReset(to: string, subject: string, body: string,  token: string) : Promise<void>{
        try{
            const htmlContent = `${body} ${this._base_url_client}/password/reset/${token}`

            await this.transporter.sendMail({
                from: '"Matrix ERP" <no-reply@matrix.omc>',
                to,
                subject,
                html: htmlContent                
            })            
        }catch(error){
            throw new Error('No se pudo enviar el correo electrónico');
        }
    }
}


