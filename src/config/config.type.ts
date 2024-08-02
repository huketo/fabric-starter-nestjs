import { LoggerConfig } from 'src/logger/config/logger-config.type';
import { AppConfig } from './app-config.type';
import { FabricConfig } from 'src/fabric/config/fabric-config.type';

export type AllConfigType = {
  app: AppConfig;
  fabric: FabricConfig;
  log: LoggerConfig;
};
