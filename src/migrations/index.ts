import * as migration_20261107_210907_initial from './20261107_210907_initial';

export const migrations = [
  {
    up: migration_20261107_210907_initial.up,
    down: migration_20261107_210907_initial.down,
    name: '20261107_210907_initial'
  },
];
