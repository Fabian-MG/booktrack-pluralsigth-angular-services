import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlainLoggerService } from "./plain-logger.service";
import { LoggerService } from "./logger.service";
import { DataService } from "./data.service";
import { dataServiceFactory } from "./data.service.factory";
import { throwIfAlreadyLoaded } from "./module-import.guard";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    // PlainLoggerService,
    // { provide: LoggerService, useExisting: PlainLoggerService },
    // { provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService]},
    // {
    //   provide: LoggerService,
    //   useValue: {
    //     log: (message) => console.log(`MESSAGE ${message}`),
    //     error: (message) => console.error(`PROBLEM ${message}`),
    //   },
    // },
    DataService,
    LoggerService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
