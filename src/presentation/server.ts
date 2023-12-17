import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-service"


export class Server {
    public static start(){
        console.log('Server started... 🟢')
        CronService.cerateJob('*/2 * * * * *',
        () => {
            const url = 'https://google.com' 
            // new CheckService().execute('http://localhost:3000/posts')
            new CheckService(
                () => console.log(` ${url} Successfully`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}


