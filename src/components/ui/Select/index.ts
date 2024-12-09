import {
  ControlledSelect,
  SelectContent,
  SelectItem,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from './select';

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Options: SelectContent,
  Option: SelectItem,
  Control: ControlledSelect,
};
