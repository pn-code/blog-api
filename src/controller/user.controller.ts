import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return user;
    } catch (error: any) {
        logger.error(error);
        // Return error that indicates unique email field has been violated.
        return res.status(409).send(error.message);
    }
}
