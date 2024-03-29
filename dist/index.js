"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_route_1 = __importDefault(require("./route/client/index.route"));
const moment_1 = __importDefault(require("moment"));
const body_parser_1 = __importDefault(require("body-parser"));
const system_1 = require("./config/system");
const index_route_2 = require("./route/admin/index.route");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_flash_1 = __importDefault(require("express-flash"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const cors = require('cors');
const corsOptions = {
    origin: 'https://tour-management-sigma.vercel.app',
};
app.use(cors());
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.locals.moment = moment_1.default;
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)('maianh20'));
app.use((0, express_session_1.default)({ cookie: { maxAge: 60000 } }));
app.use((0, express_flash_1.default)());
app.locals.flash = express_flash_1.default;
app.use(express_1.default.static(`${__dirname}/public`));
app.use((0, method_override_1.default)('_method'));
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_modules", "tinymce")));
(0, index_route_1.default)(app);
(0, index_route_2.adminRoute)(app);
app.listen(port, () => {
    console.log("Port : " + port);
});
