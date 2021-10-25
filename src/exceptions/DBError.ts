import { BaseError } from "@foxtrotplatform/platform_nodejs_exception/exception/exceptions";
import { databaseErrorCode, httpInternalServerErrorCode } from "../utils/constants";

export class DBError extends BaseError {
	constructor(message: string, errorCode?: string, httpCode?: number) {
		super(
			message,
			errorCode || databaseErrorCode,
			httpCode || httpInternalServerErrorCode
		);
	}
}




export class DBConnectionError extends BaseError {
	constructor() {
		super(
			"No open connections available to connect to the database",
			databaseErrorCode,
			httpInternalServerErrorCode
		);
	}
}