import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { IExpense } from './expense-tracker.definitions';

@Injectable({
  providedIn: 'root',
})
export class ExpenseTrackerService {
  constructor(private readonly firestore: Firestore) {}

  private adaptExpense(item: any): IExpense {
    return new IExpense(item.id, item.title, item.price);
  }

  getAllExpense$(): Observable<readonly IExpense[]> {
    const itemCollectionQuery = query(collection(this.firestore, 'expense'), orderBy('createdAt', 'desc'));
    return collectionData(itemCollectionQuery, { idField: 'id' }).pipe(map((items) => items.map(this.adaptExpense)));
  }

  addItem(title: string, price: number): Promise<void> {
    const itemCollection = collection(this.firestore, 'expense');
    return addDoc(itemCollection, {
      title: title,
      price: price,
      createdAt: new Date(),
    }).then(() => {
      console.log('Item added successfully');
    });
  }

  editItem(id: string, title: string, price: number): Promise<void> {
    const itemDoc = doc(this.firestore, 'expense', id);
    return updateDoc(itemDoc, {
      title: title,
      price: price,
    });
  }

  deleteItem(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, 'expense', id);
    return deleteDoc(itemDoc);
  }
}
