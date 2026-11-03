import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { JsonStore } from '../common/json-store';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@Injectable()
export class CategoriesService {
  constructor(private readonly store: JsonStore) {}
  findAll() { return this.store.read().categories; }
  findOne(id: string) {
    const item = this.store.read().categories.find(x => x.id === id);
    if (!item) throw new NotFoundException('Category not found');
    return item;
  }
  create(dto: CreateCategoryDto) {
    const db = this.store.read();
    const item = { id: randomUUID(), ...dto, createdAt: new Date().toISOString() };
    db.categories.push(item); this.store.write(db); return item;
  }
  update(id: string, dto: UpdateCategoryDto) {
    const db = this.store.read(); const item = db.categories.find(x => x.id === id);
    if (!item) throw new NotFoundException('Category not found');
    Object.assign(item, dto); this.store.write(db); return item;
  }
  remove(id: string) {
    const db = this.store.read(); const index = db.categories.findIndex(x => x.id === id);
    if (index < 0) throw new NotFoundException('Category not found');
    if (db.vocabulary.some(x => x.categoryId === id)) throw new ConflictException('Category has vocabulary words');
    db.categories.splice(index, 1); this.store.write(db); return { message: 'Category deleted' };
  }
}
