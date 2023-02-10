import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  items: any[] = [];
  p = 0;
  i = 3;
  dataSource = USER_DATA;

  constructor(private sendMail: SendMailService,
    private router: Router,
    ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.sendMail.sendMail(this.dataSource).subscribe({
      next: (result: any) => {
        console.log(result);
        alert(result.message);
        location.reload();
      },
      error: (err: any) => {
        let error = err.error;
        if (error.message) {
          alert(error.message);
        }
        else {
          alert("Username and Email should be valid");
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

}