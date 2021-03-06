import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  // baseUrl: 'http://192.168.1.121:8080/',
  baseUrl: 'https://logbook.snoopfish.ch:443/',
  logbookVersion: '2.1.6',

  workoutLocations: ['Wilderswil', 'Griffbar', 'K44', 'O\'Bloc', 'Magnet', 'Home', 'NLZ Biel', 'Bimano', 'Klettertreff'],
};
