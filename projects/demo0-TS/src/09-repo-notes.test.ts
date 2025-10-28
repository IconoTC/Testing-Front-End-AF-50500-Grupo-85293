import type { Mock } from 'vitest';
import { NotesApiRepo, type Note, type NoteDTO } from './09-repo.notes.js';

describe('NotesApiRepo', () => {
    const mockNotes = [
        { id: 1, title: 'Note 1', content: 'Content 1', isImportant: false },
        { id: 2, title: 'Note 2', content: 'Content 2', isImportant: true },
    ];

    let repo: NotesApiRepo;
    beforeEach(() => {
        repo = new NotesApiRepo();

        globalThis.fetch = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should be defined', () => {
        expect(NotesApiRepo).toBeDefined();
        expect(repo).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of notes', async () => {
            (globalThis.fetch as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockNotes,
            });

            const notes = await repo.getAll();
            expect(notes).toEqual(mockNotes);
        });
    });

    describe('getById', () => {
        it('should return a note by id', async () => {
            (globalThis.fetch as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockNotes[0],
            });

            const fetchedNote = await repo.getById(1);
            expect(fetchedNote).toEqual(mockNotes[0]);
        });

        it('should throw an error if note not found', async () => {
            (globalThis.fetch as Mock).mockResolvedValueOnce({
                ok: false,
            });
            await expect(repo.getById(999)).rejects.toThrow(
                'Note with id 999 not found'
            );
        });

        describe('create', () => {
            it('should create and return a new note', async () => {
                const newNote: NoteDTO = { title: 'Note 3', content: 'Content 3', isImportant: false };
                const createdNote: Note = { id: 3, ...newNote };

                (globalThis.fetch as Mock).mockResolvedValueOnce({
                    ok: true,
                    json: async () => createdNote,
                });

                const result = await repo.create(newNote);
                expect(result).toEqual(createdNote);
            });
        });

        describe('update', () => {
            it('should update and return the note', async () => {
                const updatedNote: Note = { id: 1, title: 'Updated Note 1', content: 'Updated Content 1', isImportant: true };

                (globalThis.fetch as Mock).mockResolvedValueOnce({
                    ok: true,
                    json: async () => updatedNote,
                });

                const result = await repo.update(1, updatedNote);
                expect(result).toEqual(updatedNote);
            });

            it('should throw an error if update fails', async () => {
                const updatedNote: Note = { id: 999, title: 'Non-existent Note', content: 'No Content', isImportant: false };

                (globalThis.fetch as Mock).mockResolvedValueOnce({
                    ok: false,
                });

                await expect(repo.update(999, updatedNote)).rejects.toThrow(
                    'Failed to update note with id 999'
                );
            });
        });

        describe('delete', () => {
            it('should delete the note', async () => {
                (globalThis.fetch as Mock).mockResolvedValueOnce({
                    ok: true,
                });

                await expect(repo.delete(1)).resolves.toBeUndefined();
            });

            it('should throw an error if delete fails', async () => {
                (globalThis.fetch as Mock).mockResolvedValueOnce({
                    ok: false,
                });

                await expect(repo.delete(999)).rejects.toThrow(
                    'Failed to delete note with id 999'
                );
            });
        });
    });
});
