import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string;

  element: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensaje()
    .subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }


  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  public enviarMensaje(){
    // console.log(this.mensaje);
    if (this.mensaje.length === 0){
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
          .then(() => {
            console.log('Se envio el mensaje');
            this.mensaje = '';
          })
          .catch((err) => {
            console.log('Error al enviar el mensaje', err);
            this.mensaje = '';
          });

  }

}
