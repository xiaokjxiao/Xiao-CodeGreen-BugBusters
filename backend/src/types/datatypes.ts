import { NextFunction, Request, Response } from "express";
import { Database } from "./database.types";

export interface Driver {
  date_of_birth: string;
  driver_type: "Student" | "Faculty" | "Staff" | null;
  email: string;
  first_name: string;
  id: string;
  is_driver_registered: boolean;
  last_name: string;
  license_expiration_date: string;
  license_number: string;
  middle_name: string | null;
  sex: "Male" | "Female";
  user_id: string | null;
}

export interface Violation {
  id: string;
  driver_id: string;
  violation_type: string;
  violation_date: string;
  paid_status: boolean;
}

export interface DriverWithViolations {
  date_of_birth: string;
  driver_type: "Student" | "Faculty" | "Staff" | null;
  email: string;
  first_name: string;
  id: string;
  is_driver_registered: boolean;
  last_name: string;
  license_expiration_date: string;
  license_number: string;
  middle_name: string | null;
  sex: "Male" | "Female";
  user_id: string | null;
  Violations: Violation[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  salt: string;
  refresh_token: string;
  created_at: string;
  last_login: string;
  is_admin: boolean;
}

export interface RegisterUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

