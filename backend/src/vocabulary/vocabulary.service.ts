import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { JsonStore } from '../common/json-store';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
@Injectable()
export class VocabularyService {
  constructor(private readonly store: JsonStore) {}
  private assertCategory(id: string) {
    if (!this.store.read().categories.some(x => x.id === id)) throw new NotFoundException('Category not found');
  }
  findAll(categoryId?: string) {
    const words = this.store.read().vocabulary;
    return categoryId ? words.filter(x => x.categoryId === categoryId) : words;
  }
  findOne(id: string) {
    const item = this.store.read().vocabulary.find(x => x.id === id);
    if (!item) throw new NotFoundException('Vocabulary word not found');
    return item;
  }
  create(dto: CreateWordDto) {
    this.assertCategory(dto.categoryId);
    const db = this.store.read();
    const item = { id: randomUUID(), ...dto, createdAt: new Date().toISOString() };
    db.vocabulary.push(item); this.store.write(db); return item;
  }
  update(id: string, dto: UpdateWordDto) {
    if (dto.categoryId) this.assertCategory(dto.categoryId);
    const db = this.store.read(); const item = db.vocabulary.find(x => x.id === id);
    if (!item) throw new NotFoundException('Vocabulary word not found');
    Object.assign(item, dto); this.store.write(db); return item;
  }
  remove(id: string) {
    const db = this.store.read(); const index = db.vocabulary.findIndex(x => x.id === id);
    if (index < 0) throw new NotFoundException('Vocabulary word not found');
    db.vocabulary.splice(index, 1); this.store.write(db); return { message: 'Vocabulary word deleted' };
  }
}
