import { APIService } from './../../api.service';
import { AuthserviceService } from './../../authservice.service';
import { Component, OnInit } from '@angular/core';
import { ForoService } from '../foro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-foros',
  templateUrl: './lista-foros.page.html',
  styleUrls: ['./lista-foros.page.scss'],
})
export class ListaForosPage implements OnInit {

  currentUser:{
    user:{
      rol:Number
    }
  }

  foros:[{
    title:String,
    description:String,
    members:[{
      username:String,
      picture:String
    }],
    preguntas:[{}],
    created:Date,
    admins:[String]
  }]
  hasLoaded=false;

  constructor(private foroserv: ForoService, private router: Router, private auth: AuthserviceService, private API: APIService ) { }

  async loadData(){
    this.foroserv.getForos().subscribe((data:[{
      title:String,
      description:String,
      members:[{
        username:String,
        picture:String
      }],
      preguntas:[{}],
      created:Date,
      admins:[String]}]) => {
      this.foros = data;
      this.auth.getEmail().then((email) => {
        this.API.tieneCuenta(email).subscribe((user:{
          user:{
            rol:Number
          }
        }) => {
          this.currentUser = user
          this.hasLoaded = true
        })
      }, (err) => {
        this.router.navigateByUrl('login');
      })
    }
    )
  }

  async gotoForo(title) {
    await this.foroserv.setForoAct(title)
    this.router.navigateByUrl('lista-preguntas');
  }

  ngOnInit() {
    this.loadData();
  }

  createForo() {
    this.router.navigateByUrl('crear-foro')
  }


}