import { motion } from 'framer-motion';
import { Button } from '~/components/ui/Button';
import { Download, Copy, Share, Cpu, Terminal, FolderOpen } from 'lucide-react';

export function HeaderActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Download className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Copy className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Share className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Terminal className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Cpu className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <FolderOpen className="w-4 h-4" />
      </Button>
    </div>
  );
}
