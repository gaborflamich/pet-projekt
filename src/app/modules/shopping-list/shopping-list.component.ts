import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from './shopping-list.service';
import { IShopping } from './shopping-list.definitions';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ShoppinglistComponent {
  constructor(private readonly shoppingService: ShoppingListService) {}
  shoppinglist$ = this.shoppingService.getAllShoppingList$();
  purchasedlist$ = this.shoppingService.getAllPurcahesdList$();

  isEditing = false;
  editingItemId?: string;

  // 1. Flag bevezetése
  editingFromPurchasedList = false;

  @ViewChild('titleInput', { static: false }) titleInputRef: any;

  form = new FormGroup({
    formTitle: new FormControl(),
    formQuantity: new FormControl(),
  });

  onFormSubmit(): void {
    const formTitleValue = this.form.get('formTitle')?.value;
    const formQuantityValue = this.form.get('formQuantity')?.value;
    if (!formTitleValue) {
      console.error('Title is required!');
      return;
    }

    if (this.isEditing) {
      // Ha szerkesztünk egy már létező elemet
      if (this.editingItemId) {
        // Ha a vásárolt listából szerkesztünk
        if (this.editingFromPurchasedList) {
          this.shoppingService
            .editPurchasedItem(this.editingItemId, formTitleValue, formQuantityValue)
            .then(() => {
              this.onReset();
              this.isEditing = false;
              this.editingFromPurchasedList = false; // visszaállítjuk false-ra
            })
            .catch((error) => {
              console.error('Error editing purchased item:', error);
            });
        } else {
          this.shoppingService
            .editItem(this.editingItemId, formTitleValue, formQuantityValue)
            .then(() => {
              this.onReset();
              this.isEditing = false;
            })
            .catch((error) => {
              console.error('Error editing item:', error);
            });
        }
      } else {
        console.error('Editing is set to true but no Item ID is provided.');
      }
    } else {
      // Ha új elemet adunk hozzá
      this.shoppingService
        .addItem(formTitleValue, formQuantityValue)
        .then(() => {
          this.onReset();
          this.isEditing = false;
        })
        .catch((error) => {
          console.error('Error adding item:', error);
        });
    }
    this.titleInputRef.nativeElement.focus();
  }

  onEdit(id: string, title: string, quantity: string): void {
    this.form.setValue({ formTitle: title, formQuantity: quantity });
    this.editingItemId = id;
    this.isEditing = true;
    this.titleInputRef.nativeElement.focus();
  }

  onDelete(id: string): void {
    this.shoppingService.deleteItem(id).then(() => {
      console.log('Deleted item with ID: ' + id);
    });
  }

  onCancel(): void {
    this.isEditing = false;
    this.form.reset();
  }
  onReset(): void {
    this.form.reset({
      formTitle: '',
      formQuantity: '',
    });
  }

  onPurchase(item: IShopping): void {
    if (item.purchased) {
      // Item is already purchased, just toggle the status
      this.shoppingService
        .updatePurchasedStatus(item.id, false)
        .then(() => {
          item.purchased = false;
          console.log('Status updated successfully');
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    } else {
      // Item is not purchased yet, move to purchased collection
      this.shoppingService
        .moveToPurchased(item)
        .then(() => {
          console.log('Item moved to purchased collection successfully');
          item.purchased = true;
        })
        .catch((error) => {
          console.error('Error moving item to purchased collection:', error);
        });
    }
  }

  onEditPurchase(id: string, title: string, quantity: string): void {
    this.form.setValue({ formTitle: title, formQuantity: quantity });
    this.editingItemId = id;
    this.isEditing = true;
    this.editingFromPurchasedList = true; // <-- Itt állítjuk be true-ra
    this.titleInputRef.nativeElement.focus();
  }

  onDeletePurchase(id: string): void {
    this.shoppingService.deletePurchasedItem(id).then(() => {
      console.log('Deleted purchased item with ID: ' + id);
    });
  }

  onUndo(item: IShopping): void {
    if (!item.purchased) {
      // Item was purchased, move it back to shoppinglist collection and remove from purchased
      this.shoppingService
        .moveToShoppingList(item)
        .then(() => {
          console.log('Item moved to shoppinglist collection successfully');
          item.purchased = false;
        })
        .catch((error) => {
          console.error('Error moving item to shoppinglist collection:', error);
        });
    } else {
      console.log('Item is already in the shoppinglist');
    }
  }
}
