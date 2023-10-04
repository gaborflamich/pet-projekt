import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { IShopping } from './shopping-list.definitions';
import { Observable, map } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private readonly firestore: Firestore) {}

  private adaptShopping(item: any): IShopping {
    return new IShopping(item.id, item.title, item.quantity, item.purchased);
  }

  getAllShoppingList$(): Observable<readonly IShopping[]> {
    const itemCollection = collection(this.firestore, 'shoppinglist');
    return collectionData(itemCollection, { idField: 'id' }).pipe(map((items) => items.map(this.adaptShopping)));
  }

  getAllPurcahesdList$(): Observable<readonly IShopping[]> {
    const itemCollection = collection(this.firestore, 'purchased');
    return collectionData(itemCollection, { idField: 'id' }).pipe(map((items) => items.map(this.adaptShopping)));
  }

  addItem(title: string, quantity: string): Promise<void> {
    const itemCollection = collection(this.firestore, 'shoppinglist');
    return addDoc(itemCollection, {
      title: title,
      quantity: quantity,
      createdAt: new Date(),
    }).then(() => {
      console.log('Item added successfully');
    });
  }

  editItem(id: string, title: string, quantity: string): Promise<void> {
    const itemDoc = doc(this.firestore, 'shoppinglist', id);
    return updateDoc(itemDoc, {
      title: title,
      quantity: quantity,
    });
  }

  deleteItem(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, 'shoppinglist', id);
    return deleteDoc(itemDoc);
  }

  deletePurchasedItem(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, 'purchased', id);
    return deleteDoc(itemDoc);
  }

  editPurchasedItem(id: string, title: string, quantity: string): Promise<void> {
    const itemDoc = doc(this.firestore, 'purchased', id);
    return updateDoc(itemDoc, {
      title: title,
      quantity: quantity,
    });
  }

  updatePurchasedStatus(id: string, completed: boolean): Promise<void> {
    const itemDoc = doc(this.firestore, 'todo', id);
    return updateDoc(itemDoc, {
      completed: completed,
    });
  }

  moveToPurchased(item: IShopping): Promise<void> {
    // Step 1: Add to the purchased collection
    const purchasedCollection = collection(this.firestore, 'purchased');
    return addDoc(purchasedCollection, {
      title: item.title,
      quantity: item.quantity,
      createdAt: new Date(),
    })
      .then(() => {
        // Step 2: Remove from the shoppinglist collection
        const itemDoc = doc(this.firestore, 'shoppinglist', item.id);
        return deleteDoc(itemDoc);
      })
      .then(() => {
        console.log('Item moved to purchased collection and removed from shopping list successfully');
      });
  }

  moveToShoppingList(item: IShopping): Promise<void> {
    // Step 1: Add to the shoppinglist collection
    const shoppingCollection = collection(this.firestore, 'shoppinglist');
    return addDoc(shoppingCollection, {
      title: item.title,
      quantity: item.quantity,
      createdAt: new Date(),
    })
      .then(() => {
        // Step 2: Remove from the purchased collection
        const itemDoc = doc(this.firestore, 'purchased', item.id);
        return deleteDoc(itemDoc);
      })
      .then(() => {
        console.log('Item moved to shoppinglist collection and removed from purchased list successfully');
      });
  }
}
