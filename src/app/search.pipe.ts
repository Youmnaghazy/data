import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note'
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(note:Note[],searchKey:string):Note[] {
    return note.filter((note)=>note.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()));
  }

}
