import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    mascot: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    loggedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = model('User', userSchema);
export const TeamModel = model('Team', teamSchema);
export const ActivityModel = model('Activity', activitySchema);
export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
export const WorkoutModel = model('Workout', workoutSchema);