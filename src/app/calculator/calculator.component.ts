import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
    buttons: any = [];
    binaryOperations: string[] = ['percent', '+', '-', '*', '/', '='];
    currentNumber: string = '0';
    previousNumber: number = null;
    operator: string = null;
    waitForSecondNumber: boolean = false;

    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.httpClient.get("assets/Buttons.json").subscribe(data => {
            this.buttons = data;
        });
    }

    public handleClick(v: string): void {
        switch (v) {
            case 'clear':
                this.clear();
                break;
            case 'all-clear':
                this.clearAll();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.getDecimal();
                break;
            case 'negate':
            case 'percent':
            case 'reciprocal':
            case 'square':
            case 'sqrt':
            case '/':
            case '*':
            case '-':
            case '+':
            case '=':
                this.getOperation(v);
                break;
            default:
                if (Number(v) !== NaN) {
                    this.getNumber(v);
                } else {
                    console.log(`Invalid value: ${v}`);
                }
        }
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
        console.log('in:', this.previousNumber, op, this.operator, this.currentNumber);
        if (this.binaryOperations.includes(op)) {
            if (this.previousNumber === null) {
                this.previousNumber = Number(this.currentNumber);
            } else if (this.operator) {
                const result = this.doCalculation(this.operator, Number(this.currentNumber));
                this.currentNumber = String(result);
                this.previousNumber = result;
            }

            this.operator = op;
            this.waitForSecondNumber = true;
        } else {
            const result = this.doCalculation(op, Number(this.currentNumber));
            this.currentNumber = String(result);
            if (this.previousNumber === null) {
                this.previousNumber = Number(this.currentNumber);
            }
        }
        console.log('out:', this.previousNumber, op, this.operator, this.currentNumber);
    }

    public backspace() {
        this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length - 1);
    }

    public clear() {
        this.currentNumber = '0';
    }

    public clearAll() {
        this.currentNumber = '0';
        this.previousNumber = null;
        this.operator = null;
        this.waitForSecondNumber = false;
    }

    private doCalculation(op: string, secondOp: number): number {
        switch (op) {
            case '+':
                return this.previousNumber += secondOp;
            case '-':
                return this.previousNumber -= secondOp;
            case '*':
                return this.previousNumber *= secondOp;
            case '/':
                return this.previousNumber /= secondOp;
            case '=':
                return secondOp;
            case 'negate':
                return -secondOp;
            case 'percent':
                return this.previousNumber * secondOp / 100;
            case 'reciprocal':
                return 1/secondOp;
            case 'square':
                return secondOp * secondOp;
            case 'sqrt':
                return Math.sqrt(secondOp);
            default:
                console.log(`Invalid op: ${op}`);
        }
    }

}
