import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { SelectModule } from "./select/select.module"
import { OptionModule } from "./option/option.module"

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SelectModule, OptionModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
