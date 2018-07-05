import {Pipe, PipeTransform} from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

//decorador- para saber de que trata el servicio
@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    public transform(value, args: string) {
        if(!value) { //value en este caso es la lista de usuarios
            return null;
        }
        if(!args) { //args es lo que se esta tecleando en el campo de busqueda
            return value;
        }
        args = args.toLowerCase();
        // value trae un array de objetos
        return value.filter((item) => {
            //item trae un pbjeto
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }
}