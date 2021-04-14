declare interface Process extends NodeJS.Process {
  env: Record<"TG_TOKEN" | "TG_PORT" | "TG_HOST" | "FORM_HOST" | "PORT" | "PORT2" | "EMBY_ADMIN" | "EMBY_PASSWORD" | "CALIBRE_ADMIN" | "CALIBRE_PASSWORD", string> & {
    NODE_ENV?: string;
  }
}

declare const process: Process;
export declare type UserServiceType = {
  firstName: string;
  lastName: string;
  username: string;
  tgId: number;
  chatId: number;
  mail: string;
}