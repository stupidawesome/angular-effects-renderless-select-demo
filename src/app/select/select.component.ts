import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from "@angular/core"
import { Connect, Effects, HostEmitter, HostRef } from "ng-effects"
import { OptionLike, SelectLike } from "../renderless/interfaces"
import { Button } from "../renderless/button"
import { Select } from "../renderless/select"
import { Dropdown } from "../renderless/dropdown"

@Component({
    selector: "ngfx-select",
    template: `
        <div class="options" *templateRef>
            <ng-content select="ngfx-option, ngfxOption]"></ng-content>
        </div>
    `,
    styles: [
        `
            :host {
                display: inline-flex;
                align-items: center;
                width: 320px;
                height: 40px;
                padding: 0 16px;
                border: 2px solid #1f1f1f;
            }

            .options {
                display: flex;
                flex-direction: column;
                width: 320px;
                padding: 8px;
                background-color: #ffffff;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        Effects,
        Select,
        Button,
        Dropdown,
        {
            provide: SelectLike,
            useExisting: HostRef,
        },
    ],
    host: {
        tabindex: "0",
    },
})
export class SelectComponent<T> implements SelectLike<T> {
    @Input()
    public value: T

    @Input()
    public placeholder: string

    @Input()
    @HostBinding("class.disabled")
    public disabled: boolean

    @HostBinding("class.expanded")
    public expanded: boolean

    @HostBinding("class.active")
    public active: boolean

    @HostBinding("class.focus")
    public focus: boolean

    @HostBinding("class.hover")
    public hover: boolean

    @ContentChildren(OptionLike)
    public options?: QueryList<HostRef<OptionLike<T>>>

    @ViewChild(TemplateRef)
    public template?: TemplateRef<void>

    @HostBinding("innerHTML")
    public label?: string

    @Output()
    public readonly valueChange: HostEmitter<T>

    @Output()
    public readonly press: HostEmitter<any>

    constructor(connect: Connect, viewContainerRef: ViewContainerRef) {
        this.disabled = false
        this.expanded = false
        this.options = undefined
        this.value = undefined
        this.template = undefined
        this.label = undefined
        this.active = false
        this.focus = false
        this.hover = false
        this.placeholder = "Select"
        this.valueChange = new HostEmitter(true)
        this.press = new HostEmitter(true)

        console.log(", viewContainerRef: ViewContainerRef", viewContainerRef)

        connect(this)
    }
}
