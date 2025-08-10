import request from 'supertest';
import express from 'express';
import { Note } from '../../models/Note';
import noteRouter from '../note';

const app = express();
app.use(express.json());
app.use('/api/v1/todo/note', noteRouter);

describe('Note Routes', () => {
  test('POST /note/addnote should create a new task', async () => {
    const newNote = {
      title: 'Test Task',
      content: 'This is a test task content'
    };

    const response = await request(app)
      .post('/api/v1/todo/note/addnote')
      .send(newNote)
      .expect(200);

    expect(response.body).toHaveProperty('newNote');
    expect(response.body.newNote).toHaveProperty('_id');
    expect(response.body.newNote.title).toBe(newNote.title);
    expect(response.body.newNote.content).toBe(newNote.content);

    // Verify the note was actually saved to the database
    const savedNote = await Note.findById(response.body.newNote._id);
    expect(savedNote).toBeTruthy();
    expect(savedNote?.title).toBe(newNote.title);
    expect(savedNote?.content).toBe(newNote.content);
  });

  test('POST /note/addnote should return 400 for invalid input (title too long)', async () => {
    const invalidNote = {
      title: 'This is a very long title that exceeds the maximum length of 35 characters', // Exceeds 35 chars
      content: 'This is a test task content'
    };

    const response = await request(app)
      .post('/api/v1/todo/note/addnote')
      .send(invalidNote)
      .expect(400);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toContain('invalid input');
  });
}); 