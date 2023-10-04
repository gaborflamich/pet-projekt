import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from './todo-list.service';
import { ITodo } from './todo-list.definitions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoListComponent {
  constructor(private readonly todolistService: TodoListService) {}
  todolist$ = this.todolistService.getAllTodoList$();

  isEditing = false;
  isComplete = false;
  editingTodoId?: string;

  @ViewChild('titleInput', { static: false }) titleInputRef: any;

  form = new FormGroup({
    formTitle: new FormControl(),
  });

  onFormSubmit(): void {
    const formTitleValue = this.form.get('formTitle')?.value;
    if (!formTitleValue) {
      console.error('Title is required!');
      return;
    }

    if (this.isEditing) {
      // Ha szerkesztünk egy már létező elemet
      if (this.editingTodoId) {
        this.todolistService
          .editTodo(this.editingTodoId, formTitleValue)
          .then(() => {
            this.onReset();
            this.isEditing = false;
          })
          .catch((error) => {
            console.error('Error editing todo:', error);
          });
      } else {
        console.error('Editing is set to true but no Todo ID is provided.');
      }
    } else {
      // Ha új elemet adunk hozzá
      this.todolistService
        .addTodo(formTitleValue)
        .then(() => {
          this.onReset();
          this.isEditing = false;
        })
        .catch((error) => {
          console.error('Error adding todo:', error);
        });
    }
  }

  onComplete(item: ITodo): void {
    item.completed = !item.completed;
    this.todolistService
      .updateTodoCompletedStatus(item.id, item.completed)
      .then(() => {
        console.log('Todo completion status updated successfully');
      })
      .catch((error) => {
        console.error('Error updating todo completion status:', error);
      });
  }

  onEdit(id: string, title: string): void {
    this.form.setValue({ formTitle: title });
    this.editingTodoId = id;
    this.isEditing = true;
    this.titleInputRef.nativeElement.focus();
  }

  onDelete(id: string): void {
    this.todolistService.deleteTodo(id).then(() => {
      console.log('Deleted todo with ID: ' + id);
    });
  }

  onCancel(): void {
    this.isEditing = false;
    this.form.reset();
  }
  onReset(): void {
    this.form.reset({
      formTitle: '',
    });
  }
}
