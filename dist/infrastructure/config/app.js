"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const studentRoute_1 = __importDefault(require("../routes/studentRoute"));
const instructorRoute_1 = __importDefault(require("../routes/instructorRoute"));
const adminRoute_1 = __importDefault(require("../routes/adminRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cookie_parser_1.default)());
        app.use((0, cors_1.default)({
            origin: 'https://paper-pencil-client.vercel.app',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true
        }));
        app.use('/', studentRoute_1.default);
        app.use('/instructor', instructorRoute_1.default);
        app.use('/admin', adminRoute_1.default);
        return app;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createServer = createServer;
