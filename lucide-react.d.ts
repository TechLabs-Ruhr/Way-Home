declare module 'lucide-react' {
    export interface IconProps {
      size?: string | number;
      color?: string;
    }
  
    export const IconName: React.FC<IconProps>;
  }