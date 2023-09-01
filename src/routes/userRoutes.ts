import { createAccount, getAccount, getAllAccounts } from "../controllers/userControllers";
import { Router } from "express";

const router = Router();

router.post('/create-account', createAccount);
router.get('/account/:accountNumber', getAccount);
router.get('/allAccounts', getAllAccounts);
export default router;