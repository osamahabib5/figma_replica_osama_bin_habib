import React from 'react'

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

export const ChevronRightIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 4 12 8 6 12"></polyline>
  </svg>
)

export const EyeIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 2C4.5 2 1.5 4 0.5 7c1 3 4 5 7.5 5s6.5-2 7.5-5c-1-3-4-5-7.5-5z"></path>
    <circle cx="8" cy="8" r="1.5"></circle>
  </svg>
)

export const EyeOffIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 2l12 12"></path>
    <path d="M8.5 9.5c.82 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5"></path>
  </svg>
)

export const LockIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="6" width="12" height="8" rx="1"></rect>
    <path d="M4 6V4a2 2 0 0 1 4 0v2"></path>
  </svg>
)

export const ComponentIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <rect x="1" y="1" width="4" height="4" rx="0.5"></rect>
    <rect x="11" y="1" width="4" height="4" rx="0.5"></rect>
    <rect x="1" y="11" width="4" height="4" rx="0.5"></rect>
    <rect x="11" y="11" width="4" height="4" rx="0.5"></rect>
  </svg>
)

export const FrameIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <rect x="1.5" y="1.5" width="13" height="13" rx="1"></rect>
  </svg>
)

export const GroupIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <rect x="2" y="2" width="5" height="5"></rect>
    <rect x="9" y="2" width="5" height="5"></rect>
    <rect x="2" y="9" width="5" height="5"></rect>
    <rect x="9" y="9" width="5" height="5"></rect>
  </svg>
)

export const TextIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 2h10"></path>
    <path d="M7 2v10"></path>
    <path d="M2 12h12"></path>
  </svg>
)

export const RectangleIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <rect x="2" y="3" width="12" height="10" rx="1"></rect>
  </svg>
)

export const ShapeIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
  >
    <circle cx="8" cy="8" r="5.5"></circle>
  </svg>
)

export const ImageIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="1" y="2" width="14" height="12" rx="1"></rect>
    <circle cx="5" cy="5" r="1.5"></circle>
    <path d="M1 12l5-5 10 10"></path>
  </svg>
)

export const MoveIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M13 3v6h6M11 9l-8 8M3 11v6h6M23 13v6h-6"></path>
  </svg>
)

export const CommentIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

export const PenIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 17.25V21h3.75L17.81 9.94m-6.75-6.75L21 2.75"></path>
    <polyline points="9.86 9.86 3 3"></polyline>
  </svg>
)

export const ActionsIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <path d="M9 11h6M12 9v4"></path>
  </svg>
)

export const ChevronDownIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 6 8 10 12 6"></polyline>
  </svg>
)

export const PlusIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="8" y1="3" x2="8" y2="13"></line>
    <line x1="3" y1="8" x2="13" y2="8"></line>
  </svg>
)

export const getIconForLayerType = (
  type: string,
  size?: number,
  className?: string
) => {
  switch (type) {
    case 'component':
      return <ComponentIcon size={size} className={className} />
    case 'frame':
      return <FrameIcon size={size} className={className} />
    case 'group':
      return <GroupIcon size={size} className={className} />
    case 'text':
      return <TextIcon size={size} className={className} />
    case 'rectangle':
      return <RectangleIcon size={size} className={className} />
    case 'shape':
      return <ShapeIcon size={size} className={className} />
    case 'image':
      return <ImageIcon size={size} className={className} />
    default:
      return <FrameIcon size={size} className={className} />
  }
}
