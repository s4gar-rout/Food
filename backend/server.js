import dns from 'dns'
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import app from "./src/app/app.js"
import { configs } from './src/configs/config.js';
import { connectToDB } from './src/configs/db.js';

app.listen(configs.PORT, () => {
    console.log(`Server running on port ${configs.PORT} sucessfully ✅`)
})

connectToDB();
