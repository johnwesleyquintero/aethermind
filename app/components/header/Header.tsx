import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { Logo } from '~/components/ui/Logo';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header className={classNames('flex items-center px-4 h-14 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-1', {
      'border-transparent': !chat.started,
      'border-aethermind-elements-borderColor': chat.started,
    })}
    >
      <div className="flex items-center gap-2 z-logo text-aethermind-elements-textPrimary cursor-pointer">
        <a href="/" className="flex items-center">
          <Logo 
            variant={isDarkMode ? 'dark' : 'light'} 
            width={24} 
            height={24}
            className="hover:opacity-80 transition-opacity" 
          />
        </a>
        <h1>Aethermind</h1>
      </div>
      {chat.started && ( // Display ChatDescription and HeaderActionButtons only when the chat has started.
        <>
          <span className="flex-1 px-4 truncate text-center text-aethermind-elements-textPrimary">
            <ClientOnly>{() => <ChatDescription />}</ClientOnly>
          </span>
          <ClientOnly>
            {() => (
              <div className="mr-1">
                <HeaderActionButtons />
              </div>
            )}
          </ClientOnly>
        </>
      )}
    </header>
  );
}
