import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"


const fileSystemlogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server {
    public static start(){
        console.log('Server started... 🟢')
        CronService.cerateJob('*/2 * * * * *',
        () => {
            const url = 'https://google.com'
            // const url = 'http://localhost:3000/posts'
            new CheckService(
                fileSystemlogRepository,
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}


