import type { Repo } from './09-repo-interface.js';

export type Note = {
    id: number;
    title: string;
    content: string;
    isImportant: boolean;
};

export type NoteDTO = Omit<Note, 'id'>;

export class NotesApiRepo implements Repo<Note, NoteDTO> {
    url = 'http://my.api/notes';

    async getAll(): Promise<Note[]> {
        const resp = await fetch(this.url);
        return resp.json();
    }

    async getById(id: Note['id']): Promise<Note> {
        const resp = await fetch(`${this.url}/${id}`);

        if (!resp.ok) {
            throw new Error(`Note with id ${id} not found`);
        }

        return resp.json();
    }

    async create(item: NoteDTO): Promise<Note> {
        const resp = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        return resp.json();
    }

    async update(id: Note['id'], item: Note): Promise<Note> {
        const resp = await fetch(`${this.url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });

        if (!resp.ok) {
            throw new Error(`Failed to update note with id ${id}`);
        }

        return resp.json();
    }

    async delete(id: Note['id']): Promise<void> {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete note with id ${id}`);
        }
    }
}
