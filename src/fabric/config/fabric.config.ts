import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import { FabricConfig } from './fabric-config.type';
import validateConfig from 'src/utils/validate-config';
import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';

class EnvironmentVariablesValidator {
  @IsString()
  FABRIC_CONNECTION_PROFILE_PATH: string;

  @IsString()
  FABRIC_WALLET_TYPE: 'filesystem' | 'couchdb';

  @IsString()
  FABRIC_WALLET_PATH: string;

  @IsString()
  FABRIC_COUCHDB_URL: string;

  @IsString()
  FABRIC_CHANNEL_NAME: string;

  @IsString()
  FABRIC_CHAINCODE_ID: string;
}

function loadConnectionProfile(filePath: string): any {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    return yaml.load(fileContent);
  } else if (filePath.endsWith('.json')) {
    return JSON.parse(fileContent);
  } else {
    throw new Error(
      'Unsupported file format. Only JSON and YAML are supported.',
    );
  }
}

export default registerAs<FabricConfig>('fabric', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    connectionProfile: loadConnectionProfile(
      process.env.FABRIC_CONNECTION_PROFILE_PATH,
    ),
    walletType: process.env.FABRIC_WALLET_TYPE as 'filesystem' | 'couchdb',
    walletPath: process.env.FABRIC_WALLET_PATH,
    couchDBUrl: process.env.FABRIC_COUCHDB_URL,
    channelName: process.env.FABRIC_CHANNEL_NAME,
    chaincodeId: process.env.FABRIC_CHAINCODE_ID,
  };
});
