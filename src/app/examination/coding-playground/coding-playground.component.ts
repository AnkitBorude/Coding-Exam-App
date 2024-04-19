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

@Component({
  selector: 'app-coding-playground',
  templateUrl: './coding-playground.component.html',
  styleUrl: './coding-playground.component.css'
})
export class CodingPlaygroundComponent implements AfterViewInit,OnInit {
document:Document;
@ViewChild('editor')
editor:ElementRef
MyExtension: Extension = [
  basicSetup,
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  highlightActiveLine(),
  python(),
 
];
constructor(private codeService: CodeService){
    codeService.runcode.subscribe(()=>{
      codeService.textSource.next(this.editor.nativeElement.innerText);
    })
}
ngOnInit(){

}
  ngAfterViewInit(): void {
    {
      const myEditorElement = this.editor.nativeElement;
      let Istate!: EditorState;
      
    
      try {
        Istate = EditorState.create({
          extensions: [this.MyExtension],
          doc:"Type Your Code here",
          
        });
      } catch (e) {
        console.error(e);
      }
  
      const view = new EditorView({ state:Istate, parent: myEditorElement });
    }
  }

getCodeFromEditor() {
  
}
}
