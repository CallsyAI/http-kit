
//#region lib/index.js
/** @template V */
var Result = class Result {
	/**
	* @param {boolean} ok
	* @param {unknown} [error]
	* @param {V} [value]
	*/
	constructor(ok$1, error$1, value) {
		this.ok = !!ok$1;
		if (this.ok) this.value = value;
		else this.error = error$1;
	}
	*[Symbol.iterator]() {
		yield this.ok;
		yield this.error;
		yield this.value;
	}
	/**
	* @this void
	* @template T
	* @param {T} value
	*/
	static ok(value) {
		return new Result(true, void 0, value);
	}
	/**
	* @this void
	* @param {unknown} error
	*/
	static error(error$1) {
		return new Result(false, error$1);
	}
	/**
	* @this void
	* @template T
	* @param {any} result
	* @param {...any} args
	* @returns {Promise<Result<T>> | Result<T>}
	*/
	static try(result, ...args) {
		try {
			if (typeof result === "function") result = result.apply(void 0, args);
			if (result instanceof Promise) return result.then(Result.ok, Result.error);
			return Result.ok(result);
		} catch (error$1) {
			return Result.error(error$1);
		}
	}
};
const error = Result.error;
const ok = Result.ok;
const t = Result.try;

//#endregion
exports.Result = Result;
exports.error = error;
exports.ok = ok;
exports.t = t;
//# sourceMappingURL=index.cjs.map