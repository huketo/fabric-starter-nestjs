import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FabricCAServices from 'fabric-ca-client';
import { Wallet, Wallets } from 'fabric-network';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class FabricService implements OnApplicationBootstrap {
  constructor(
    private configService: ConfigService<AllConfigType>,
    private wallet: Wallet,
    private caClient: FabricCAServices,
  ) {}

  async onApplicationBootstrap() {
    try {
      // 1. Load the wallet
      const walletType = this.configService.getOrThrow<string>(
        'fabric.walletType',
        { infer: true },
      );
      if (walletType === 'filesystem') {
        const walletPath = this.configService.getOrThrow<string>(
          'fabric.walletPath',
          { infer: true },
        );
        this.wallet = await Wallets.newFileSystemWallet(walletPath);
      }
      if (walletType === 'couchdb') {
        const couchDBUrl = this.configService.getOrThrow<string>(
          'fabric.couchDBUrl',
          { infer: true },
        );
        this.wallet = await Wallets.newCouchDBWallet(couchDBUrl);
      }
      if (!this.wallet) {
        throw new Error('Unsupported wallet type.');
      }

      // 2. Load the CA client
      const ccp: FabricConnectionProfile = this.configService.getOrThrow<
        Record<string, unknown>
      >('fabric.connectionProfile', { infer: true });
      const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
      const caTLSCACerts = caInfo.tlsCACerts.pem;

      this.caClient = new FabricCAServices(
        caInfo.url,
        { trustedRoots: caTLSCACerts, verify: false },
        caInfo.caName,
      );

      // Enroll the admin user, and import the new identity into the wallet.
      const identity = await this.wallet.get('admin');
      if (identity) {
        console.warn(
          'An identity for the admin user "admin" already exists in the wallet',
        );
        return;
      }
      const enrollment = await this.caClient.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
      });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
      };

      await this.wallet.put('admin', x509Identity);
      console.info('Successfully initialized the Fabric service');
    } catch (error) {
      console.error('Failed to initialize the Fabric service:', error);
    }
  }

  public async getWallet() {}

  public async getNetwork() {}

  public async getContract() {}
}
