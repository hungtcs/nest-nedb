import { Module, DynamicModule, Global } from '@nestjs/common';

@Global()
@Module({ })
export class NedbCoreModule {

  public static forRoot(path: string): DynamicModule {
    const providers = [
      {
        provide: 'NEDB_FILE_PATH',
        useValue: path,
      },
    ];
    return {
      module: NedbCoreModule,
      exports: [
        ...providers,
      ],
      providers: [
        ...providers,
      ],
    }
  }

}
