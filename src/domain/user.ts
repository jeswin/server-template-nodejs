import * as pg from "psychopiggy";
import { getPool, withTransaction } from "../db";

export async function createUser(name: string) {
  return { status: true };
}
