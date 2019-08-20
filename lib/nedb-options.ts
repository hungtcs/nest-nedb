import { Model } from "./model";
import { Type } from "@nestjs/common";

export interface NedbOption {
  model: Type<Model>;
  indexes?: {
    [key: string]: {
      unique?: boolean,
      sparse?: boolean,
      expireAfterSeconds?: number,
    },
  };
  filename?: string;
}

export type NedbOptions = NedbOption | Array<NedbOption>;
