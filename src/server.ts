import mongoose from "mongoose";
import app from "./app"
import config from "./app/config";

async function server() {
    try {
        await mongoose.connect(config.database_uri as string)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        app.listen(config.running_port, () => {
            console.log(`Server is running on the port ${config.running_port}`);
        })
    }
}
server()