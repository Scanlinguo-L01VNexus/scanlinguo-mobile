import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

@Injectable()
export class JsonStore {
  private file: string;
  constructor() {
    const dir = resolve(process.env.DATA_DIR || join(process.cwd(), 'data'));
    mkdirSync(dir, { recursive: true });
    this.file = join(dir, 'store.json');
    if (!existsSync(this.file)) this.write({ categories: [], vocabulary: [] });
  }
  read(): Database {
    return JSON.parse(readFileSync(this.file, 'utf8')) as Database;
  }
  write(data: Database): void {
    const temp = this.file + '.tmp';
    writeFileSync(temp, JSON.stringify(data, null, 2), 'utf8');
    renameSync(temp, this.file);
  }
}
export interface Category { id: string; name: string; description?: string; createdAt: string; }
export interface Word { id: string; word: string; meaning: string; example?: string; categoryId: string; createdAt: string; }
export interface Database { categories: Category[]; vocabulary: Word[]; }
