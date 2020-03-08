import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SelectComponent } from "./select.component"
import { OptionModule } from "../option/option.module"
import { OverlayModule } from "@angular/cdk/overlay"

@NgModule({
    declarations: [SelectComponent],
    exports: [SelectComponent],
    imports: [CommonModule, OptionModule, OverlayModule],
})
export class SelectModule {}
