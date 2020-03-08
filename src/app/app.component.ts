import { Component } from "@angular/core"

@Component({
    selector: "ngfx-root",
    template: `
        <ngfx-select [(value)]="value" placeholder="-- Select --">
            <ngfx-option>None</ngfx-option>
            <ngfx-option *ngFor="let option of options" [value]="option">{{
                option.label
            }}</ngfx-option>
        </ngfx-select>
    `,
    styles: [],
})
export class AppComponent {
    options = [
        {
            label: "Apples",
            value: "APPLES",
        },
        {
            label: "Oranges",
            value: "ORANGES",
        },
        {
            label: "Plums",
            value: "PLUMS",
        },
    ]

    value = undefined
}
