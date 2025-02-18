
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  session_id: string;
  title: string;
}

interface ConversationSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
}

export default function ConversationSidebar({
  isOpen,
  onToggle,
  currentSessionId,
  onSessionSelect,
}: ConversationSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('session_id, message')
        .eq('message->>type', 'human')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching conversations:', error);
        return;
      }

      const uniqueConversations = data.reduce((acc: Conversation[], curr) => {
        if (!acc.find(c => c.session_id === curr.session_id)) {
          acc.push({
            session_id: curr.session_id,
            title: curr.message.content.slice(0, 100) + '...',
          });
        }
        return acc;
      }, []);

      setConversations(uniqueConversations);
    };

    fetchConversations();
  }, []);

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full transition-all duration-300 ease-in-out z-10",
      isOpen ? "w-80" : "w-12"
    )}>
      <div className="h-full glass-morphism relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onToggle}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>

        {isOpen && (
          <div className="pt-14 px-4 h-full">
            <h2 className="text-lg font-semibold mb-4">Conversations</h2>
            <ScrollArea className="h-[calc(100%-6rem)]">
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <Button
                    key={conv.session_id}
                    variant={currentSessionId === conv.session_id ? "secondary" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => onSessionSelect(conv.session_id)}
                  >
                    <span className="truncate">{conv.title}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
