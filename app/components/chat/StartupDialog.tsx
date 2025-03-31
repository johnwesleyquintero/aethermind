import { Icons } from '~/lib/components/Icons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Logo } from '~/components/ui/Logo';

interface Feature {
  name: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    name: 'AI-Powered Development',
    description: 'Get intelligent code suggestions and explanations',
    icon: <Icons.bot className="w-6 h-6" />
  },
  {
    name: 'Code Generation',
    description: 'Generate code from natural language descriptions',
    icon: <Icons.code className="w-6 h-6" />
  },
  {
    name: 'Smart Features',
    description: 'Access advanced development tools and helpers',
    icon: <Icons.wand className="w-6 h-6" />
  }
];

export function StartupDialog() {
  return (
    <Dialog>
      <Dialog.Panel>
        <div className="flex items-center gap-3 mb-4">
          <Logo variant="light" width={40} height={40} />
          <Dialog.Title>Welcome to Aethermind</Dialog.Title>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Discover the powerful features of Aethermind to enhance your development experience.
          </p>
        </div>

        <div className="mt-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center mb-4">
              {feature.icon}
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">{feature.name}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}