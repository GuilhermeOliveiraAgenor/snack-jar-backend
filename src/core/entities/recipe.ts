export interface RecipeProps {
  title: string;
  description: string;
  preparationTime: number;
  categoryId: string;
  statusId: string;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export class Recipe {
  constructor(
    private readonly _id: string,
    private props: RecipeProps,
  ) {
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? null;
    this.props.deletedAt = props.deletedAt ?? null;
  }
}
