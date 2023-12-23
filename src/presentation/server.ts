import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"


const fileSystemlogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server {
    public static start(){
        console.log('Server started... 🟢')
        // Mandar email
        const emailService = new EmailService()        
        emailService.sendEmailWithFileSystemLogs(
            ['matias98cs@gmail.com']
        )
        // emailService.sendEmail({
        //     to: 'matias98cs@gmail.com',
        //     subject: "Logs de sistema",
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC</h3>
        //         <p>Ver logs adjuntos</p>
        //     `
        // })
        // CronService.cerateJob('*/2 * * * * *',
        // () => {
        //     const url = 'https://google.com'
        //     // const url = 'http://localhost:3000/posts'
        //     new CheckService(
        //         fileSystemlogRepository,
        //         () => console.log(`${url} is OK`),
        //         (error) => console.log(error)
        //     ).execute(url)
        // })
    }
}


