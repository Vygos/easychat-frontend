export interface ChatOption {
  delay?: number;
  showDateTime?: boolean;
}

export interface Message {
  type: TypeMessage;
  content: string;
  self: boolean;
  username?: string;
  avatar?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export type MessageContent = string | JSX.Element;

export interface TextMessage extends Message {
  type: "text";
  content: string;
}

export interface ActionRequest {
  type: string;
  always?: boolean;
  addMessage?: boolean;
  response?: ActionResponse;
}

export interface TextActionRequest extends ActionRequest {
  type: "text";
  defaultValue?: string;
  placeholder?: string;
  sendButtonText?: string;
  response?: TextActionResponse;
}

export interface SelectActionRequest extends ActionRequest {
  type: "select";
  options: {
    value: string;
    text: string;
  }[];
  response?: SelectActionResponse;
}

export interface MultiSelectActionRequest extends ActionRequest {
  type: "multi-select";
  options: {
    value: string;
    text: string;
  }[];
  sendButtonText?: string;
  response?: MultiSelectActionResponse;
}

export interface FileActionRequest extends ActionRequest {
  type: "file";
  accept?: string;
  multiple?: boolean;
  response?: FileActionResponse;
  sendButtonText?: string;
}

export interface AudioActionRequest extends ActionRequest {
  type: "audio";
  sendButtonText?: string;
  response?: AudioActionResponse;
}

export interface CustomActionRequest extends ActionRequest {
  type: "custom";
  Component: JSX.Element;
  response?: CustomActionResponse;
}

export interface ActionResponse {
  type: string;
  value: string;
  error?: Error;
}

export interface TextActionResponse extends ActionResponse {
  type: "text";
}

export interface SelectActionResponse extends ActionResponse {
  type: "select";
  option: {
    value: string;
    text: string;
  };
}

export interface MultiSelectActionResponse extends ActionResponse {
  type: "multi-select";
  options: {
    value: string;
    text: string;
  }[];
}

export interface FileActionResponse extends ActionResponse {
  type: "file";
  files: File[];
}

export interface AudioActionResponse extends ActionResponse {
  type: "audio";
  audio?: Blob;
}

export interface CustomActionResponse extends ActionResponse {
  type: "custom";
}

export interface OnMessagesChanged {
  (messages: Message[]): void;
}

export interface OnActionChanged {
  (request: ActionRequest, response?: ActionResponse): void;
}

export interface OnActionResponsed {
  (response: ActionResponse): void;
}

export declare type TypeMessage =
  | "text"
  | "file"
  | "audio"
  | "custom"
  | "multi-select"
  | "select";

export interface MessageSent {
  content: string;
  date: Date | string;
} 
