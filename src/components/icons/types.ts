import { type ComponentType, type SVGProps } from 'react';

import { type iconVariants } from './iconVariants';
import { type VariantProps } from 'class-variance-authority';

export interface IconProps
  extends SVGProps<SVGSVGElement>,
    VariantProps<typeof iconVariants> {}

export type Icon = ComponentType<IconProps>;
