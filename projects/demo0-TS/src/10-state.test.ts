import type { Note, NotesApiRepo } from "./09-repo.notes.js";
import { NotesState } from "./10-state.js";

describe('State Management Tests', () => {

    const mockNote = { id: 1, title: 'Test Note' };
    const mockNote2 = { id: 2, title: 'New Note' };
    const mockNotes = [mockNote, mockNote2];
    const mockRepo: NotesApiRepo = {
        getAll: vi.fn().mockResolvedValue(mockNotes),
        create: vi.fn().mockResolvedValue({ id: 2, title: 'New Note' } as Note),
        update: vi.fn().mockResolvedValue({ id: 1, title: 'Updated Title' } as Note),  
        delete: vi.fn().mockResolvedValue(undefined),
    } as unknown as NotesApiRepo;

    test('loadNotes2 should fetch notes and update state', async () => {
        const state = new NotesState(mockRepo);
        await state.loadNotes();
        expect(state.notes).toEqual(mockNotes);
    });

    test('saveNote should add a new note to the state', async () => {
        const state = new NotesState(mockRepo);
        await state.loadNotes();
        await state.saveNote({ id: 2, title: 'New Note' } as Note);
        expect(state.notes).toEqual([...mockNotes, { id: 2, title: 'New Note' }]);
    });
    test('deleteNote should remove the note from the state', async () => {
        const state = new NotesState(mockRepo);
        await state.loadNotes();
        await state.deleteNote(1);
        expect(state.notes).toEqual([mockNote2]);
    });
    test('updateNote should modify the existing note in the state', async () => {
        const state = new NotesState(mockRepo);
        await state.loadNotes();
        await state.updateNote(1, { title: 'Updated Title' });
        expect(state.notes[0]).toEqual({ id: 1, title: 'Updated Title' });
    });
        test('updateNote should NOT modify if NOT existing note in the state', async () => {
        const state = new NotesState(mockRepo);
        await state.loadNotes();
        await expect(
            state.updateNote(999, { title: 'Updated Title' })
        ).rejects.toThrow('Note with id 999 not found');
    });
});
