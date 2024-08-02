export type FabricConfig = {
  connectionProfile: Record<string, unknown>;
  walletType: 'filesystem' | 'couchdb';
  walletPath: string;
  couchDBUrl: string;
  channelName: string;
  chaincodeId: string;
};
