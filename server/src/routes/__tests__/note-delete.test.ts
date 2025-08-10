import request from 'supertest';
import express from 'express';
import { Note } from '../../models/Note';
import noteRouter from '../note';

const app = express();
app.use(express.json());
app.use('/api/v1/todo/note', noteRouter);

describe('Note Delete Routes', () => {
  test('DELETE /note/del/:id should delete the task', async () => {
    // First, create a note to delete
    const newNote = new Note({
      title: 'Task to Delete',
      content: 'This task will be deleted'
    });
    const savedNote = await newNote.save();

    // Verify the note exists
    expect(savedNote._id).toBeDefined();

    // Delete the note
    const response = await request(app)
      .delete(`/api/v1/todo/note/del/${savedNote._id}`)
      .expect(200);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toBe('deleted');

    // Verify the note was actually deleted from the database
    const deletedNote = await Note.findById(savedNote._id);
    expect(deletedNote).toBeNull();
  });

  test('DELETE /note/del/:id should return 200 even for non-existent task (current implementation)', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // Valid MongoDB ObjectId format

    const response = await request(app)
      .delete(`/api/v1/todo/note/del/${fakeId}`)
      .expect(200);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toBe('deleted');
  });

  test('DELETE /note/del/:id should return 500 for invalid ID format', async () => {
    const invalidId = 'invalid-id-format';

    const response = await request(app)
      .delete(`/api/v1/todo/note/del/${invalidId}`)
      .expect(500);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toBe('server down');
  });
}); 