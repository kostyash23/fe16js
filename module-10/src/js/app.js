import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './utils/constants';
import initialNotes from '../assets/notes.json';
import Notepad from './utils/notepad-model';
import { getRefs, renderNoteList, createListItem } from './utils/view.js';


const shortid = require('shortid');
const notepad = new Notepad(initialNotes);

const refs = getRefs();

renderNoteList(refs.list, notepad.notes);


const removeListItem = (item) => {
    notepad.deleteNote(item.dataset.id);
    item.remove();
}
const addListItem = (listRef, note) => {
    listRef.appendChild(createListItem(note));
}
const handleEditorSubmit = event => {
    event.preventDefault()
    if (!refs.titleField.value || !refs.bodyField.value) return alert('Необходимо заполнить все поля!');
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
}

refs.editor.addEventListener('submit', handleEditorSubmit)
refs.list.addEventListener('click', handleDelete)
refs.search.addEventListener('input', (e) => {
    renderNoteList(refs.list, notepad.filterNotesByQuery(e.target.value))
})
