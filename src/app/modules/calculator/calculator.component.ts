import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export type ICalc = {
  readonly amount: number;
  readonly term: number;
};

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CalculatorComponent implements OnInit {
  constructor(private readonly decimalPipe: DecimalPipe) {}

  formattedAmount = '';
  kolcsonOsszege: number;
  futamIdo: number;
  haviTorleszto: number;
  teljesVisszafizetendo: number;
  hitelTeljesDija: number;
  monthlyRate = 0.01217;

  form = new FormGroup({
    formAmount: new FormControl(2000000),
    rangeAmount: new FormControl(2000000), // Példa kezdőérték: 5.000.000
    formTerm: new FormControl(72),
    rangeTerm: new FormControl(72),
  });

  calcData: ICalc = { amount: 0, term: 0 };

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-0', 'hu-HU')?.replace(/,/g, ' ') || '';
  }

  ngOnInit(): void {
    this.kolcsonOsszege = this.form.get('formAmount')?.value || 0;
    this.futamIdo = this.form.get('formTerm')?.value || 0;
    this.formattedAmount = this.formatNumber(this.kolcsonOsszege);

    this.form.get('rangeAmount')?.valueChanges.subscribe((value) => {
      const newValue = this.formatNumber(value ?? 0);
      if (newValue !== this.formattedAmount) {
        this.formattedAmount = newValue;
      }
      this.form.get('formAmount')?.setValue(value, { emitEvent: false });
    });

    this.form.get('rangeTerm')?.valueChanges.subscribe((value) => {
      this.form.get('formTerm')?.setValue(value, { emitEvent: false });
    });

    this.calculateLoan();

    this.form.valueChanges.subscribe(() => {
      this.kolcsonOsszege = this.form.get('formAmount')?.value || 0;
      this.futamIdo = this.form.get('formTerm')?.value || 0;
      this.calculateLoan();
    });
  }

  calculateLoan(): void {
    this.haviTorleszto =
      (this.kolcsonOsszege * (this.monthlyRate * Math.pow(1 + this.monthlyRate, this.futamIdo))) /
      (Math.pow(1 + this.monthlyRate, this.futamIdo) - 1);
    this.teljesVisszafizetendo = this.haviTorleszto * this.futamIdo;
    this.hitelTeljesDija = this.teljesVisszafizetendo - this.kolcsonOsszege;
  }

  onAmountInput(event: any): void {
    const unformattedValue = parseInt(event.target.value.replace(/\s/g, ''), 10);
    this.form.get('rangeAmount')?.setValue(unformattedValue, { emitEvent: true });
  }
  onTermInput(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.form.get('rangeTerm')?.setValue(value, { emitEvent: true });
  }
}
