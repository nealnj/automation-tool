
export type DeviceType = 'Android' | 'iOS' | 'CarHeadUnit' | 'MCU';
export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Connecting';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: ConnectionStatus;
  connectionMethod: 'USB' | 'WiFi';
  ip?: string;
}

export interface TestStep {
  id: string;
  action: string;
  params: any;
  timestamp: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  tag: string;
  message: string;
}

export interface CanSignal {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}
