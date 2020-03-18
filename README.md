<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <!-- <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a> -->
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

The [NEDB](https://github.com/louischatriot/nedb) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm i --save @hungtcs-box/nest-nedb nedb
$ npm i --save-dev @types/nedb
```

## Quick Start

1. First in your model file, extends the base `Model`
```ts
import { Model } from '@hungtcs-box/nest-nedb';

export class UserModel extends Model {
  username?: string;

}
```

2. Import `NedbModule.forFeature` in your `UsersModule`
```ts
import { UserModel } from './models/user.model';
import { NedbModule } from '@hungtcs-box/nest-nedb';

@Module({
  imports: [
    PasswdModule,
    NedbModule.forFeature([
      {
        model: UserModel,
        indexes: {
          username: {
            unique: true,
          },
        },
      },
    ]),
  ],
  exports: [
    UsersService,
  ],
  providers: [
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {

}
```

3. Import `NedbModule.forRoot` in your `AppModule`
```js
import { NedbModule } from '@hungtcs-box/nest-nedb';

@Module({
  imports: [
    NedbModule.forRoot(`path/to/your/database/file`),
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {

}
```

4. Now you can inject the nedb DataStore in your `UserService`
```ts
import { InjectDatastore } from '@hungtcs-box/nest-nedb';
import DataStore from 'nedb';

@Injectable()
export class UsersService {

  constructor(
      @InjectDatastore(UserModel) private readonly dataStore: DataStore<UserModel>) {

  }

}
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

* Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest and Nedb is [MIT licensed](LICENSE).
