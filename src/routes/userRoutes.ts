import { createAccount, getAccount } from "../controllers/userControllers";
import { Router } from "express";

const router = Router();

router.post('/create-account', createAccount);
router.get('/account/:accountNumber', getAccount);

export default router;