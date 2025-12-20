import { PreparationMethodRepository } from "../../src/application/repositories/preparation-method-repository";
import { PreparationMethod } from "../../src/core/entities/preparationMethod";

export class InMemoryPreparationMethodRepository implements PreparationMethodRepository {
  public item: PreparationMethod[] = [];

  async createMany(preparationMethod: PreparationMethod[]): Promise<void> {
    this.item.push(...preparationMethod);
  }
}
