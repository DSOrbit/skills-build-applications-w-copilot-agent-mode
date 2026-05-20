"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
(0, database_1.connectDatabase)()
    .then(() => console.log(`Connected to MongoDB ${database_1.databaseName}`))
    .catch((error) => console.warn(`MongoDB connection unavailable: ${error.message}`));
app.get('/', (_request, response) => {
    response.json({
        message: 'Octofit Tracker API is running',
        apiBaseUrl,
    });
});
app.get('/api/users/', async (_request, response) => {
    const data = await models_1.UserModel.find().sort({ username: 1 }).lean();
    response.json({ resource: 'users', model: models_1.UserModel.modelName, apiBaseUrl, data });
});
app.get('/api/teams/', async (_request, response) => {
    const data = await models_1.TeamModel.find().populate('members', 'username displayName email').sort({ name: 1 }).lean();
    response.json({ resource: 'teams', model: models_1.TeamModel.modelName, apiBaseUrl, data });
});
app.get('/api/activities/', async (_request, response) => {
    const data = await models_1.ActivityModel.find()
        .populate('user', 'username displayName')
        .sort({ loggedAt: -1 })
        .lean();
    response.json({ resource: 'activities', model: models_1.ActivityModel.modelName, apiBaseUrl, data });
});
app.get('/api/leaderboard/', async (_request, response) => {
    const data = await models_1.LeaderboardModel.find()
        .populate('user', 'username displayName')
        .sort({ rank: 1 })
        .lean();
    response.json({ resource: 'leaderboard', model: models_1.LeaderboardModel.modelName, apiBaseUrl, data });
});
app.get('/api/workouts/', async (_request, response) => {
    const data = await models_1.WorkoutModel.find().sort({ difficulty: 1, name: 1 }).lean();
    response.json({ resource: 'workouts', model: models_1.WorkoutModel.modelName, apiBaseUrl, data });
});
app.listen(port, () => {
    console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
});
