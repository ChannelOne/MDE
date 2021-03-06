"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineStream {
    constructor(text) {
        this._index = 0;
        this._curren_token_index = 0;
        this._text = text;
    }
    eol() {
        return this._index >= this._text.length;
    }
    sol() {
        return this._index === 0;
    }
    peek() {
        let next_index = this._index;
        return next_index >= this._text.length ?
            null : this._text.charAt(next_index);
    }
    next() {
        let next_index = this._index++;
        return next_index >= this._text.length ?
            null : this._text.charAt(next_index);
    }
    eat(match) {
        if (typeof match == "string") {
            return this.peek() == match ? match : undefined;
        }
        else if (match instanceof RegExp) {
            let substring = this._text.slice(this._index);
            let result = match.exec(substring);
            if (result) {
                this._index += result[0].length;
                return result[0];
            }
            return undefined;
        }
        else if (typeof match == "function") {
            return match(this.peek()) ? this.next() : undefined;
        }
        else {
            throw new Error("Type error:" + typeof match);
        }
    }
    eatWhile() {
        if (this.peek() != "\t" && this.peek() != " ")
            return false;
        while (this.peek() == " " || this.peek() == "\t")
            this.next();
        return true;
    }
    eatSpace() {
        if (this.peek() != " ")
            return false;
        while (this.peek() == " ")
            this.next();
        return true;
    }
    skipToEnd() {
        this._index = this._text.length;
    }
    skipTo(ch) {
        let index = this._index;
        for (let index = this._index; index < this._text.length; index++) {
            if (this._text.charAt(index) == ch) {
                this._index = index;
                return true;
            }
        }
        return false;
    }
    match(pattern, consume, caseFold) {
        if (typeof pattern == "string") {
            for (let i = 0; i < pattern.length; i++) {
                if (this._text.charAt(this._index + i) != pattern.charAt(i)) {
                    return false;
                }
            }
            if (consume)
                this._index += pattern.length;
            return true;
        }
        else if (pattern instanceof RegExp) {
            let substring = this._text.slice(this._index);
            let result = pattern.exec(substring);
            if (result) {
                if (consume) {
                    this._index += result[0].length;
                }
                return result;
            }
            return false;
        }
        else {
            throw new Error("Type error:" + typeof pattern);
        }
    }
    backUp(num) {
        if (this._index - num < 0)
            this._index = 0;
        else
            this._index -= num;
    }
    column() {
        let _col = 0;
        let char;
        do {
            char = this._text.charAt(this._index + _col);
            _col++;
        } while (char == " " || char == "\t");
        return _col;
    }
    indentation() {
        let _col = 0;
        let char;
        do {
            char = this._text.charAt(_col);
            _col++;
        } while (char == " " || char == "\t");
        return _col;
    }
    setCurrentTokenIndex() {
        this._curren_token_index = this._index;
    }
    current() {
        return this._text.slice(this._curren_token_index, this._index);
    }
}
exports.LineStream = LineStream;
class TextModelStream {
    constructor(_model, _line) {
        this._model = _model;
        this._line = _line;
        this._lineModel = this._model.lineAt(_line);
        this._index = 0;
    }
    eol() {
        return this._index >= this._lineModel.length;
    }
    sol() {
        return this._index == 0;
    }
    peek() {
        let next_index = this._index + 1;
        return next_index >= this._lineModel.length ?
            null : this._lineModel.charAt(next_index);
    }
    next() {
        let next_index = ++this._index;
        return next_index >= this._lineModel.length ?
            null : this._lineModel.charAt(next_index);
    }
    eat(match) {
        throw new Error("Not implmented.");
    }
    eatWhile() {
        throw new Error("Not implmented.");
    }
    eatSpace() {
        throw new Error("Not implmented.");
    }
    skipToEnd() {
        this._index = this._lineModel.length;
    }
    skipTo(ch) {
        throw new Error("Not implmented.");
    }
    match(pattern, consume, caseFold) {
        throw new Error("Not implmented.");
    }
    backUp(n) {
        throw new Error("Not implmented.");
    }
    column() {
        throw new Error("Not implmented.");
    }
    indentation() {
        throw new Error("Not implmented.");
    }
    current() {
        throw new Error("Not implmented.");
    }
}
exports.TextModelStream = TextModelStream;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9saW5lU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBMkdBO0lBTUksWUFBWSxJQUFZO1FBSGhCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxHQUFHO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDNUMsQ0FBQztJQUVELEdBQUc7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFvRDtRQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDcEQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBQ3hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUc7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBSUQsS0FBSyxDQUFDLE9BQXdCLEVBQUUsT0FBaUIsRUFBRSxRQUFrQjtRQUNqRSxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3BDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJO1lBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLElBQVksQ0FBQztRQUNqQixHQUFHLENBQUM7WUFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksSUFBWSxDQUFDO1FBQ2pCLEdBQUcsQ0FBQztZQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzNDLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUVKO0FBdElELGdDQXNJQztBQUVEO0lBT0ksWUFBWSxNQUFpQixFQUFFLEtBQWE7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUM7SUFFRCxHQUFHO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07WUFDdkMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxVQUFVLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3ZDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQW9EO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFJRCxLQUFLLENBQUMsT0FBd0IsRUFBRSxPQUFpQixFQUFFLFFBQWtCO1FBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQVU7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUVKO0FBNUVELDBDQTRFQyIsImZpbGUiOiJtb2RlbC9saW5lU3RyZWFtLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
