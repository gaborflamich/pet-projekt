import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExpenseTrackerService } from './expense-tracker.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IExpense } from './expense-tracker.definitions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ExpenseTrackerComponent implements OnInit, OnDestroy {
  constructor(private readonly expenseService: ExpenseTrackerService) {}
  private readonly subscription: Subscription = new Subscription();

  expenselist$ = this.expenseService.getAllExpense$();

  items: IExpense[] = [];
  isEditing = false;
  editingItemId?: string;
  total: number | null = 0;
  formPrice: number;

  @ViewChild('titleInput', { static: false }) titleInputRef: any;

  form = new FormGroup({
    formTitle: new FormControl(),
    formPrice: new FormControl(),
  });

  ngOnInit(): void {
    this.subscription.add(
      this.expenselist$.subscribe((items) => {
        this.items = [...items];
        this.updateTotal();
      })
    );
  }

  onFormSubmit(): void {
    const formTitleValue = this.form.get('formTitle')?.value;
    const formPriceValue = Number(this.form.get('formPrice')?.value);
    if (!formTitleValue) {
      console.error('Title is required!');
      return;
    }

    if (this.isEditing) {
      // Ha szerkesztünk egy már létező elemet
      if (this.editingItemId) {
        this.expenseService
          .editItem(this.editingItemId, formTitleValue, formPriceValue)
          .then(() => {
            this.onReset();
            this.isEditing = false;
          })
          .catch((error) => {
            console.error('Error editing item:', error);
          });
      } else {
        console.error('Editing is set to true but no Item ID is provided.');
      }
    } else {
      // Ha új elemet adunk hozzá
      this.expenseService
        .addItem(formTitleValue, formPriceValue)
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

  onEdit(id: string, title: string, price: number): void {
    this.form.setValue({ formTitle: title, formPrice: price });
    this.editingItemId = id;
    this.isEditing = true;
    this.titleInputRef.nativeElement.focus();
  }

  onDelete(id: string): void {
    this.expenseService.deleteItem(id).then(() => {
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
      formPrice: '',
    });
  }

  private updateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
