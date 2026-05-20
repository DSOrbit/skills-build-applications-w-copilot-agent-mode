import express, { Request, Response } from 'express';
import { connectDatabase, databaseName } from './config/database';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

connectDatabase()
  .then(() => console.log(`Connected to MongoDB ${databaseName}`))
  .catch((error: Error) => console.warn(`MongoDB connection unavailable: ${error.message}`));

  
app.get('/', (_request: Request, response: Response) => {
  response.json({
    message: 'Octofit Tracker API is running',
    apiBaseUrl,
  });
});

app.get('/api/users/', async (_request: Request, response: Response) => {
  const data = await UserModel.find().sort({ username: 1 }).lean();
  response.json({ resource: 'users', model: UserModel.modelName, apiBaseUrl, data });
});

app.get('/api/teams/', async (_request: Request, response: Response) => {
  const data = await TeamModel.find().populate('members', 'username displayName email').sort({ name: 1 }).lean();
  response.json({ resource: 'teams', model: TeamModel.modelName, apiBaseUrl, data });
});

app.get('/api/activities/', async (_request: Request, response: Response) => {
  const data = await ActivityModel.find()
    .populate('user', 'username displayName')
    .sort({ loggedAt: -1 })
    .lean();
  response.json({ resource: 'activities', model: ActivityModel.modelName, apiBaseUrl, data });
});

app.get('/api/leaderboard/', async (_request: Request, response: Response) => {
  const data = await LeaderboardModel.find()
    .populate('user', 'username displayName')
    .sort({ rank: 1 })
    .lean();
  response.json({ resource: 'leaderboard', model: LeaderboardModel.modelName, apiBaseUrl, data });
});

app.get('/api/workouts/', async (_request: Request, response: Response) => {
  const data = await WorkoutModel.find().sort({ difficulty: 1, name: 1 }).lean();
  response.json({ resource: 'workouts', model: WorkoutModel.modelName, apiBaseUrl, data });
});

app.listen(port, () => {
  console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
});