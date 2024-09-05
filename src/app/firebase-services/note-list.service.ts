import { inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  unsubTrash;
  unsubNotes;
  
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNoteslList();
  }

  async updateNote(note: Note) {
    if(note.id) {
      let docRef = this.getSingleDocRef(this.getColIdFromNote(note),note.id);
      await updateDoc(docRef,this.getCleanJson(note)).catch(
        (err) => {console.error(err); }
      )
    }
  }

  getCleanJson(note: Note):{} {
    return {
      type: note.type,
      title: note.title,
      description: note.description,
      marked: note.marked,
    }
  }
  getColIdFromNote(note: Note) {
    if(note.type == 'note') {
      return 'notes';
    } else {
      return 'trash';
    }
  }

  async addNote(note: Note) {
    await addDoc(this.getNotesRef(), note).catch(
      (err) => {console.error(err); }
    ).then(
      (docRef) => {console.log('Document written with ID: ', docRef?.id); }
    );
  }

  ngonDestroy() {
    this.unsubTrash();
    this.unsubNotes();
  }

  subTrashList() {
   return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach((element) => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  subNoteslList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach((element) => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || '',
      type: obj.type || "note",
      title: obj.title || '',
      description: obj.content || '',
      marked: obj.marked || false,
    }
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId),docId);
  }

}
