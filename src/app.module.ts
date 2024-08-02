import { Module } from '@nestjs/common';
import appConfig from './config/app.config';
import fabricConfig from './fabric/config/fabric.config';
import loggerConfig from './logger/config/logger.config';
import { ConfigModule } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { UserModule } from './user/user.module';
import { FabricService } from './fabric/fabric.service';
import { FabricModule } from './fabric/fabric.module';
import { AssetModule } from './asset/asset.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, fabricConfig, loggerConfig],
      envFilePath: ['.env'],
    }),
    LoggerModule,
    FabricModule,
    UserModule,
    AssetModule,
  ],
  controllers: [],
  providers: [FabricService],
})
export class AppModule {}
