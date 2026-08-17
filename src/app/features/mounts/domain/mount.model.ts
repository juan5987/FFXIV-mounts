export type ExpansionId = string;

export interface Mount {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly iconUrl: string;
  readonly expansionId: ExpansionId | null;
}
