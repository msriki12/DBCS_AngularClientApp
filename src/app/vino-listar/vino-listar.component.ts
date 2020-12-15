import { Component, OnInit } from '@angular/core';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';
import { Vino } from '../shared/app.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-vino-listar',
  templateUrl: './vino-listar.component.html',
  styleUrls: ['./vino-listar.component.css']
})

export class VinoListarComponent implements OnInit {

  mensaje: string | undefined;
  mostrarMensaje: boolean | undefined;
  Vinos: Vino[] | undefined;

  // Inyectamos los servicios
  constructor(private clienteApiRest: ClienteApiRestService, private datos: DataService) { }
  //Este método se ejecuta justo después de la construcción del componente. Es el lugar adecuado para cargar datos
  ngOnInit() {
    console.log("Dentro funcion ngOnInit de Listar");
    // capturamos valor de mostrarMensaje. Recordar que la variable es un Observable
    this.datos.mostrarMensajeActual.subscribe(
      valor => this.mostrarMensaje = valor
    )
    console.log("Valor actual de si mostrar mensaje: " + this.mostrarMensaje);
    // capturamos el valor de mensaje
    this.datos.mensajeActual.subscribe(
      valor => this.mensaje = valor
    )
    console.log("Valor actual del mensaje: " + this.mensaje);
    this.clienteApiRest.getAllVinos().subscribe(
      (resp: Vino[]) => {
        console.log("datos: " + resp);
        resp.forEach(function (data) {
          console.log("Bodega: " + (data as any).bodega);
        });
      },
      err => {
        console.log("Error al traer la lista: " + err.message);
        throw err;
      }
    );
  }
}
