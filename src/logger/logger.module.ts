import { ConfigService, ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AllConfigType } from 'src/config/config.type';

@Module({
  imports: [
    ConfigModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AllConfigType>) => ({
        level: configService.getOrThrow<string>('log', { infer: true }),
        exitOnError: false,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({
            format: configService.getOrThrow<string>('log.timestampFormat', {
              infer: true,
            }),
          }),
          winston.format.splat(),
          winston.format.printf((info) => {
            const { level, timestamp, context, message } = info;
            return `[Nest] ${level} ${timestamp}:${context ? '[' + context + ']' : ''} ${message}`;
          }),
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: configService.getOrThrow<string>('log.datePattern', {
              infer: true,
            }),
            zippedArchive: configService.getOrThrow<boolean>(
              'log.zippedArchive',
              {
                infer: true,
              },
            ),
            maxSize: configService.getOrThrow<string>('log.maxSize', {
              infer: true,
            }),
            maxFiles: configService.getOrThrow<string>('log.maxFiles', {
              infer: true,
            }),
          }),
        ],
      }),
    }),
  ],
})
export class LoggerModule {}
