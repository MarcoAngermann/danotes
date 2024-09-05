import { inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  // items$;
  // items;

  unsubList;
  unsubSingle;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach((element) => {
        console.log(element);
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes','1'), (element) => {
    });

    this.unsubList();
    this.unsubSingle();
      
    
      
 
    
    
  //   this.items$ = collectionData(this.getNotesRef());
  //   this.items = this.items$.subscribe((list) => {
  //     list.forEach((note) => {
  //       console.log(note)
  //     })
      
  //   })
  //   this.items.unsubscribe();
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
