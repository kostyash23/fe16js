import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './utils/constants';
import Notepad from './utils/notepad-model';
import { getRefs, renderNoteList, createListItem } from './utils/view.js';
import noteTemplate from '../templates/note.hbs';

const URL = 'http://localhost:3000/notes'

MicroModal.init();


const notyf = new Notyf();
const shortid = require('shortid');
const refs = getRefs();
const notepad = new Notepad();

notepad.get().then(initialNotes => renderNoteList(refs.list, initialNotes))


const addListItem = (listRef, note) => {
    listRef.insertAdjacentHTML('beforeend', noteTemplate(note));

}
const removeListItem = (item) => {

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
        notepad
            .deleteNote(e.target.closest('li').dataset.id)
            .then(() => {
                removeListItem(e.target.closest('li'));
                notyf.success('Заметка удалена');
            })
            .catch((err) => { notyf.error("error") });
    }
});
refs.search.addEventListener('input', (e) => {
    notepad.filterNotesByQuery(e.target.value)
        .then((res) => { renderNoteList(refs.list, res) })
})