"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'rosonoem@gmail.com',
            pass: 'joqdciqrfinxnnop'
        }
    };
    const message = {
        from: '"Node Foo 👻" <admin@alka.cloud>',
        to: "mrojas@alka.cloud",
        subject: "Hello ✔",
        html: "<b>Hello world?</b>"
    };
    try {
        const transport = nodemailer_1.default.createTransport(config);
        yield transport.verify(); // Verify connection configuration
        const info = yield transport.sendMail(message);
        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
(0, exports.sendMail)();
//# sourceMappingURL=emailController.js.map