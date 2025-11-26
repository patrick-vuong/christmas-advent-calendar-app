import { Sparkles } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface UnlockToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export const UnlockToggle = ({ enabled, onChange }: UnlockToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-3 text-white/90 text-sm sm:text-base">
      <Label htmlFor="unlock-toggle" className="flex items-center gap-2 text-white">
        <Sparkles className="h-4 w-4 text-yellow-300" />
        Unlock all days
      </Label>
      <Switch
        id="unlock-toggle"
        checked={enabled}
        onCheckedChange={onChange}
        aria-label="Toggle to unlock all advent calendar days"
      />
    </div>
  );
};
