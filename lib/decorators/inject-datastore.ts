import { Model } from "../model";
import { Type, Inject } from "@nestjs/common";

export function InjectDatastore(model: Type<Model>) {
  return Inject(`NEDB_DATABASE_${ model.name }`);
}
