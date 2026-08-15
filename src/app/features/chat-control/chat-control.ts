import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../core/services/chat.service';
import { ChatMessage } from '../../core/models/chat-message.interface';

@Component({
  selector: 'app-chat-control',
  standalone: false,
  templateUrl: './chat-control.html',
  styleUrl: './chat-control.scss',
})
export class ChatControl implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollAnchor') private scrollAnchor?: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [];
  draft = '';
  private subscription = new Subscription();
  private shouldScroll = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.chatService.messages$.subscribe(message => {
        this.messages.push(message);
        this.shouldScroll = true;
      })
    );

    this.chatService.startRandomTraffic();

    // Mensaje de bienvenida al entrar a la sala de control.
    setTimeout(() => {
      this.chatService.announce('Canal de control abierto. Escribí "help" para ver los comandos.');
    }, 300);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.chatService.stopRandomTraffic();
  }

  send(): void {
    if (!this.draft.trim()) {
      return;
    }
    this.chatService.sendUserMessage(this.draft);
    this.draft = '';
  }

  trackByMessageId(_: number, message: ChatMessage): number {
    return message.id;
  }

  private scrollToBottom(): void {
    this.scrollAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
