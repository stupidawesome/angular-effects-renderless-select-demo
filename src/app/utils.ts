import { QueryList, Renderer2, Type } from "@angular/core"
import { fromEventPattern, merge, MonoTypeOperatorFunction, Observable, of } from "rxjs"
import { filter, map, mapTo, startWith, switchMap, tap, withLatestFrom } from "rxjs/operators"

export type EventMap<T extends any> = {
    [key in keyof T]: T[key] extends Type<any> ? Observable<InstanceType<T[key]>> : EventMap<T[key]>
}

export function fromEvents<
    T extends { [key: number]: string | { [key: string]: { [key: number]: string } } }
>(element: HTMLElement, renderer: Renderer2, eventMap: T): EventMap<T> {
    const observer: any = {}
    return Object.keys(eventMap).reduce((acc, eventKey) => {
        const value = eventMap[eventKey]

        if (typeof value === "function") {
            acc[eventKey] = fromEventPattern(handler => renderer.listen(element, eventKey, handler))
        } else {
            acc[eventKey] = fromEvents(element, renderer, value)
        }

        return acc
    }, observer)
}

export interface ToggleOptions {
    on: Observable<any>
    off: Observable<any>
    disable?: Observable<boolean>
}

export function toggle(options: ToggleOptions): Observable<boolean> {
    return merge(mapTo(true)(options.on), mapTo(false)(options.off)).pipe(
        withLatestFrom(options.disable || of(false), (toggled, disabled) =>
            disabled ? false : toggled,
        ),
    )
}

export function preventDefault<T extends Event>(): MonoTypeOperatorFunction<T> {
    return tap(event => event.preventDefault())
}

export function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined
}

export function queryList<T>(source: Observable<QueryList<T>>): Observable<T[]> {
    return source.pipe(
        filter(isDefined),
        switchMap(list =>
            list.changes.pipe(
                startWith(list),
                map(changes => changes.toArray()),
            ),
        ),
    )
}
