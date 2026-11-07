import * as migration_20261107_210907_initial from './20261107_210907_initial';
import * as migration_20261107_220745_blob_felder from './20261107_220745_blob_felder';
import * as migration_20261107_230515_startseite_design from './20261107_230515_startseite_design';

export const migrations = [
  {
    up: migration_20261107_210907_initial.up,
    down: migration_20261107_210907_initial.down,
    name: '20261107_210907_initial',
  },
  {
    up: migration_20261107_220745_blob_felder.up,
    down: migration_20261107_220745_blob_felder.down,
    name: '20261107_220745_blob_felder',
  },
  {
    up: migration_20261107_230515_startseite_design.up,
    down: migration_20261107_230515_startseite_design.down,
    name: '20261107_230515_startseite_design'
  },
];
