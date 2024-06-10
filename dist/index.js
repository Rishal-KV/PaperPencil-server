"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/config/app");
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./infrastructure/config/connectDB"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./infrastructure/config/socket");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, ".env") });
console.log("process.env.jwt_secret:", process.env.jwt_secret);
const startServer = async () => {
    try {
        (0, connectDB_1.default)();
        const app = (0, app_1.createServer)();
        const server = http_1.default.createServer(app);
        const io = (0, socket_1.initializeSocket)(server);
        server?.listen(3000, () => {
            console.log("server is running");
        });
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
