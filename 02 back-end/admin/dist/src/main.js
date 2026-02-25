"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    app.use((0, compression_1.default)());
    app.use((0, express_session_1.default)({
        secret: 'superSecretKey',
        resave: false,
        saveUninitialized: false
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.setBaseViewsDir((0, path_1.join)(process.cwd(), 'views'));
    app.setViewEngine('ejs');
    app.useStaticAssets((0, path_1.join)(process.cwd(), '../../01 front-end'));
    await app.listen(process.env.PORT || 3900);
}
bootstrap();
//# sourceMappingURL=main.js.map