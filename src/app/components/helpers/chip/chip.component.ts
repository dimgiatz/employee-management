import { Component, OnInit, Output, ElementRef, ViewChild, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input() items: any;
  viewItem:any;
  @Input() title: string;
  selectedItems:string[]=[];
  setItems:Set<string>=new Set();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fieldCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  @Output() emt=new EventEmitter<any>();
  @Output() rem=new EventEmitter<any>();

  @ViewChild('fieldInput') fieldInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoTrigger') matAutocompleteTrigger: MatAutocompleteTrigger;

  constructor() {
    
   }

  ngOnInit() {
    this.filteredItems = this.fieldCtrl.valueChanges.pipe(
      startWith(null),
      map((f: string | null) => f&&f.length!==0&&f!=='' ? this._filter(f) : this.items.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.setItems.add(value.trim());
        this.selectedItems=Array.from(this.setItems);
        this.emt.emit(this.selectedItems);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fieldCtrl.setValue(null);
      setTimeout(() => {
        this.matAutocompleteTrigger.openPanel();
      }, 333);
    }
  }

  remove(f: string): void {     
      this.setItems.delete(f);
      this.selectedItems=Array.from(this.setItems);
      this.emt.emit(this.selectedItems);
    
      setTimeout(() => {
        this.matAutocompleteTrigger.closePanel();
      }, 100);
    }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.setItems.add(event.option.value);
    this.selectedItems=Array.from(this.setItems);
    this.emt.emit(this.selectedItems);
    this.fieldInput.nativeElement.value = '';
    this.fieldCtrl.setValue(null);
    setTimeout(() => {
      this.matAutocompleteTrigger.openPanel();
    }, 333);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(f => f.toLowerCase().indexOf(filterValue) >= 0);
  }

}
