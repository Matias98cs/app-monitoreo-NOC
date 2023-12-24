import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface sendEmailOptions {
    to: string | string[]
    subject: string
    htmlBody: string
    attachements?: Attachement[]
}

interface Attachement {
    fileName: string
    path: string
}


export class EmailService {
    private trasporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(){}

    async sendEmail(options: sendEmailOptions): Promise<boolean> {
        const {to, subject, htmlBody, attachements = []} = options

        try {
            const sendInformation = await this.trasporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachements
            })
            return true
        } catch (error) {
            return false
        }

    }
    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Ver logs adjuntos</p>
            
            `
        const attachements: Attachement[] = [
            {fileName: 'logs-all.log', path: './logs/logs-all.log'},
            {fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
            {fileName: 'logs-high.log', path: './logs/logs-high.log'},
        ]

        return this.sendEmail({to, subject, attachements, htmlBody})
    }
}