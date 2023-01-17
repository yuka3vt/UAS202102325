import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit} from '@angular/core';  

declare const $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'UAS202102325';
  data:any;
  table1: any;

  constructor(private http: HttpClient) {
    
  }
  ngAfterViewInit(): void {
    this.table1 = $("#table1").DataTable();

    this.bind_mahasiswa();
  }
  bind_mahasiswa(): void{
    this.http.get("https://stmikpontianak.net/011100862/tampilMahasiswa.php")
    .subscribe((data: any) => {
      console.log(data);

      this.table1.clear();

      data.forEach((element: any) => {
        var tempatTanggalLahir = element.TempatLahir +", "+ element.TanggalLahir;

        var row = [
          element.NIM,
          element.Nama,
          element.JenisKelamin,
          tempatTanggalLahir,
          element.JP,
          element.Alamat,
          element.StatusNikah,
          element.TahunMasuk
        ]
        this.table1.row.add(row);

      });
      this.table1.draw(false);

    })
  }
}
