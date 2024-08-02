import { registerAs } from '@nestjs/config';

import { IsBoolean, IsString } from 'class-validator';
import { LoggerConfig } from './logger-config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  LOGGING_LEVEL: string;

  @IsString()
  LOGGING_TIMESTAMP_FORMAT: string;

  @IsString()
  LOGGING_DATE_PATTERN: string;

  @IsBoolean()
  LOGGING_ZIPPED_ARCHIVE: boolean;

  @IsString()
  LOGGING_MAX_SIZE: string;

  @IsString()
  LOGGING_MAX_FILES: string;
}

export default registerAs<LoggerConfig>('log', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    level: process.env.LOGGING_LEVEL || 'info',
    timestampFormat:
      process.env.LOGGING_TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss',
    datePattern: process.env.LOGGING_DATE_PATTERN || 'YYYY-MM-DD',
    zippedArchive: process.env.LOGGING_ZIPPED_ARCHIVE === 'true',
    maxSize: process.env.LOGGING_MAX_SIZE || '20m',
    maxFiles: process.env.LOGGING_MAX_FILES || '14d',
  };
});
