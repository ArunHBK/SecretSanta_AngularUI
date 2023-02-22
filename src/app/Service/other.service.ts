import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(    public snackBar: MatSnackBar
    ) { }

  userArray: User[] = [];
  csv: any;

  public csvToJson(evt: any) {
    var file = evt.target.files[0];

    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (event: any) => {
      this.csv = event.target.result;

      let csvToRowArray = this.csv.split("\n");
      for (let index = 1; index < csvToRowArray.length - 1; index++) {
        let row = csvToRowArray[index].split(",");
        this.userArray.push(new User(row[0], row[1].trim()));
      }
    }
    console.log(this.userArray)
    return this.userArray;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'',{
       horizontalPosition: "center",
       verticalPosition:"top" ,
      duration: 3000
    });
  }
}