import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { classNames } from '~/utils/classNames';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, 'aria-label': ariaLabel = 'Tabs navigation', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    role="tablist"
    aria-label={ariaLabel}
    className={classNames(
      'inline-flex h-10 items-center justify-center rounded-md bg-bolt-elements-background p-1 text-bolt-elements-textSecondary',
      'focus-within:ring-2 focus-within:ring-bolt-elements-ring focus-within:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    role="tab"
    className={classNames(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
      'ring-offset-bolt-elements-background transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-elements-ring focus-visible:ring-offset-2',
      'hover:bg-bolt-elements-background/80 hover:text-bolt-elements-textPrimary',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-bolt-elements-background data-[state=active]:text-bolt-elements-textPrimary data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    role="tabpanel"
    className={classNames(
      'mt-2 min-h-[200px] w-full rounded-md p-4',
      'ring-offset-bolt-elements-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt-elements-ring focus-visible:ring-offset-2',
      'motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
