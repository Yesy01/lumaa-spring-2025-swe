"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
// Root endpoint to verify the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});
// Use authentication and task routes
app.use('/auth', authRoutes_1.default);
app.use('/tasks', taskRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
