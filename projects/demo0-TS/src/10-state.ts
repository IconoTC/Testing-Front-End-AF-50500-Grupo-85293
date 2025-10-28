import { NotesApiRepo, type Note } from './09-repo.notes.js';

export class NotesState {
    private _notes: Note[] = [];

    constructor(private _repo: NotesApiRepo) {
        // this.repo = repo
    }

    get notes(): Note[] {
        return this._notes;
    }

    loadNotes(): Promise<void> {
        // Parte asíncrona -> Backend
        return this._repo.getAll().then((notes) => {
            // Parte síncrona -> estado
            this._notes = notes;
        });
    }

    saveNote(note: Note): Promise<void> {
        return this._repo.create(note).then((newNote) => {
            this._notes = [...this._notes, newNote];
        });
    } 

    deleteNote(id: Note['id']): Promise<void> {
        return this._repo.delete(id).then(() => {
            this._notes = this._notes.filter(note => note.id !== id);
        });
    }   

    updateNote(id: Note['id'], updatedFields: Partial<Note>): Promise<void> {
        const existingNote = this._notes.find(note => note.id === id);
        if (!existingNote) {
            return Promise.reject(new Error(`Note with id ${id} not found`));
        }

        const updatedNote: Note = { ...existingNote, ...updatedFields };

        return this._repo.update(id, updatedNote).then((noteFromRepo) => {
            this._notes = this._notes.map(note => 
                note.id === id ? noteFromRepo : note
            );
        });
    }
}
