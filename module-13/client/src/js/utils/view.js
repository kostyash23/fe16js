import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './constants.js';
import noteTemplate from '../../templates/note.hbs';

export const getRefs = () => ({
    editor: document.querySelector(".note-editor"),
    titleField: document.querySelector('input[name="note_title"]'),
    bodyField: document.querySelector('textarea[name="note_body"]'),
    list: document.querySelector('ul.note-list'),
    search: document.querySelector('form.search-form'),
    form: document.querySelector('form.note-editor'),
    btnOpen: document.querySelector('button[data-action="open-editor"]')
});



export const renderNoteList = (listRef, notes) => {
    const itemArr = notes.map(note => noteTemplate(note)).join('');
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', itemArr);
    return listRef;

}