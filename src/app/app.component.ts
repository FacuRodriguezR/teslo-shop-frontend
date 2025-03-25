import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 
function printToConsole(tre: Function){
  console.log(tre)
}

@printToConsole



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'teslo-shop';
}
