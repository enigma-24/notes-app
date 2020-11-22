const chalk = require('chalk');
const fs = require('fs');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title,
            body
        })
        saveNotes(notes);    
        console.log(chalk.bgGreen('New note added!'));
    }else{
        console.log(chalk.bgRed('Note title already exists!'));
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (error) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    });
    if(notes.length !== notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Note removed!'));
    }else{
        console.log(chalk.bgRed('No Note found!'));
    }
};

const listNotes = () => {
    console.log(chalk.bgYellow('Your notes...'));
    const notes = loadNotes();
    notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if(noteToRead){
        console.log(chalk.italic.underline(noteToRead.title));
        console.log(noteToRead.body);
    }else{
        console.log(chalk.bgRed('Note not found!'));
    }
};

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}