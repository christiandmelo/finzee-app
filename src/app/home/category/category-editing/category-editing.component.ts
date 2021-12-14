import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-editing',
  templateUrl: './category-editing.component.html',
  styleUrls: ['./category-editing.component.css']
})
export class CategoryEditingComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditingComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      shortName: ['', [
        Validators.required
      ]]
    });

    this.verifyIfInsertionOrEdition();
  }

  //#region methods for validation
  verifyIfInsertionOrEdition(){
    if(this.id <= 0) return;

    this.getCategoryAndPutOnInputs();
  }
  //#endregion

  //#region methods for listing
  getCategoryAndPutOnInputs(){
    this.categoryService
      .getById(this.id)
      .subscribe((dataCategory) => {
        this.categoryForm.controls["name"].setValue(dataCategory.data.name);
        this.categoryForm.controls["shortName"].setValue(dataCategory.data.shortName);
      });
  }
  //#endregion

  //#region methods for edition
  save(){
    if(this.id <= 0){
      this.saveNew();
      return;
    }

    this.saveEdition();
  }

  saveNew(){
    this.categoryService
      .saveNew(
        this.categoryForm.get('name')?.value,
        this.categoryForm.get('shortName')?.value
      )
      .subscribe(()=>{
        this.snackBar.open('Category saved successfully', 'ok', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        this.dialogRef.close();
      },() => {
        this.snackBar.open('Error saving', 'ok', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      })
  }

  saveEdition(){
    this.categoryService
        .saveEdition(
          this.id,
          this.categoryForm.get('name')?.value,
          this.categoryForm.get('shortName')?.value
        )
        .subscribe(()=>{
          this.snackBar.open('Category saved successfully', 'ok', {
            horizontalPosition: "center",
            verticalPosition: "top",
          });
          this.dialogRef.close();
        },() => {
          this.snackBar.open('Error saving', 'ok', {
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        })
  }
  //#endregion

}
