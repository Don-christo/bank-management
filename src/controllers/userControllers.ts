import express, { Request, Response, NextFunction } from 'express';
import { generateAccountNumber } from '../utils/helpers'


const bankAccounts: { accountNumber: string; accountName: any; dob: any; accountType: any; initialAccountBalance: any; }[] = [];


// create account number
 export const createAccount = (req: Request, res: Response) => {
    const { accountName, dob, accountType, initialAccountBalance } = req.body;

    if (!accountName || !accountType || !dob || initialAccountBalance === undefined) {
        return res.status(400).json({
            error: `Invalid input. Please provide valid credentials`
        })
    }

    const accountNumber = generateAccountNumber();

    const newAccount = {
        accountNumber,
        accountName,
        dob,
        accountType,
        initialAccountBalance
    };

    // add the account to a storage
    bankAccounts.push(newAccount);

    // return unique account number with account details
    const response = {
        accountName,
        accountNumber,
        accountType,
        initialAccountBalance
    };

    res.status(200).json({
        message: `Your account has been successfully created`,
        response
    });
}

export const getAccount = (req: Request, res: Response) => {
    const { accountNumber } = req.params;


    // find the account from the storage
    const account = bankAccounts.find((acc) => acc.accountNumber === accountNumber);

    if(!account) {
        return res.status(404).json({
            error: `Account not found`
        })
    }

    return res.status(200).json({
        message: `Your account is ${account}`
    });
}