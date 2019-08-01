export default class Notepad {
    // static Priority = { LOW: 0, NORMAL: 1, HIGH: 2, };
    constructor(notes = []) {
        this._notes = notes;

    };


    get notes() {
        return this._notes;
    }
    findNoteById(id) {

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.notes.find((note) => note.id === id))
            }, 300)
        })

        // for (const note of this.notes) {
        //     if (note.id === id)
        //         return note;
        // }
    }
    saveNote(note) {

        return new Promise((resolve) => {
                setTimeout(() => {
                    this._notes.push(note);
                    localStorage.setItem('notes', JSON.stringify(this._notes));
                    resolve(note);
                }, 300)
            })
            // this._notes.push(note);
            // return note;
    }
    deleteNote(id) {
        return new Promise((resolve) => {
                setTimeout(() => {
                    this._notes = this._notes.filter(note => note.id !== id);
                    localStorage.setItem('notes', JSON.stringify(this._notes));
                    resolve(id);
                }, 300);
            })
            // if (this.findNoteById(id)) {
            //     this._notes.splice(this._notes.indexOf(this.findNoteById(id)), 1);
            // }
    };
    updateNoteContent(id, updatedContent) {
        if (this.findNoteById(id)) {
            return Object.assign(this.findNoteById(id), updatedContent);
        }
    };
    updateNotePriority(id, priority) {
        if (this.findNoteById(id)) {
            this.findNoteById(id).priority = priority;
            return this.findNoteById(id);
        }
    };
    filterNotesByQuery(query) {
        return new Promise((resolve) => {
                setTimeout(() => {
                    const newNotes = this._notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase()))
                }, 300);
                resolve(newNotes)
            })
            // const newNotes = [];

        // for (const note of this._notes) {
        //     if (note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
        //         newNotes.push(note);
        //     }
        // }

        // return newNotes;
    };
    filterNotesByPriority(priority) {

        return new Promise((resolve) => {
                setTimeout(() => {
                    const newNotes = this._notes.filter(note => note.priority === priority)
                    resolve(newNotes)
                }, 300);
            })
            // const newNotes = [];

        // for (const note of this._notes) {
        //     if (note.priority === priority) {
        //         newNotes.push(note);
        //     }
        // }

        // return newNotes;
    };

};