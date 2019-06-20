import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  // baseUrl: 'http://192.168.1.121:8080/',
  baseUrl: 'https://logbook.snoopfish.ch:443/',
  logbookVersion: '2.0.4',

  workoutLocations: ['Wilderswil', 'Griffbar', 'K44', 'O\'Bloc', 'Magnet', 'NLZ Biel', 'Bimano', 'Klettertreff', 'Home'],
};
