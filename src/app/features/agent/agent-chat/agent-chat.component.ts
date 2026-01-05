import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agent-chat',
  imports: [CommonModule,RouterLink],
  
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.scss'
})
export class AgentChatComponent {
routes=routes;
isOpen=false;
isSearch=false;
isEmoji():void{
  this.isOpen=!this.isOpen
}
openSearch():void{
  this.isSearch=!this.isSearch
}
}
