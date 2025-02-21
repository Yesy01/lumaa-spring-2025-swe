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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const result = yield pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
        void res.json(result.rows);
        return;
    }
    catch (err) {
        console.error(err);
        void res.status(500).json({ error: 'Error fetching tasks' });
        return;
    }
});
exports.getTasks = getTasks;
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const userId = req.userId;
    try {
        const result = yield pool.query('INSERT INTO tasks (title, description, "isComplete", "userId") VALUES ($1, $2, $3, $4) RETURNING *', [title, description || '', false, userId]);
        void res.status(201).json(result.rows[0]);
        return;
    }
    catch (err) {
        console.error(err);
        void res.status(500).json({ error: 'Error creating task' });
        return;
    }
});
exports.createTask = createTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { title, description, isComplete } = req.body;
    const userId = req.userId;
    try {
        const result = yield pool.query(`UPDATE tasks 
       SET title = $1, description = $2, "isComplete" = $3 
       WHERE id = $4 AND "userId" = $5 
       RETURNING *`, [title, description || '', isComplete, taskId, userId]);
        if (result.rowCount === 0) {
            void res.status(404).json({ error: 'Task not found or unauthorized' });
            return;
        }
        void res.json(result.rows[0]);
        return;
    }
    catch (err) {
        console.error(err);
        void res.status(500).json({ error: 'Error updating task' });
        return;
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const userId = req.userId;
    try {
        const result = yield pool.query('DELETE FROM tasks WHERE id = $1 AND "userId" = $2 RETURNING *', [taskId, userId]);
        if (result.rowCount === 0) {
            void res.status(404).json({ error: 'Task not found or unauthorized' });
            return;
        }
        void res.json({ message: 'Task deleted successfully' });
        return;
    }
    catch (err) {
        console.error(err);
        void res.status(500).json({ error: 'Error deleting task' });
        return;
    }
});
exports.deleteTask = deleteTask;
