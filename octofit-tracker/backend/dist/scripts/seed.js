"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardModel.deleteMany({}),
        models_1.TeamModel.deleteMany({}),
        models_1.UserModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
    ]);
    const [maya, liam, noah, sofia] = await models_1.UserModel.insertMany([
        {
            username: 'maya_runner',
            email: 'maya.runner@example.com',
            displayName: 'Maya Chen',
            fitnessGoal: 'Improve 10K pace',
        },
        {
            username: 'liam_lifts',
            email: 'liam.lifts@example.com',
            displayName: 'Liam Patel',
            fitnessGoal: 'Build functional strength',
        },
        {
            username: 'noah_cycles',
            email: 'noah.cycles@example.com',
            displayName: 'Noah Garcia',
            fitnessGoal: 'Train for a charity ride',
        },
        {
            username: 'sofia_yoga',
            email: 'sofia.yoga@example.com',
            displayName: 'Sofia Williams',
            fitnessGoal: 'Increase mobility and balance',
        },
    ]);
    await models_1.TeamModel.insertMany([
        {
            name: 'Cardio Crew',
            mascot: 'Lightning Bolt',
            members: [maya._id, noah._id],
        },
        {
            name: 'Strength Squad',
            mascot: 'Iron Shield',
            members: [liam._id, sofia._id],
        },
    ]);
    await models_1.ActivityModel.insertMany([
        {
            user: maya._id,
            type: 'Outdoor Run',
            durationMinutes: 42,
            caloriesBurned: 420,
            loggedAt: new Date('2026-05-18T07:30:00.000Z'),
        },
        {
            user: liam._id,
            type: 'Strength Training',
            durationMinutes: 55,
            caloriesBurned: 360,
            loggedAt: new Date('2026-05-18T17:15:00.000Z'),
        },
        {
            user: noah._id,
            type: 'Cycling',
            durationMinutes: 75,
            caloriesBurned: 680,
            loggedAt: new Date('2026-05-19T06:45:00.000Z'),
        },
        {
            user: sofia._id,
            type: 'Yoga Flow',
            durationMinutes: 35,
            caloriesBurned: 180,
            loggedAt: new Date('2026-05-19T19:00:00.000Z'),
        },
    ]);
    await models_1.LeaderboardModel.insertMany([
        { user: noah._id, score: 980, rank: 1 },
        { user: maya._id, score: 910, rank: 2 },
        { user: liam._id, score: 870, rank: 3 },
        { user: sofia._id, score: 815, rank: 4 },
    ]);
    await models_1.WorkoutModel.insertMany([
        {
            name: 'Morning 5K Builder',
            description: 'A steady run with short tempo intervals for pace development.',
            difficulty: 'Intermediate',
            durationMinutes: 40,
            focusArea: 'Cardio endurance',
        },
        {
            name: 'Full-Body Strength Circuit',
            description: 'Compound lifts and bodyweight finishers for total-body power.',
            difficulty: 'Advanced',
            durationMinutes: 50,
            focusArea: 'Strength',
        },
        {
            name: 'Recovery Mobility Flow',
            description: 'Low-impact mobility work for hips, shoulders, and spine.',
            difficulty: 'Beginner',
            durationMinutes: 25,
            focusArea: 'Mobility',
        },
    ]);
    console.log('Seed data inserted for users, teams, activities, leaderboard, and workouts');
}
seedDatabase()
    .catch((error) => {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectDatabase)();
});
