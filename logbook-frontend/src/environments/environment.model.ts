import {KeycloakInitOptions} from 'keycloak-js';
import {KeycloakConfig} from 'esta-webjs-extensions';

export interface Environment {
    production: boolean;
    authConfig: KeycloakConfig;
    authOptions: KeycloakInitOptions;
}
