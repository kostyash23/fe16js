'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

class Notepad {

  constructor(notes = []) {
    this._notes = notes;

  };
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    for (const note of this.notes) {
      if (note.id === id)
        return note;
    }
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }
  deleteNote(id) {
    if (this.findNoteById(id)) {
      this._notes.splice(this._notes.indexOf(this.findNoteById(id)), 1);
    }
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
    const newNotes = [];

    for (const note of this._notes) {
      if (note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
        newNotes.push(note);
      }
    }

    return newNotes;
  };
  filterNotesByPriority(priority) {
    const newNotes = [];

    for (const note of this._notes) {
      if (note.priority === priority) {
        newNotes.push(note);
      }
    }

    return newNotes;
  };

};

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);


const refs = {
  editor: document.querySelector(".note-editor"),
  titleField: document.querySelector('input[name="note_title"]'),
  bodyField: document.querySelector('textarea[name="note_body"]'),
  list: document.querySelector('ul.note-list'),
  search: document.querySelector('form.search-form'),

}
const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const notepad = new Notepad(initialNotes);
console.log('Все текущие заметки: ', notepad.notes);


const createNoteContent = note => {
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

const createActionButton = (action, iconType) => {
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

const createNoteFooter = note => {
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

const createListItem = note => {
  const item = document.createElement("li");
  item.classList.add("note-list__item");
  item.dataset.id = `${note.id}`

  const noteOneMore = document.createElement('div');
  noteOneMore.classList.add('note');

  noteOneMore.append(...[createNoteContent(note)], createNoteFooter(note));
  item.appendChild(noteOneMore);
  return item;


}

const renderNoteList = (listRef, notes) => {
  const itemArr = notes.map(note => createListItem(note))
  listRef.innerHTML = "";
  listRef.append(...itemArr);
  console.log(listRef);

  return listRef;

}
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
    id: generateUniqueId(),
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
