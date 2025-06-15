interface Window {
  fbq?: {
    (command: 'track', eventName: string, parameters?: any): void;
    (command: 'init', pixelId: string): void;
    (command: string, ...args: any[]): void;
    callMethod?: (...args: any[]) => void;
    queue?: any[];
    push?: (...args: any[]) => void;
    loaded?: boolean;
    version?: string;
  };
  _fbq?: any;
  _fbq_initialized?: boolean;
  fbPixelInitialized?: boolean;
  fbPixelLoaded?: boolean;
}
