import { PreparationMethod } from "../../core/entities/preparationMethod";

export interface PreparationMethodRepository {
  createMany(preparationMethod: PreparationMethod[]): Promise<void>;
}
