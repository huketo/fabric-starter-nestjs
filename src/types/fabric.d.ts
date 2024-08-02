interface FabricConnectionProfile {
  name?: string;
  version?: string;
  client?: Client;
  organizations?: { [key: string]: Organization };
  peers?: { [key: string]: Peer };
  certificateAuthorities?: { [key: string]: CertificateAuthority };
}

interface Client {
  organization: string;
  connection: {
    timeout: {
      peer: {
        endorser: string;
      };
    };
  };
}

interface Organization {
  mspid: string;
  peers: string[];
  certificateAuthorities: string[];
}

interface Peer {
  url: string;
  tlsCACerts: TLSCACerts;
  grpcOptions: GRPCOptions;
}

interface TLSCACerts {
  pem: string;
}

interface GRPCOptions {
  'ssl-target-name-override': string;
  hostnameOverride?: string;
}

interface CertificateAuthority {
  url: string;
  caName: string;
  tlsCACerts: { pem: string[] };
  httpOptions: { verify: boolean };
}
