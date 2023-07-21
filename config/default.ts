require("dotenv").config();

export default {
    port: 3000,
    dbUri: process.env.MONGODB_URI,
    saltWorkFactor: 10,
};
