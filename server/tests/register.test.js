import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { registerUserController } from '../controllers/user.controller.js';
import UserModel from '../models/user.model.js';

const app = express();
app.use(express.json());
app.post('/api/user/register', registerUserController);

describe('Register Endpoint Tests', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await UserModel.deleteMany({});
    });

    test('should register user successfully', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890'
        };

        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User registered successfully! Please verify your email.');
        expect(response.body.token).toBeDefined();
    });

    test('should fail with missing fields', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .expect(400);

        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('provide email, name, password and phone number');
    });

    test('should fail with duplicate email', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890'
        };

        await request(app)
            .post('/api/user/register')
            .send(userData);

        const response = await request(app)
            .post('/api/user/register')
            .send(userData)
            .expect(400);

        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('User already Registered with this email');
    });
});