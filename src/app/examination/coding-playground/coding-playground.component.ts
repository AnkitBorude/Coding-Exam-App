import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { python} from '@codemirror/lang-python';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view';

import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from '@codemirror/language';
import { basicSetup } from 'codemirror';
import { CodeService } from '../code.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-coding-playground',
  templateUrl: './coding-playground.component.html',
  styleUrl: './coding-playground.component.css'
})
export class CodingPlaygroundComponent implements AfterViewInit,OnInit {
document:Document;
@ViewChild('editor')
editor:ElementRef

myEditor:EditorView | null=null;
http:HttpClient;
MyExtension: Extension = [
  basicSetup,
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  highlightActiveLine(),
  python(),
  
];
isAnswerSubmitted:boolean=false;
constructor(private codeService: CodeService,private resultService:ResultService){
    codeService.runcode.subscribe(()=>{
      //codeService.textSource.next(this.myEditor.state.doc.toString());//accessign the code
      this.runCode();
    })
    this.http=inject(HttpClient);
}
ngOnInit(){
    this.resultService.codeRunnig.subscribe((value=>{
      if(value.isCodeSubmitted)
        {
      this.isAnswerSubmitted=true;
      setTimeout(()=>{
        this.isAnswerSubmitted=false;
      },3500);
    }
    }))
}
  ngAfterViewInit(): void {
    {
      const myEditorElement = this.editor.nativeElement;
      let Istate!: EditorState;
      
    
      try {
        Istate = EditorState.create({
          extensions: [this.MyExtension],
          doc:"if __name__ == '__main__':\n\t n = int(input())",
          
        });
      } catch (e) {
        console.error(e);
      }
  
      this.myEditor = new EditorView({ state:Istate, parent: myEditorElement });
      
    }
  }

  runCode() {
    let currentIndex:number=this.codeService.currentQuestionIndex;
    let test_case_input:string=this.codeService.exam.coding_questions[currentIndex].test_cases[0].test_case_input.trim();
    if (this.editor) {
      const sourceCode = this.myEditor.state.doc.toString();
      this.resultService.currentCode=sourceCode;
      const languageId = 92; // Python language ID
  
      const headers = new HttpHeaders({
        'X-RapidAPI-Key': 'a9598f2502mshda9f3d2a3ea1f6bp1fb17cjsn6b19fcc65348',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      });
  
      const body = {
        source_code: sourceCode,
        language_id: languageId,
        stdin:test_case_input
      };
  
      const url = 'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true';
  
      this.http.post(url, body, { headers }).subscribe(
        (response) => {
          this.codeService.textSource.next(response);
        },
        (error) => {
          console.error('Error submitting code:', error);
          // Handle the error here
        }
      );
    }
  }
}
