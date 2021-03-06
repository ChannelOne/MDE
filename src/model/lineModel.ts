import {Position, Range, isPosition, isRange} from "."

export enum LineChangedType {
    Insert, Delete
}

/**
 * Store the content and the number of a line
 */
export class LineModel {

    protected _number : number;
    protected _text : string;

    constructor(_num : number, _t : string) {
        this._number = _num | 0;
        this._text = _t;
    }

    /**
     * @returns the charactor at the `offset` position.
     */
    charAt(offset : number) : string {
        return this._text.charAt(offset);
    }

    /**
     * throw `Error` when the index is out of range,
     * throw `Error` if you try to add charactors after linebreak.
     */
    insert(index : number, content : string) {
        if (index < 0 || index > this._text.length)
            throw new Error("Illegal input data when inserting text to LineModel");
        if (index === this._text.length) {
            if (this._text[this._text.length - 1] == '\n') {
                throw new Error("You cannot add charactors after linebreaker.");
            }
            this._text = this._text + content;
        } else {
            let before = this._text.slice(0, index);
            let after = this._text.slice(index);

            this._text = before + content + after;
        }
    }

    append(content : string) {
        this._text = this._text + content;
    }

    delete(begin : number, end : number) {
        if (this._text[this._text.length - 1] == '\n' && end >= this._text.length)
            throw new Error("You can not delete the linebreak");
        let before = this._text.slice(0, begin);
        let deleted = this._text.slice(begin, end);
        let after = this._text.slice(end);

        this._text = before + after;
    }

    deleteToEnd(offset : number) {
        if (offset >= this._text.length)
            throw new Error("Index out of range.");
        if (this._text[this._text.length - 1] == '\n') {
            this._text = this._text.slice(0, offset) + '\n';
        } else {
            this._text = this._text.slice(0, offset);
        }
    }

    report() {
        return this._text;
    }

    isEndswithLinebreak(): boolean {
        return this._text[this._text.length - 1] == '\n';
    }

    get firstChar(): string {
        return this._text.charAt(0);
    }

    get lastChar(): string {
        return this._text.charAt(this._text.length - 1);
    }

    get firstCharPosition(): Position {
        return {
            line: this._number,
            offset: 0,
        }
    }

    get lastCharPosition(): Position {
        return {
            line: this._number,
            offset: this.text.length - 1
        }
    }
    
    get text() {
        return this._text;
    }
    
    set text(_t : string) {
        this._text = _t
    }

    get number() {
        return this._number;
    }

    set number(num : number) {
        this._number = num;
    }
    
    get length() {
        return this._text.length;
    }

}
