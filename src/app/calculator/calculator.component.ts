import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
    currentNumber: string = '0';
    firstOperand: number = null;
    operator: string = null;
    waitForSecondNumber: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    public getNumber(v: string): void {
        if (this.waitForSecondNumber) {
            this.currentNumber = v;
            this.waitForSecondNumber = false;
        } else {
            this.currentNumber === '0' && !this.currentNumber.includes('.') ? this.currentNumber = v : this.currentNumber += v;
        }
    }

    public getDecimal(): void {
        if (!this.currentNumber.includes('.')) {
            this.currentNumber += '.';
        }
    }

    public getOperation(op: string): void {
        if (this.firstOperand === null) {
            this.firstOperand = Number(this.currentNumber);
        } else if (this.operator) {
            const result = this.doCalculation(this.operator, Number(this.currentNumber));
            this.currentNumber = String(result);
            this.firstOperand = result;
        }
        this.operator = op;
        this.waitForSecondNumber = true;
    }

    public clear() {
        this.currentNumber = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitForSecondNumber = false;
    }

    private doCalculation(op: string, secondOp: number): number {
        switch (op) {
            case '+':
                return this.firstOperand += secondOp;
            case '-':
                return this.firstOperand -= secondOp;
            case '*':
                return this.firstOperand *= secondOp;
            case '/':
                return this.firstOperand /= secondOp;
            case '=':
                return secondOp;
            default:
                console.log(`Invalid op: ${op}`);
        }
    }

}
