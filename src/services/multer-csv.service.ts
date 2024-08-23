import { createReadStream, promises } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { parse, Parser } from 'csv-parse';

@Injectable()
export class MulterCSVService {
  async handleFile<T>(file: Express.Multer.File): Promise<T[]> {
    const items: T[] = [];
    const keys: string[] = [];

    let isHeader = true;

    const readStream = createReadStream(file.path, {
      highWaterMark: 1024 * 1024 * 1024,
    });

    const parser = readStream.pipe<Parser>(
      parse({
        delimiter: ',',
        fromLine: 1,
        skipRecordsWithEmptyValues: true,
        skipRecordsWithError: true,
        skipEmptyLines: true,
      }),
    );

    for await (const lines of parser) {
      if (isHeader) {
        keys.push(...lines);
        isHeader = false;
      } else {
        const item = keys.reduce((acc, key, i) => {
          acc[key as keyof T] = lines[i];

          return acc;
        }, {} as T);

        items.push(item);
      }
    }

    try {
      await promises.stat(file.path);
      await promises.unlink(file.path);
    } catch (error) {
      console.error('Error while reading file: ', error);
    }

    return items;
  }
}
