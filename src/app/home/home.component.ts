import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _NoteService:NoteService, private _Router:Router){

  }
  notes:any = null;
  searchKey:string = ''
  noteId:string = ''

  noteAddForm:FormGroup = new FormGroup({
    title:new FormControl(null),
    content:new FormControl(null)
  })

  noteEditForm:FormGroup= new FormGroup({
    title:new FormControl(null),
    content:new FormControl(null)
  })


  getNote(){
    this._NoteService.getNotes().subscribe({
      next:(repsonse)=>{
        console.log(repsonse.notes);
        this.notes = repsonse.notes;
        // console.log(this.notes[0].title);


      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addNote(noteAddForm:FormGroup){
    // console.log(noteAddForm.value);

    this._NoteService.addNotes(noteAddForm.value).subscribe({
      next:(repsonse)=>{
        console.log(repsonse);
        this.getNote();
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  editNote(noteEditForm:FormGroup){
    // console.log(noteEditForm.value);

    this._NoteService.editNotes(this.noteId,noteEditForm.value).subscribe({
      next:(repo)=>{
        console.log(repo);
        this.getNote();
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  deleteNote(){
    this._NoteService.deleteNotes(this.noteId).subscribe({
      next:(repso)=>{
        console.log(repso)
        this.getNote();
      },
      error:(err)=>{
        console.log(err)

      }
    })

  }

  getNoteId(id:string){
    this.noteId = id
    console.log(this.noteId);
  }
  printThisTable(){
    window.print();
  }
  fileName="ExcelSheet.xlsx"
  exportexcel(){
    let data=document.getElementById("table-data");
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)
    const wb: XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'sheet1')
      XLSX.writeFile(wb,this.fileName)


  }


  ngOnInit(): void {
    this.getNote();
  }

}
