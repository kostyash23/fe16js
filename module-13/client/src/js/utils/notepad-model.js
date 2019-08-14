import * as api from '../../services/api';


export default class Notepad {
    // static Priority = { LOW: 0, NORMAL: 1, HIGH: 2, };
    constructor(notes = []) {
        this._notes = notes;

    };



    get() {
        return api.getNotes()
            .then(notes => {
                this._notes = notes;
                return this._notes;
            })
            .catch(err => console.log(err));
    }

    findNoteById(id) {

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.notes.find((note) => note.id === id))
            }, 300)
        })


    }
    saveNote(note) {
        return api.saveNote(note).then(note => {
                this._notes.push(note);

                return note;
            })
            .catch(err => console.log(err));

    }
    deleteNote(id) {
        return api.deleteNote(id).then(() => {
                this._notes = this._notes.filter(item => item.id !== id);
                return id;
            })
            .catch(err => console.log(err));

    }
    updateNoteContent(id, updatedContent) {
        return api.updateNote(id, updatedContent)
            .then(updatedItem => {
                this._notes[this._notes.indexOf(updatedItem)] = updatedItem;
            })
            .catch(err => console.log(err));
    }


    updateNotePriority(id, priority) {
        return api.updateNote(id, priority).then(updatedItem => {
                this._notes[this._notes.indexOf(updatedItem)] = updatedItem;
            })
            .catch(err => console.log(err))
    }
    filterNotesByQuery(query) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newNotes = this._notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase()))
                resolve(newNotes)
            }, 300);

        })

    };
    filterNotesByPriority(priority) {

        return new Promise((resolve) => {
            setTimeout(() => {
                const newNotes = this._notes.filter(note => note.priority === priority)
                resolve(newNotes)
            }, 300);
        })

    };

};