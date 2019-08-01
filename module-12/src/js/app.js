import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './utils/constants';
import ServerNotes from '../assets/notes.json';

import Notepad from './utils/notepad-model';
import { getRefs, renderNoteList, createListItem } from './utils/view.js';
import noteTemplate from '../templates/note.hbs';


MicroModal.init();
const initialNotes = localStorage.getItem('notes') ?
    JSON.parse(localStorage.getItem('notes')) : ServerNotes;


const notyf = new Notyf();
const shortid = require('shortid');
const refs = getRefs();
const notepad = new Notepad(initialNotes);


renderNoteList(refs.list, notepad.notes);
const addListItem = (listRef, note) => {
    listRef.insertAdjacentHTML('beforeend', noteTemplate(note));

}
const removeListItem = (item) => {
    notepad.deleteNote(item.dataset.id);
    item.remove();
}



const handleEditorSubmit = event => {
    event.preventDefault()
    if (!refs.titleField.value || !refs.bodyField.value) return notyf.error('Необходимо заполнить все поля!');
    if (refs.titleField.value || refs.bodyField.value) {

        MicroModal.close('note-editor-modal')
        notyf.success('Заметка добавлена успешно!');
    }
    const newNote = {
        id: shortid.generate(),
        title: refs.titleField.value,
        body: refs.bodyField.value,
        priority: PRIORITY_TYPES.LOW,
    }
    notepad.saveNote(newNote);
    addListItem(refs.list, newNote)


}
const handleDelete = event => {
    if (event.target.parentNode.dataset.action === 'delete-note')
        removeListItem(event.target.closest('li'));
    notyf.success('Заметка удалена')
}


refs.btnOpen.addEventListener('click', () => {
    MicroModal.show('note-editor-modal');
});


refs.form.addEventListener('submit', handleEditorSubmit)
refs.list.addEventListener('click', (e) => {
    if (e.target.parentNode.dataset.action === 'delete-note') {
        removeListItem(e.target.closest('li'));
        notyf.success('Заметка удалена');
    }

})
refs.search.addEventListener('input', (e) => {
    renderNoteList(refs.list, notepad.filterNotesByQuery(e.target.value))
})