import { ChangeDetectionStrategy, Component, HostBinding, Input, Output, ViewContainerRef } from "@angular/core"
import { Connect, Effects, HostEmitter, HostRef } from "ng-effects"
import { OptionLike, PressEvent } from "../renderless/interfaces"
import { Button } from "../renderless/button"
import { Option } from "../renderless/option"

@Component({
    selector: "ngfx-option",
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
                height: 40px;
                padding: 16px;
                transition: background-color 0.1s;
            }

            :host.selected {
                background: #f0f0f0;
            }

            :host.hover {
                background: #FFC525;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        Effects,
        Option,
        Button,
        {
            provide: OptionLike,
            useExisting: HostRef,
        },
    ],
    host: {
        tabindex: "0",
    },
})
export class OptionComponent<T> implements OptionLike<T> {
    @Input()
    public value?: T

    @HostBinding("class.selected")
    @Input()
    public selected: boolean

    @Input()
    @HostBinding("class.disabled")
    public disabled: boolean

    @HostBinding("class.active")
    public active: boolean

    @HostBinding("class.focus")
    public focus: boolean

    @HostBinding("class.hover")
    public hover: boolean

    public innerHTML: string

    @Output()
    public readonly press: HostEmitter<PressEvent>

    constructor(connect: Connect, viewContainerRef: ViewContainerRef) {
        this.selected = false
        this.active = false
        this.disabled = false
        this.focus = false
        this.hover = false
        this.value = undefined
        this.press = new HostEmitter<PressEvent>()
        this.innerHTML = ""

        connect(this)
    }
}
