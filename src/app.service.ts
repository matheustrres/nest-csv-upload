import { Injectable } from '@nestjs/common';

import { MulterCSVService } from './services/multer-csv.service';

type CsvItem = {
  full_name: string;
  age: string;
  email_address: string;
  gender: string;
  city: string;
  postal: string;
  ccnumber: string;
};

@Injectable()
export class AppService {
  constructor(private readonly multerCsvService: MulterCSVService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleFile(file: Express.Multer.File): Promise<CsvItem[]> {
    return this.multerCsvService.handleFile<CsvItem>(file);
  }
}
