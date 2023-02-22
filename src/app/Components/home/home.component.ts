import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { OtherService } from 'src/app/Service/other.service';
import { SendMailService } from 'src/app/Service/send-mail.service';

const USER_DATA = [
  {
    id: 1,
    name: '',
    email: '',
  },
  {
    id: 2,
    name: '',
    email: '',
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: User[] = [];
  p = 0;
  i = 3;
  dataSource = USER_DATA;
  form: any;

  constructor(private sendMail: SendMailService,
    private router: Router,
    private formBuilder: FormBuilder,
    private otherService: OtherService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      upload: ['', Validators.required],
    });
  }

  handleFileSelect(evt: any) {
    this.items = this.otherService.csvToJson(evt);
  }

  Submit() {
    this.sendMail.sendMail(this.dataSource).subscribe({
      next: (result: any) => {
        console.log(result);
        this.otherService.openSnackBar(result.message);
        location.reload();
      },
      error: (err: any) => {
        let error = err.error;
        if (error.message) {
          this.otherService.openSnackBar(error.message);
        }
        else {
          this.otherService.openSnackBar("Username and Email should be valid");
        }
      }
    });
  }

  addRow() {
    const newRow = {
      id: this.i++,
      name: '',
      email: '',
    };
    this.dataSource = [...this.dataSource, newRow];
  }

  removeRow(id: number) {
    this.dataSource = this.dataSource.filter((u) => u.id !== id);
  }
  onSubmit() {
    this.sendMail.sendMail(this.items).subscribe({
      next: (result: any) => {
        console.log(result);
        this.otherService.openSnackBar(result.message);
        location.reload();
      },
      error: (err: any) => {
        let error = err.error;
        if (error.message) {
          this.otherService.openSnackBar(error.message);
        }
        else {
          this.otherService.openSnackBar("Username and Email should be valid");
        }
      }
    });
  }
  onClear() {
    this.form.reset();
  }
}