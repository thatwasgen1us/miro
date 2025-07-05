import { setupWorker } from "msw/browser";
import { boardsHandlers } from "./handlers/boards";
import { authHandlers } from "@/shared/api/mocks/handlers/auth";

export const worker = setupWorker(...boardsHandlers, ...authHandlers);
