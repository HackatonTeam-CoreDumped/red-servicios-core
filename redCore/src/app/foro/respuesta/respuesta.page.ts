import { ForoService } from './../foro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.page.html',
  styleUrls: ['./respuesta.page.scss'],
})
export class RespuestaPage implements OnInit {

  constructor(private service: ForoService, private router: Router) { }

  currentUser:{
    user:{
      username:String,
      picture:String
    }
  }

  pregunta:{
    user:{
      username:String,
      picture:String
    },
    title:String,
    text:String,
    published:Date
    solved:Boolean,
    datewhenSolved,
    respuestas:[
      {
        user:{
          username:String,
          picture:String
        },
        text:String,
        published:Date
      }
    ]
  }
  index:number
  hasLoaded=false
  title:String

  loadData() {
    this.service.getCurrentUser().then((promise) => {
      promise.subscribe((user:{
        user:{
          username:String,
          picture:String
        }
      }) => {
        this.currentUser = user
        this.service.getForoAct().then((foro) => {
          this.service.getPreguntaAct().then((index:number) => {
            this.service.getForo(foro).subscribe((data:{
              title:String,
              description:String,
              members: [String],
              preguntas:[{
                user:{
                  username:String,
                  picture:String
                },
                title:String,
                text:String,
                published:Date
                solved:Boolean,
                datewhenSolved:Date,
                respuestas:[
                  {
                    user:{
                      username:String,
                      picture:String
                    },
                    text:String,
                    published:Date
                  }
                ]
              }],
              created:Date,
              admins:[String]
            }) => {
              this.title = data.title
              this.pregunta = data.preguntas[index]
              this.index = index
              this.hasLoaded = true
            })
          })
        })
      })
    })
  }

  sendData(form:NgForm) {
    let body = {
      answer:{
        user:{
          username: this.currentUser.user.username,
          picture: this.currentUser.user.picture
        },
        text: form.form.value.text
      },
      pos:this.index
    }
    this.service.sendAnswer(body,this.title).subscribe(() => {},
    (err) => {console.log(err)})
    this.router.navigateByUrl('lista-preguntas')
  }

  ngOnInit() {
    this.loadData()
  }
}