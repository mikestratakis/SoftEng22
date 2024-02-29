import { Inject, Injectable } from '@angular/core';
import {LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


const STORAGE_KEY = 'email';
@Injectable()
export class LocalStorageService {
  context: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

  }
  public storeOnLocalStorage(value: string): void {

    // insert updated array to local storage
    if (value != null) {
      this.storage.set(STORAGE_KEY, value);
      // console.log(this.storage
      //   .get(STORAGE_KEY) || 'LocaL storage is empty');
    }

  }
  public getFromLocalStorage(): any {
    return this.storage.get(STORAGE_KEY);
  }
  public clearFromLocalStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  public setDataToLocalStorage(name: string, value: any) {
    this.storage.set(name, value);
  }

  public getDataFromLocalStorage(name: string): any {
    return this.storage.get(name);
  }

  public removeAll() {
    localStorage.clear();
  }
}
