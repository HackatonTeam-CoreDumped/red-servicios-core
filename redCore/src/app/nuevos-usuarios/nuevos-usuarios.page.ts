import { AuthserviceService } from './../authservice.service';
import { Storage } from '@ionic/storage';
import { APIService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevos-usuarios',
  templateUrl: './nuevos-usuarios.page.html',
  styleUrls: ['./nuevos-usuarios.page.scss'],
})
export class NuevosUsuariosPage implements OnInit {

  error:String = ""
  email:String

  constructor(private api: APIService, private router: Router, private storage: Storage,
    private auth: AuthserviceService) { }

  ngOnInit() {
    this.storage.get('EMAIL').then(data => this.email = data);
  }

  async createAcc(form) {
    await this.api.tieneCuenta(form.value.username).then((promise) => {
      promise.subscribe(
        data => {
          this.error = "Ya existe un usuario con ese nombre"
        },
        async err => {
          this.auth.getUser().then((promise) => promise.subscribe(
            async (data:{avatarImage:String}) => {
              let body = {
                email: this.email,
                username: form.value.username,
                picture: data.avatarImage
              }
              await this.api.registrarUsuario(body).subscribe((data) => {
              },
              (error) => {
                this.router.navigateByUrl('');
              }
              )
            }
          ))
      })
    })
  }

  goBack() {
    this.router.navigateByUrl('login')
  }

}
