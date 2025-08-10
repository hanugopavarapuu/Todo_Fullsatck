declare module 'cors' {
  import { RequestHandler } from 'express';
  
  interface CorsOptions {
    origin?: boolean | string | string[] | RegExp | RegExp[] | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void);
    credentials?: boolean;
  }
  
  function cors(options?: CorsOptions): RequestHandler;
  export = cors;
} 