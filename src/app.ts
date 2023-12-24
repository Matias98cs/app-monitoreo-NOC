import { envs } from "./config/plugins/envs.plugin"
import { LogModel, MongoDataBase } from "./data/mongo"
import { Server } from "./presentation/server"

(async() => {
    main()
})()


async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    // crear una coleccion
    // const newLog = await LogModel.create({
    //     message: "Test mensaje desde mongo",
    //     origin: 'App.ts',
    //     level: 'low',
    // })

    // await newLog.save()

    // console.log(newLog)
    // const logs = await LogModel.find()
    // console.log(logs)

    // Server.start()
}