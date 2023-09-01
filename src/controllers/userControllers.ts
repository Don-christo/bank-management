import express, { Request, Response, NextFunction } from "express";
import { generateAccountNumber } from "../utils/helpers";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";

let bankFolder = path.join(__dirname, "../../src/bankDatabase");
let bankFile = path.join(bankFolder, "bankDatabase.json");

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // create database dynamically
    if (!fs.existsSync(bankFolder)) {
      fs.mkdirSync(bankFolder);
    }
    if (!fs.existsSync(bankFile)) {
      fs.writeFileSync(bankFile, " ");
    }

    // read from database
    let allDetails: any[] = [];
    try {
      const infos = fs.readFileSync(bankFile, "utf8");
      if (!infos) {
        return res.status(400).json({
          message: `Could not read file`,
        });
      } else {
        allDetails = JSON.parse(infos);
      }
    } catch (parseError) {
      allDetails = [];
    }

    const { accountName, dob, accountType, initialAccountBalance } = req.body;

    if (
      !accountName ||
      !accountType ||
      !dob ||
      initialAccountBalance === undefined
    ) {
      return res.status(400).json({
        error: `Invalid input. Please provide valid credentials`,
      });
    }

    const accountNumber = generateAccountNumber();

    const newAccount = {
      accountNumber,
      accountName,
      dob,
      accountType,
      initialAccountBalance,
    };

    // add the account to a storage
    allDetails.push(newAccount);

    // return unique account number with account details
    const response = {
      accountName,
      accountNumber,
      accountType,
      initialAccountBalance,
    };

    res.status(200).json({
      message: `Your account has been successfully created`,
      response,
    });

    fs.writeFile(
      bankFile,
      JSON.stringify(allDetails, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return res.status(500).json({
            message: `Error creating this account: ${err.message}`,
          });
        } else {
          return res.status(200).json({
            message: `Bank details saved successfully`,
            response,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAccount = (req: Request, res: Response) => {
  const { accountNumber }  = req.params

  let bankAccounts: any[] = [];
  const data = fs.readFileSync(bankFile, "utf-8");

  bankAccounts = JSON.parse(data);

  // find the account from the storage
  const account = bankAccounts.find((acc) => acc.accountNumber === accountNumber);

  if (!account) {
    return res.status(404).json({
      error: `Account not found`,
    });
  }

  return res.status(200).json({
    message: `Your account is found successfully`,
    data: account
  });
};
