export interface ChatMessage {
  id: number;
  sender: 'control' | 'usuario' | 'sistema';
  text: string;
  timestamp: Date;
}
