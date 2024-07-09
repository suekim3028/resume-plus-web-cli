import { UserTypes } from "@types";
import { LocalStorageItem } from "@web-core";

export const TokenStorage = new LocalStorageItem<UserTypes.Token>("token");
