import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmialLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infrastructure/datasources/mong-log-datasource"
import { MysqlLogDataSource } from "../infrastructure/datasources/mysql-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // new MongoLogDataSource()
    // new MysqlLogDataSource()
)

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
)


const mysqlLogRepository = new LogRepositoryImpl(
    new MysqlLogDataSource()
)


const emailService = new EmailService()

export class Server {
    public static async start(){
        console.log('Server started... 🟢')

        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)
        // Mandar email
        // new SendEmialLogs(
        //     emailService,
        //     fileSystemlogRepository
        // ).execute(
        //     ['matias98cs@gmail.com']
        // )
        // const emailService = new EmailService(
        //     // fileSystemlogRepository
        // )        
        // emailService.sendEmailWithFileSystemLogs(
        //     ['matias98cs@gmail.com']
        // )
        // emailService.sendEmail({
        //     to: 'matias98cs@gmail.com',
        //     subject: "Logs de sistema",
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC</h3>
        //         <p>Ver logs adjuntos</p>
        //     `
        // })
        CronService.cerateJob('*/8 * * * * *',
        () => {
            const url = 'https://google.com'
            // const url = 'http://localhost:3000/posts'
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, mysqlLogRepository],
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}


