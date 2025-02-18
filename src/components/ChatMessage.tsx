
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  type: 'human' | 'ai';
}

const ChatMessage = memo(({ content, type }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-4 py-3 rounded-lg max-w-[85%] message-transition",
        type === 'human' 
          ? "ml-auto bg-accent text-accent-foreground" 
          : "mr-auto glass-morphism"
      )}
    >
      {type === 'human' ? (
        <p className="whitespace-pre-wrap">{content}</p>
      ) : (
        <div className="message-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
