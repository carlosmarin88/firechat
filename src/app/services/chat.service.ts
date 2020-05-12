import { Mensaje } from './../interfaces/mensaje.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuario: any = {};


  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {

    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario', user);
      if (!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });

  }

  login(proveedor: string) {

    if (proveedor === 'google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else {
      this.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensaje(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                          .limit(5));

    return this.itemsCollection.valueChanges()
           .pipe( map((mensajes: Mensaje[]) => {
               console.log(mensajes);

               this.chats = [];

               for (const mensaje of mensajes){
                  this.chats.unshift(mensaje);
               }

               return this.chats;

            })
          );
  }

  agregarMensaje(texto: string){

    // TODO falta insertar el UID del usuario
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
    };

    console.log('El mensaje enviado', mensaje);

    return this.itemsCollection.add(mensaje);
  }
}
