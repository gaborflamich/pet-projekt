import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, orderBy, updateDoc, query } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { ITodo } from './todo-list.definitions';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private readonly firestore: Firestore) {}

  private adaptTodo(item: any): ITodo {
    return new ITodo(item.id, item.title, item.completed);
  }

  getAllTodoList$(): Observable<readonly ITodo[]> {
    const itemCollectionQuery = query(collection(this.firestore, 'todo'), orderBy('createdAt', 'desc'));
    return collectionData(itemCollectionQuery, { idField: 'id' }).pipe(map((items) => items.map(this.adaptTodo)));
  }

  addTodo(title: string): Promise<void> {
    const itemCollection = collection(this.firestore, 'todo');
    return addDoc(itemCollection, {
      title: title,
      createdAt: new Date(),
    }).then(() => {
      console.log('Todo added successfully');
    });
  }

  editTodo(id: string, title: string): Promise<void> {
    const todoDoc = doc(this.firestore, 'todo', id);
    return updateDoc(todoDoc, {
      title: title,
    });
  }

  deleteTodo(id: string): Promise<void> {
    const todoDoc = doc(this.firestore, 'todo', id);
    return deleteDoc(todoDoc);
  }

  updateTodoCompletedStatus(id: string, completed: boolean): Promise<void> {
    const todoDoc = doc(this.firestore, 'todo', id);
    return updateDoc(todoDoc, {
      completed: completed,
    });
  }
}
