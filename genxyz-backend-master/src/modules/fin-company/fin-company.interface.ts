import { Document } from 'mongoose';


export interface FinCompany extends Document {
      CIN: string,
      basic_details: BasicDetails,
      share_capital: SharedCapital,
      listing_and_annual_compliance: ListAnnualCompliance,
      company_contactmail_and_address: CompanyDetails,
      directors_details: DirectoryDetails[],
      prosecution_details: ProsecutionDetails[],
      charges_and_borrowings: ChargesAndBorrowings[],
      establishment_name: EstablishmentName[]
}

export interface BasicDetails {
      company_name: string,
      company_status: string,
      company_roc: string,
      company_reg_no: string,
      company_category: string,
      company_sub_category: string,
      company_class: string,
      company_dateof_incorporation: string,
      company_age: string,
      company_activity: string,
      company_number_members: string,
}

export interface SharedCapital {
    company_authorised_capital: string,
    company_paidup_cap: string
}

export interface ListAnnualCompliance {
    company_listing_status: string,
    company_last_agm: string,
    company_latest_blst: string
}

export interface CompanyDetails {
    company_email: string,
    company_website: string,
    company_address: string
}

export interface DirectoryDetails {
    director_din: string,
    director_name: string,
    director_designation: string,
    director_appointment_date: string
}

export interface ProsecutionDetails {
    company_sno: string,
    company_defaulting_entity: string,
    company_court_name: string,
    company_prosecution_section: string,
    company_date_of_order: string,
    company_status: string,
}

export interface ChargesAndBorrowings {
    company_chargeid: string,
    company_creation_date: string,
    company_closure_date: string,
    company_assets_undercharge: string,
    company_amount: string,
    company_chargeholder: string,
}

export interface EstablishmentName {
    establishment_name: string,
    establishment_city: string,
    establishment_pincode: string,
    establishment_address: string,
}