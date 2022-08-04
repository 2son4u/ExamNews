import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListNewsModel, NewsResponseModel, UpdateStatusNewsResponse } from './Models/ListNews.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'exam';
  modalRef?: BsModalRef;

  apiUrl: string = environment.defaultUrl;
  
  newsList: ListNewsModel[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNewsData();
  }
  
  
  getList(): Observable<NewsResponseModel> {
    const apiPath = `${this.apiUrl}uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3`;
    return this.http.get<NewsResponseModel>(apiPath);
  }

  callUpdate(employee:number,id:number,status:number){
    if(status == 0){
      status = 1;
      this.newsStatus = 1;
    }
    else if(status == 1){
      status = 0;
      this.newsStatus = 0;
    }
    this.updateList(employee, id, status).subscribe((response) =>{
      if (response){
        this.getNewsData()
      }
    })
  }

  getNewsData(){
    this.getList().subscribe({
      next: (response) => {
        this.newsList = response.data;
        
      }
    })
  }

  updateList(employeeId: number, newsId: number, status: number): Observable<UpdateStatusNewsResponse> {
    const apiPath = `${this.apiUrl}uapi/drt-ElectronicsDocument/ED-UpdateStatusNews`
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const params = new HttpParams().set('EmployeeId', employeeId)
                                    .set('NewsId', newsId)
                                    .set('Status', status);
                                    
    return this.http.post<UpdateStatusNewsResponse>(apiPath, params, { headers: headers });
  }

  newsId: number;
  newsName: string;
  newsDetail: string;
  newsStatus: number;
  checkNumberNewsForModal(id:number,name:string,detail:string,status:number){
    this.newsId = id;
    this.newsName = name;
    this.newsDetail = detail;
    this.newsStatus = status;
  }


  
}
