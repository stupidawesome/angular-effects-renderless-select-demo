import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { OptionComponent } from "./option.component"

@NgModule({
    declarations: [OptionComponent],
    exports: [OptionComponent],
    imports: [CommonModule],
})
export class OptionModule {}
