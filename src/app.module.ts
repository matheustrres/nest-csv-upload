import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterCSVService } from './services/multer-csv.service';

@Module({
  imports: [
    MulterModule.register({
      preservePath: true,
      dest: `${process.cwd()}/tmp/upload`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MulterCSVService],
})
export class AppModule {}
