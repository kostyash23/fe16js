import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './constants.js';
export const getRefs = () => ({
    editor: document.querySelector(".note-editor"),
    titleField: document.querySelector('input[name="note_title"]'),
    bodyField: document.querySelector('textarea[name="note_body"]'),
    list: document.querySelector('ul.note-list'),
    search: document.querySelector('form.search-form'),

});

export const createNoteContent = note => {
    const content = document.createElement("div");
    content.classList.add('note__content');

    const title = document.createElement('h2');
    title.classList.add('note__title');
    title.textContent = note.title;

    const body = document.createElement('p');
    body.classList.add('note__body');
    body.textContent = note.body;

    content.append(title, body)
    return content;
}

export const createActionButton = (action, iconType) => {
    const button = document.createElement('button');
    button.classList.add('action');
    button.dataset.action = action;

    const buttonInner = document.createElement('i');
    buttonInner.classList.add('material-icons');
    buttonInner.classList.add('action__icon');
    buttonInner.textContent = iconType;

    button.appendChild(buttonInner);

    return button;
}

export const createNoteFooter = note => {
    const footer = document.createElement('footer');
    footer.classList.add('note__footer');

    const expandSection = document.createElement('section');
    expandSection.classList.add("note__section");

    const priority = document.createElement('span');
    priority.classList.add("note__priority");
    priority.textContent = note.priority;

    const editSection = document.createElement('section');
    editSection.classList.add("note__section");

    expandSection.append(...[
        createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN),
        createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP),
        priority]);

    editSection.append(...[
        createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT),
        createActionButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE)]);

    footer.append(...[expandSection, editSection]);

    return footer;
}

export const createListItem = note => {
    const item = document.createElement("li");
    item.classList.add("note-list__item");
    item.dataset.id = `${note.id}`

    const noteOneMore = document.createElement('div');
    noteOneMore.classList.add('note');

    noteOneMore.append(...[createNoteContent(note)], createNoteFooter(note));
    item.appendChild(noteOneMore);
    return item;


}

export const renderNoteList = (listRef, notes) => {
    const itemArr = notes.map(note => createListItem(note))
    listRef.innerHTML = "";
    listRef.append(...itemArr);
    console.log(listRef);

    return listRef;

}
