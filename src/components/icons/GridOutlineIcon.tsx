// Auto-generated file created by svgr-cli source /src/icons/template.js
// Run pnpm build:icons to update
import { type SVGProps } from 'react';

import { cn } from '~/lib/utils';

import { iconVariants } from './iconVariants';
import { type IconProps } from './types';

const Svg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g
      fill="currentColor"
      fillRule="evenodd"
      clipPath="url(#a)"
      clipRule="evenodd"
    >
      <path d="M7.5 2.5h-5v5h5zM2.5.833C1.58.833.833 1.58.833 2.5v5c0 .92.746 1.667 1.667 1.667h5c.92 0 1.666-.747 1.666-1.667v-5C9.166 1.58 8.42.833 7.5.833zM7.5 12.5h-5v5h5zm-5-1.667c-.92 0-1.667.746-1.667 1.667v5c0 .92.746 1.666 1.667 1.666h5c.92 0 1.666-.746 1.666-1.666v-5c0-.92-.746-1.667-1.666-1.667zM17.5 2.5h-5v5h5zm-5-1.667c-.92 0-1.667.746-1.667 1.667v5c0 .92.746 1.667 1.667 1.667h5c.92 0 1.666-.747 1.666-1.667v-5c0-.92-.746-1.667-1.666-1.667zM17.5 12.5h-5v5h5zm-5-1.667c-.92 0-1.667.746-1.667 1.667v5c0 .92.746 1.666 1.667 1.666h5c.92 0 1.666-.746 1.666-1.666v-5c0-.92-.746-1.667-1.666-1.667z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const SvgGridOutlineIcon = ({
  className,
  size = 'sm',
  ...props
}: IconProps) => (
  <Svg
    className={cn(
      iconVariants({
        size,
      }),
      className,
    )}
    {...props}
  />
);

export default SvgGridOutlineIcon;
