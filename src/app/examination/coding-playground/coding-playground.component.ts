import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { python} from '@codemirror/lang-python';
import {lineNumbers} from '@codemirror/gutter'
import { EditorState, Extension } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view';

import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from '@codemirror/language';

import {
  oneDark,
  oneDarkTheme,
  oneDarkHighlightStyle,
} from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';

@Component({
  selector: 'app-coding-playground',
  templateUrl: './coding-playground.component.html',
  styleUrl: './coding-playground.component.css'
})
export class CodingPlaygroundComponent implements AfterViewInit {
document:Document;
@ViewChild('editor')
editor:ElementRef
constructor(){

}
  ngAfterViewInit(): void {
    {
      const myEditorElement = this.editor.nativeElement;
      let Istate!: EditorState;
      const MyExtension: Extension = [
        basicSetup,
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        highlightActiveLine(),
        python(),
       
      ];
    
      try {
        Istate = EditorState.create({
          extensions: [MyExtension],
          doc:"Type Your Code here",
          
        });
      } catch (e) {
        console.error(e);
      }
  
      const view = new EditorView({ state:Istate, parent: myEditorElement });
    }
}
}
