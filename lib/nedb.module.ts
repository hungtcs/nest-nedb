import Datastore from 'nedb';
import { join } from 'path';
import { promisify } from 'util';
import { NedbOptions } from './nedb-options';
import { NedbCoreModule } from './nedb-core.module';
import { Module, DynamicModule, Provider } from '@nestjs/common';

@Module({ })
export class NedbModule {

  public static forRoot(path: string): DynamicModule {
    return {
      module: NedbModule,
      imports: [NedbCoreModule.forRoot(path)],
    };
  }

  public static forFeature(options: NedbOptions): DynamicModule {
    const databaseProviders = NedbModule.getDatabaseProviders(options);
    return {
      module: NedbModule,
      exports: [
        ...databaseProviders,
      ],
      providers: [
        ...databaseProviders,
      ],
    };
  }

  private static getDatabaseProviders(options: NedbOptions): Array<Provider<any>> {
    if(!(options instanceof Array)) {
      options = [options];
    }
    return options.map(option => {
      option = { ...{ indexes: {} }, ...option };
      return {
        inject: ['NEDB_FILE_PATH'],
        provide: `NEDB_DATABASE_${ option.model.name }`,
        useFactory: async (databasePath: string) => {
          try {
            const datastore = new Datastore({ filename: `${ join(databasePath, option.filename ? option.filename : `${ option.model.name }.nedb`) }` });
            await promisify(datastore.loadDatabase.bind(datastore))();
            await Promise.all(Object.keys(option.indexes).map(async (key) => {
              return await promisify(datastore.ensureIndex.bind(datastore))({
                unique: option.indexes[key].unique,
                sparse: option.indexes[key].sparse,
                fieldName: key,
                expireAfterSeconds: option.indexes[key].expireAfterSeconds,
              });
            }));
            return datastore;
          } catch(err) {
            throw err;
          }
        },
      };
    });
  }

}
