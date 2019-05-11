import {KeycloakInitOptions} from 'keycloak-js';
import {KeycloakConfig} from 'esta-webjs-extensions';
import {Environment} from './environment.model';

const authOptions: KeycloakInitOptions = {flow: 'implicit'};
const authConfig: KeycloakConfig = {
  realm: 'YOUR_REALM',
  url: 'http://localhost:8080',
  clientId: 'YOUR_CLIENT_ID'
};

export const environment: Environment = {
  production: true,
  authConfig,
  authOptions
};
